import { defineMiddleware } from "astro:middleware";

const KEYSTATIC_PASSWORD = import.meta.env.KEYSTATIC_PASSWORD;

// Rate limiting: max 5 login attempts per IP every 15 minutes
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;
const loginAttempts = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = loginAttempts.get(ip);

  if (!entry || now > entry.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > MAX_ATTEMPTS;
}

const loginPage = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Acesso Restrito — Kronos CMS</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: "Plus Jakarta Sans", system-ui, sans-serif;
      background: #09090b;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 16px;
    }
    .login-box {
      background: #18181b;
      border: 1px solid #27272a;
      border-radius: 16px;
      padding: 40px;
      width: 100%;
      max-width: 400px;
      text-align: center;
    }
    .login-box h1 {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 8px;
      letter-spacing: -0.02em;
    }
    .login-box p {
      font-size: 14px;
      color: rgba(255,255,255,0.5);
      margin-bottom: 32px;
    }
    .login-box input {
      width: 100%;
      padding: 12px 16px;
      background: #09090b;
      border: 1px solid #27272a;
      border-radius: 8px;
      color: #fff;
      font-size: 15px;
      font-family: inherit;
      margin-bottom: 16px;
      outline: none;
      transition: border-color 0.2s;
    }
    .login-box input:focus {
      border-color: #8257e5;
    }
    .login-box button {
      width: 100%;
      padding: 12px;
      background: #8257e5;
      color: #fff;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 700;
      font-family: inherit;
      cursor: pointer;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      transition: background 0.2s;
    }
    .login-box button:hover { background: #996dff; }
    .error {
      background: rgba(239,68,68,0.1);
      border: 1px solid rgba(239,68,68,0.3);
      color: #ef4444;
      font-size: 13px;
      padding: 10px;
      border-radius: 8px;
      margin-bottom: 16px;
    }
  </style>
</head>
<body>
  <div class="login-box">
    <h1>Kronos CMS</h1>
    <p>Acesso restrito. Digite a senha para continuar.</p>
    {{ERROR}}
    <form method="POST">
      <input type="password" name="password" placeholder="Senha" autofocus required />
      <button type="submit">Entrar</button>
    </form>
  </div>
</body>
</html>`;

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, request, cookies } = context;

  // Só proteger rotas /keystatic
  if (!url.pathname.startsWith("/keystatic")) {
    return next();
  }

  // Verificar cookie de sessão
  const authCookie = cookies.get("keystatic-auth");
  if (authCookie?.value === "authenticated") {
    return next();
  }

  // POST = tentativa de login
  if (request.method === "POST") {
    const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    if (isRateLimited(clientIp)) {
      const html = loginPage.replace(
        "{{ERROR}}",
        '<div class="error">Muitas tentativas. Aguarde 15 minutos.</div>'
      );
      return new Response(html, {
        status: 429,
        headers: { "Content-Type": "text/html" },
      });
    }

    const formData = await request.formData();
    const password = formData.get("password");

    if (password === KEYSTATIC_PASSWORD) {
      cookies.set("keystatic-auth", "authenticated", {
        path: "/keystatic",
        httpOnly: true,
        secure: url.protocol === "https:",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 horas
      });

      return context.redirect(url.pathname);
    }

    // Senha errada
    const html = loginPage.replace(
      "{{ERROR}}",
      '<div class="error">Senha incorreta. Tente novamente.</div>'
    );
    return new Response(html, {
      status: 401,
      headers: { "Content-Type": "text/html" },
    });
  }

  // GET sem cookie = mostrar login
  const html = loginPage.replace("{{ERROR}}", "");
  return new Response(html, {
    status: 401,
    headers: { "Content-Type": "text/html" },
  });
});

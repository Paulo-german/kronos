# 🚀 Kronos LP — Landing Page & Blog

Página de vendas de alta performance e blog integrado para o **Kronos CRM**, construída com foco em conversão, SEO e velocidade extrema de carregamento.

---

## Stack Tecnológica

| Tecnologia        | Versão      | Função                                                         |
| ----------------- | ----------- | -------------------------------------------------------------- |
| **Astro**         | 5.x         | Framework base — entrega HTML puro por padrão (Zero JS)        |
| **Tailwind CSS**  | 4.x         | Motor de estilização via `@theme` tokens (Vite Plugin)         |
| **React**         | 19.x        | Renderiza componentes interativos (Ilhas de Arquitetura)       |
| **Framer Motion** | 12.x        | Animações premium para componentes React (Aceternity/Magic UI) |
| **MDX**           | —           | Permite componentes interativos dentro de posts do blog        |
| **Keystatic**     | 0.5.x       | CMS Git-based (painel admin em `/keystatic`)                   |
| **Vercel**        | Adapter 9.x | Deploy e SSR via Serverless Functions                          |
| **Sitemap**       | —           | Geração automática do sitemap.xml para SEO                     |
| **Lucide React**  | —           | Biblioteca de ícones SVG otimizados                            |

### Utilitários

| Pacote           | Uso                                                                                         |
| ---------------- | ------------------------------------------------------------------------------------------- |
| `clsx`           | Concatenação condicional de classes CSS                                                     |
| `tailwind-merge` | Resolve conflitos de classes Tailwind duplicadas                                            |
| `cn()`           | Função utilitária em `src/utils/cn.ts` que combina os dois acima (padrão Shadcn/Aceternity) |

---

## Estrutura de Pastas

```
src/
├── actions/              # Astro Actions (backend de formulários, webhooks)
├── assets/               # Imagens e SVGs processados pelo pipeline do Astro
├── components/
│   ├── blocks/           # Seções inteiras da Landing Page
│   │   ├── Navbar.astro
│   │   ├── Hero.astro
│   │   ├── Products.astro
│   │   ├── Solutions.astro
│   │   ├── Testimonials.astro
│   │   ├── Developers.astro
│   │   ├── Pricing.astro
│   │   ├── FAQ.astro
│   │   ├── CTA.astro
│   │   └── Footer.astro
│   └── ui/               # Componentes atômicos React (botões, cards animados)
├── content/
│   ├── blog/             # Posts do blog em Markdown/MDX
│   └── config.ts         # Schema tipado com Zod (Content Collections)
├── layouts/
│   └── BaseLayout.astro  # Template HTML principal (SEO, OG Tags, Dark Mode)
├── pages/
│   └── index.astro       # Página de Vendas (importa todos os blocks)
├── styles/
│   └── global.css        # Design Tokens do Tailwind v4 (@theme)
└── utils/
    └── cn.ts             # Utilitário de merge de classes Tailwind
```

---

## Design Tokens

Definidos em `src/styles/global.css` usando a sintaxe `@theme` do Tailwind v4:

| Token           | Valor     | Uso                            |
| --------------- | --------- | ------------------------------ |
| `rocket-purple` | `#8257e5` | Cor de marca principal (Brand) |
| `rocket-green`  | `#00b37e` | Ações e botões de sucesso      |
| `dark-base`     | `#121214` | Background da página           |
| `dark-surface`  | `#202024` | Background de cards e seções   |
| `dark-border`   | `#323238` | Bordas e separadores           |

### Tipografia

| Variável         | Fonte             | Uso                                   |
| ---------------- | ----------------- | ------------------------------------- |
| `--font-jakarta` | Plus Jakarta Sans | Corpo de texto e títulos              |
| `--font-martian` | Martian Mono      | Blocos de código e elementos técnicos |

---

## Configuração (`astro.config.mjs`)

```js
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import keystatic from "@keystatic/astro";
import vercel from "@astrojs/vercel";

export default defineConfig({
  integrations: [react(), mdx(), sitemap(), keystatic()],
  vite: { plugins: [tailwindcss()] },
  adapter: vercel(),
});
```

---

## Path Aliases (`tsconfig.json`)

| Alias           | Caminho Real       |
| --------------- | ------------------ |
| `@/*`           | `src/*`            |
| `@components/*` | `src/components/*` |
| `@assets/*`     | `src/assets/*`     |
| `@actions/*`    | `src/actions/*`    |

---

## Scripts Disponíveis

```bash
pnpm run dev       # Inicia o servidor de desenvolvimento (localhost:4321)
pnpm run build     # Gera o build de produção otimizado para Vercel
pnpm run preview   # Preview local do build de produção
pnpm exec astro check  # Verificação de tipos TypeScript nos arquivos .astro
```

---

## CMS (Keystatic)

O painel administrativo do Keystatic está disponível em `http://localhost:4321/keystatic` durante o desenvolvimento. Os posts são salvos como arquivos Markdown/MDX diretamente no repositório Git (pasta `src/content/blog/`).

---

## Roadmap

- [ ] Estilização premium dos blocos (Tailwind + Aceternity UI + Magic UI)
- [ ] Importação das fontes Jakarta Sans e Martian Mono
- [ ] Geração de imagens placeholder para Hero e Depoimentos
- [ ] Implementação do Blog (`/blog` e `/blog/[slug]`)
- [ ] Integração com Resend (e-mails de captura de leads)
- [ ] Integração com PostHog (analytics e heatmaps)
- [ ] Deploy na Vercel

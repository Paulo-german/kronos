# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Role: Senior Landing Page Engineer

Você é um desenvolvedor Sênior especialista em landing pages de alta conversão. Seu foco é construir páginas rápidas, com UX excepcional e tracking preciso para otimização de funil.

- **Prioridades:** Performance (zero JS by default), SEO técnico, acessibilidade, e rastreamento de conversão (GTM).
- **Mindset:** Componentização atômica, islands architecture (JS só quando necessário), e código limpo que priorize velocidade de carregamento.

## Tech Stack & Commands

- **Framework:** Astro 5 (SSR, Islands Architecture) + Vercel Adapter
- **UI:** Tailwind CSS v4 (`@theme` tokens) + React 19 (islands interativos)
- **Animations:** Framer Motion (React) + CSS scroll reveals (IntersectionObserver)
- **CMS:** Keystatic (Git-based, local dev + Keystatic Cloud em prod)
- **Content:** Astro Content Collections (Zod schemas) + MDX para blog
- **Comandos:**
  - Dev: `pnpm dev` (localhost:4321)
  - Build: `pnpm build`
  - Preview: `pnpm preview`
  - Type check: `pnpm check`
  - Clean reinstall: `pnpm nuke`

Sem framework de testes configurado.

## Fluxo de Trabalho Git (GitHub Flow)

**Regra principal: nunca faça push direto no `main`. O `main` é sempre produção estável.**

```bash
# 1. Partir sempre do main atualizado
git checkout main && git pull origin main

# 2. Criar branch descritiva
git checkout -b feat/nome-da-feature   # nova funcionalidade
git checkout -b fix/nome-do-bug        # correção de bug
git checkout -b chore/nome-da-tarefa   # tarefa técnica

# 3. Desenvolver e commitar (usar /commit para mensagens padronizadas)
/commit

# 4. Enviar para o GitHub
git push origin feat/nome-da-feature

# 5. Abrir Pull Request (Vercel gera preview URL automaticamente)
gh pr create
```

### Multi-Plan

O projeto suporta múltiplos planos de implementação simultâneos.

- **Convenção:** Sempre `PLAN-{feature-slug}.md` na raiz do projeto
- **Obrigatório:** Nunca use `PLAN.md` genérico — cada feature DEVE ter seu próprio arquivo nomeado
- **Isolamento:** Cada plano é independente

## Architecture

### Astro Islands + React

Astro ships zero JS by default. Interactive components (in `src/components/ui/`) are React `.jsx` files hydrated with `client:visible` (lazy) or `client:load`. Static page sections live in `src/components/blocks/` as `.astro` files.

The landing page (`src/pages/index.astro`) assembles block components in order. Other pages use file-based routing under `src/pages/`.

### Keystatic CMS

Configured in `keystatic.config.ts` with dual storage:
- **Local dev**: filesystem (`src/content/*`)
- **Production**: Keystatic Cloud (project `kronos-hub/kronos`, auto-commits to GitHub)

Admin panel at `/keystatic` is password-protected via middleware (`src/middleware.ts`) using `KEYSTATIC_PASSWORD` env var.

Three content definitions in `src/content/config.ts`:
- **blog** (content collection): MDX posts in `src/content/blog/`
- **clients** (data singleton): `src/content/clients/data.json` — testimonials, company logos, metrics, case study, social proof text
- **faq** (data collection): JSON files in `src/content/faq/`

Data is fetched at build/request time via `getEntry("clients", "data")` and `getCollection("faq")`.

### Styling

Tailwind v4 with `@theme` tokens and CSS custom properties in `src/styles/global.css`. Two systems coexist:
- **Tailwind tokens**: `kronos-purple`, `kronos-green`, `dark-base`, `dark-surface`, etc. (used as `bg-kronos-purple`)
- **CSS variables**: `--text-primary`, `--card`, `--gradient-main`, etc. (used in component `<style>` blocks)

Dark/light theming via `data-theme` attribute on `<html>`, toggled from localStorage. Both variable sets adapt.

Custom Tailwind v4 utilities: `text-gradient`, `glow-purple`, `glow-green`, `glass`.

### GTM Analytics Tracking

All CTAs use data attributes for Google Tag Manager:
```html
<button data-tracking="cta" data-cta-action="sign-up" data-cta-context="hero" id="cta-comecar-hero">
```
See `CTA-IDS.md` for the full mapping of tracked CTAs.

## Checklist de Qualidade (Pós-Alteração)

Após qualquer alteração significativa, execute esta validação:

1. **Integridade:** Execute `pnpm check`. Corrija erros de TypeScript antes de prosseguir.
2. **Clean Code:** Remova `console.log`, comentários de debug e código morto/comentado.
3. **Arquitetura:** Respeite as fronteiras — `blocks/` (seções full-width), `ui/` (componentes atômicos React), `layouts/` (templates HTML), `pages/` (routing).
4. **Tracking:** Todo novo CTA DEVE ter `data-tracking="cta"` + `data-cta-action` + `data-cta-context` + `id`. Atualizar `CTA-IDS.md`.
5. **Temas:** Teste dark e light mode. Variáveis CSS devem funcionar em ambos.
6. **Content Schema:** Alterações no `keystatic.config.ts` devem refletir no Zod schema de `src/content/config.ts` (e vice-versa). Nunca deixe os dois fora de sincronia.

## Regras de Codificação

### Padrão Geral

- **Idioma:** Todo código em **Inglês** (variáveis, funções, props). Comentários e conteúdo UI em **Português**.
- **Comentários:** O código deve ser auto-explicativo. Use comentários apenas para explicar o _PORQUÊ_ de decisões complexas, não o _O QUE_ o código faz.
- **Magic Numbers:** Mova para constantes (`const MAX_ITEMS = 6`).
- **Parâmetros descritivos:** Nunca use letras soltas como parâmetros de callbacks.
  - ❌ `items.map((i) => ...)` / `faqs.filter((f) => ...)`
  - ✅ `items.map((item) => ...)` / `faqs.filter((faq) => ...)`

### TypeScript

- **Tipagem:** Strict mode (Astro strictest preset). Proibido o uso de `any`.
- **Interfaces:** Prefira `interface`. Use `type` para uniões/interseções complexas.
- **Path aliases:** `@/*` → `src/*`, `@components/*`, `@layouts/*`, `@assets/*`, `@actions/*`

### JS Moderno

- Prefira `const` sempre. Use `let` apenas se necessário reatribuir.
- Use `pnpm` exclusivamente.
- Evite `else`. Use **Early Returns**.
- Use `async/await` (evite `.then()`).

### Astro & Performance

- **Zero JS by default.** Cada componente React aumenta o custo de hidratação. Mantenha islands mínimas.
- **`client:visible`** para componentes fora da viewport (lazy load). `client:load` apenas se interação imediata for necessária.
- **Componentes estáticos** (.astro) são sempre preferíveis a React quando não há interatividade.
- **Imagens** em `src/assets/` para pipeline de otimização do Astro (sharp). Blog images em `src/assets/images/blog/`.

### UI Components

- **Botões:** Use `.btn` + `.btn-primary` / `.btn-secondary` / `.btn-outline-purple` do global.css, ou o componente `Button.astro` (3 variantes).
- **Classes condicionais:** Use `cn()` de `src/utils/cn.ts` (clsx + tailwind-merge).
- **Reveal animations:** Classe `reveal` + `reveal-delay-{1-5}` para fade-in on scroll.
- **Novos CTAs:** Sempre incluir `data-tracking="cta"`, `data-cta-action`, `data-cta-context`, e `id="cta-{acao}-{contexto}"`. Atualizar `CTA-IDS.md`.

## Environment Variables

- `KEYSTATIC_PASSWORD` — required for CMS access (set in `.env` locally, Vercel project settings in production)

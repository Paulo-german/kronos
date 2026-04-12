# Mapa de IDs e Tracking — CTAs e Botões

Referência de todos os IDs de botões e CTAs da landing page, bem como a arquitetura do Data Layer (*data tags*), organizados por componente.

---

## Arquitetura de Tracking (Data Layer)

Para facilitar a integração com o Google Tag Manager (GTM) e padronizar o rastreamento (Analytics/Pixel), todos os CTAs implementam três atributos principais:

1. **`data-tracking="cta"`**: Gatilho único (Trigger) para disparar a tag. Tudo que for um CTA base terá este atributo. Apenas configure o CSS selector no GTM: `[data-tracking="cta"]`.
2. **`data-cta-action`**: Qual ação o CTA executa (ex: `sign-up`, `login`, `whatsapp`, `share-linkedin`). Passar isso como Variável de Camada de Dados no GTM.
3. **`data-cta-context`**: Qual o local/componente do clique (ex: `hero`, `pricing`, `navbar`).
4. **`data-cta-plan`** *(Apenas em Pricing)*: Registra qual plano o usuário tentou assinar (light, essential, scale, enterprise).

---

## Navbar (`src/components/blocks/Navbar.astro`)

| ID | Texto | Ação (`data-cta-action`) | Contexto (`data-cta-context`) |
|---|---|---|---|
| `cta-comecar-nav` | COMEÇAR AGORA | `sign-up` | `navbar` |
| `cta-comecar-nav-mobile` | COMEÇAR AGORA | `sign-up` | `navbar` |

---

## Hero (`src/components/blocks/Hero.astro`)

| ID | Texto | Ação (`data-cta-action`) | Contexto (`data-cta-context`) |
|---|---|---|---|
| `cta-comecar-hero` | COMEÇAR AGORA | `sign-up` | `hero` |
| `cta-especialista-hero` | AGENDAR DEMONSTRAÇÃO | `whatsapp` | `hero` |

---

## Social Proof (`src/components/blocks/SocialProof.astro`)

| ID | Texto | Ação (`data-cta-action`) | Contexto (`data-cta-context`) |
|---|---|---|---|
| `cta-comecar-social-proof` | QUERO VENDER MAIS | `login` | `social-proof` | 

---

## Products (`src/components/blocks/Products.astro`)

| ID | Texto | Ação (`data-cta-action`) | Contexto (`data-cta-context`) |
|---|---|---|---|
| `cta-comecar-produtos-agentes` | COMEÇAR AGORA | `sign-up` | `products` |
| `cta-comecar-produtos-crm` | COMEÇAR AGORA | `sign-up` | `products` |
| `cta-comecar-produtos-inbox` | COMEÇAR AGORA | `sign-up` | `products` |

---

## Features / IA (`src/components/blocks/Features.astro`)

| ID | Texto | Ação (`data-cta-action`) | Contexto (`data-cta-context`) |
|---|---|---|---|
| `cta-comecar-ia-1` | COMECE AGORA | `login` | `features` |
| `cta-comecar-ia-2` | COMECE AGORA | `login` | `features` |

---

## Automação WhatsApp (`src/components/blocks/GSAPWhatsAppDemo.astro`)

| ID | Texto | Ação (`data-cta-action`) | Contexto (`data-cta-context`) |
|---|---|---|---|
| `cta-comecar-automacao` | COMEÇAR AGORA | `sign-up` | `whatsapp-demo` |

---

## Integrações (`src/components/blocks/Integrations.astro`)

| ID | Texto | Ação (`data-cta-action`) | Contexto (`data-cta-context`) |
|---|---|---|---|
| `btn-docs` | Ver documentação da API | `docs` | `integrations` |

---

## Pricing (`src/components/blocks/Pricing.astro`)

Exclusividade: estes componentes renderizam também a propriedade `data-cta-plan={plan.id}` de forma dinâmica.

| ID | Texto | Ação (`data-cta-action`) | Contexto (`data-cta-context`) |
|---|---|---|---|
| `cta-comecar-light` | COMEÇAR AGORA | `sign-up` | `pricing` |
| `cta-comecar-essential` | COMEÇAR AGORA | `sign-up` | `pricing` |
| `cta-comecar-scale` | COMEÇAR AGORA | `sign-up` | `pricing` |
| `cta-comecar-enterprise` | COMEÇAR AGORA | `sign-up` | `pricing` |

---

## FAQ + CTA Final (`src/components/blocks/FAQ.astro`)

| ID | Texto | Ação (`data-cta-action`) | Contexto (`data-cta-context`) |
|---|---|---|---|
| `cta-especialista-faq` | AGENDAR DEMONSTRAÇÃO | `whatsapp` | `faq` |
| `cta-comecar-cta-final` | COMEÇAR AGORA | `sign-up` | `cta-final` |
| `cta-especialista-cta-final` | AGENDAR DEMONSTRAÇÃO | `whatsapp` | `cta-final` |
| `cta-comecar-footer` | COMEÇAR AGORA | `login` | `footer` |

---

## Páginas Internas

### Sobre Nós (`src/pages/sobre-nos.astro`)
| ID | Texto | Ação (`data-cta-action`) | Contexto (`data-cta-context`) |
|---|---|---|---|
| `cta-comecar-sobre-nos` | COMEÇAR AGORA | `sign-up` | `sobre-nos` |

### Clientes (`src/pages/clientes.astro`)
| ID | Texto | Ação (`data-cta-action`) | Contexto (`data-cta-context`) |
|---|---|---|---|
| `cta-comecar-clientes` | COMEÇAR AGORA | `sign-up` | `clientes` |

### Blog Layout (`src/layouts/BlogLayout.astro`)
| ID | Texto | Ação (`data-cta-action`) | Contexto (`data-cta-context`) |
|---|---|---|---|
| `share-whatsapp-blog` | Compartilhar WhatsApp | `share-whatsapp` | `blog` |
| `share-linkedin-blog` | Compartilhar LinkedIn | `share-linkedin` | `blog` |
| `share-twitter-blog` | Compartilhar X | `share-twitter` | `blog` |
| `share-copy-blog` | Copiar link | `share-copy` | `blog` |
| `cta-comecar-blog` | COMECE AGORA | `sign-up` | `blog` |

### Central de Ajuda (`src/pages/central-de-ajuda.astro`)
| ID | Texto | Ação (`data-cta-action`) | Contexto (`data-cta-context`) |
|---|---|---|---|
| `cta-suporte-ajuda` | FALAR COM SUPORTE | `whatsapp` | `central-de-ajuda` |

### Carreiras (`src/pages/carreiras.astro`)
| ID | Texto | Ação (`data-cta-action`) | Contexto (`data-cta-context`) |
|---|---|---|---|
| `cta-curriculo-carreiras` | ENVIAR CURRÍCULO | `email` | `carreiras` |

---

## Destinos (URLs mapeadas)

| Alias | URL |
|---|---|
| `sign-up` | `https://app.kronoshub.com.br/sign-up` |
| `login` | `https://app.kronoshub.com.br/login` |
| `whatsapp` | `https://wa.me/5521936184733?text=...` |

---

## Análise de Status

✅ **IDs:** Todos os componentes do projeto implementam a convenção de IDs (`cta-{acao}-{contexto}`).

✅ **Data Tracking:** Todos os componentes foram refatorados para possuir `data-tracking="cta"` e seu devido mapeamento de `context` e `action`. O componente global `Button.astro` também foi atualizado para propagar props arbitrárias, estabelecendo um Data Layer para disparos do Google Tag Manager.

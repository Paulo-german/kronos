# Roadmap de Evolução do CMS (Keystatic)

Este documento centraliza o planejamento e as tarefas de evolução do painel administrativo (Keystatic) integrado à Landing Page da Kronos. A prioridade foi organizada da mais fundamental (estrutural na nuvem) para a mais enriquecedora (de experiência visual e arquitetura).

## Checklist de Implementações

- [x] **Etapa 1: Habilitar Persistência na Nuvem (Autenticação)**
  - [x] Adaptar o `keystatic.config.ts` para comportamento duplo: quando estivermos rodando no terminal da nossa máquina (`pnpm dev`) ele salva em "local", porém na Vercel (`produção`), ele muda automático pra Keystatic "cloud".
  - [x] Migrar a estratégia do GitHub App isolado para o Keystatic Cloud (para a equipe conseguir acessar usando apenas e-mail e senha).
  - [x] Testar a injeção do commit de sucesso online.

- [x] **Etapa 2: Criar Coleções para Seções da Landing Page**
  - [x] Construir a Configuração no painel para FAQ (Perguntas e Respostas).
  - [x] Integrar puxada de dados de FAQ no arquivo `FAQ.astro`.
  - [x] Construir a Configuração no painel para Clientes/Logos em Destaque.
  - [x] Refatorar os conteúdos que hoje tão fixados nos componentes `SocialProof.astro` ou similares para iterar essas novas coleções.

- [x] **Etapa 3: Turbinar a Arquitetura do Blog Post**
  - [x] Novo Campo: *Status (Rascunho x Publicado)* com filtros na view e sistema de datas unificado.
  - [x] Nova Coleção paralela: *Autores* e atrelamento (relational fields) no *Post* (Nome, Cargo, e Avatar do autor escrevendo).
  - [x] Novo Campo de Matriz: Categorias / Tags.
  - [x] Bloco de campos para configurações dedicadas de *SEO* da página individual.

- [x] **Etapa 4: Singletons (Painel de Configurações Globais)**
  - [x] Criar modelo de Singleton de "Informações de Contato / Links".
  - [x] Extrair os endereços estáticos de WhatsApp e as definições do Rodapé do código e alimentar passando eles utilizando esta fonte de verdade única.

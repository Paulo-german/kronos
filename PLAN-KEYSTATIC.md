# Roadmap de Evolução do CMS (Keystatic)

Este documento centraliza o planejamento e as tarefas de evolução do painel administrativo (Keystatic) integrado à Landing Page da Kronos. A prioridade foi organizada da mais fundamental (estrutural na nuvem) para a mais enriquecedora (de experiência visual e arquitetura).

## Checklist de Implementações

- [ ] **Etapa 1: Habilitar Persistência na Nuvem (Autenticação do Github)**
  - [ ] Adaptar o `keystatic.config.ts` para comportamento duplo: quando estivermos rodando no terminal da nossa máquina (`pnpm dev`) ele salva os arquivos em "local", porém quando estiver rodando na Vercel (`produção`), ele muda automático pra "github".
  - [ ] Criar o token/GitHub App Application de integração para o Keystatic conectar com esse repositório com autorização correta.
  - [ ] Testar a injeção do commit de sucesso online.

- [ ] **Etapa 2: Criar Coleções para Seções da Landing Page**
  - [ ] Construir a Configuração no painel para FAQ (Perguntas e Respostas).
  - [ ] Integrar puxada de dados de FAQ no arquivo `FAQ.astro`.
  - [ ] Construir a Configuração no painel para Clientes/Logos em Destaque.
  - [ ] Refatorar os conteúdos que hoje tão fixados nos componentes `SocialProof.astro` ou similares para iterar essas novas coleções.

- [ ] **Etapa 3: Turbinar a Arquitetura do Blog Post**
  - [ ] Novo Campo: *Status (Rascunho x Publicado)* com filtros na view e sistema de datas unificado.
  - [ ] Nova Coleção paralela: *Autores* e atrelamento (relational fields) no *Post* (Nome, Cargo, e Avatar do autor escrevendo).
  - [ ] Novo Campo de Matriz: Categorias / Tags.
  - [ ] Bloco de campos para configurações dedicadas de *SEO* da página individual.

- [ ] **Etapa 4: Singletons (Painel de Configurações Globais)**
  - [ ] Criar modelo de Singleton de "Informações de Contato / Links".
  - [ ] Extrair os endereços estáticos de WhatsApp e as definições do Rodapé do código e alimentar passando eles utilizando esta fonte de verdade única.

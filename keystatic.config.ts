import { config, fields, collection, singleton } from "@keystatic/core";

const isDev = import.meta.env?.DEV || process.env.NODE_ENV === 'development';

export default config({
  storage: isDev 
    ? { kind: "local" }
    : { kind: "cloud" },
  cloud: {
    project: "kronos-hub/kronos",
  },
  singletons: {
    contactInfo: singleton({
      label: "Contato & Links Globais",
      path: "src/content/contact/data",
      format: { data: "json" },
      schema: {
        whatsappUrl: fields.text({
          label: "WhatsApp (Vendas / Especialista)",
          description: "URL completa do wa.me com texto pré-preenchido para contato comercial",
        }),
        whatsappSupportUrl: fields.text({
          label: "WhatsApp (Suporte / Ajuda)",
          description: "URL completa do wa.me com texto pré-preenchido para suporte técnico",
        }),
        appUrl: fields.text({
          label: "URL Base do App",
          description: "Ex: https://app.kronoshub.com.br (sem barra final)",
        }),
        instagramUrl: fields.text({ label: "Instagram" }),
        footerTagline: fields.text({ label: "Tagline do Rodapé" }),
        footerColumns: fields.array(
          fields.object({
            title: fields.text({ label: "Título da Coluna" }),
            links: fields.array(
              fields.object({
                label: fields.text({ label: "Texto do Link" }),
                url: fields.text({ label: "URL ou âncora (ex: #faq, /blog)" }),
              }),
              { label: "Links", itemLabel: (props) => props.fields.label.value },
            ),
          }),
          { label: "Colunas do Rodapé", itemLabel: (props) => props.fields.title.value },
        ),
      },
    }),
    landingPage: singleton({
      label: "Landing Page (Textos e Clientes)",
      path: "src/content/clients/data",
      format: { data: "json" },
      schema: {
        socialProof: fields.object({
          heroText: fields.text({ label: "Texto Principal (Hero)" }),
          fomoText: fields.text({ label: "Texto de Escassez (FOMO)" }),
        }, { label: "Textos de Prova Social" }),
        companies: fields.array(
          fields.object({
            name: fields.text({ label: "Nome da Empresa" }),
            icon: fields.text({ label: "Ícone" }),
            style: fields.text({ label: "Classe CSS" }),
          }),
          { label: "Logos em Destaque", itemLabel: props => props.fields.name.value }
        ),
        testimonials: fields.array(
          fields.object({
            name: fields.text({ label: "Nome" }),
            role: fields.text({ label: "Cargo" }),
            company: fields.text({ label: "Empresa" }),
            quote: fields.text({ label: "Depoimento", multiline: true }),
            avatarInitials: fields.text({ label: "Iniciais" }),
            avatarColor: fields.text({ label: "Cor Hex (ex: #8257e5)" }),
            rating: fields.integer({ label: "Nota (1-5)", defaultValue: 5 }),
          }),
          { label: "Depoimentos", itemLabel: props => props.fields.name.value }
        ),
        caseStudy: fields.object({
          company: fields.text({ label: "Empresa" }),
          title: fields.text({ label: "Título" }),
          metrics: fields.array(
            fields.object({
              value: fields.text({ label: "Valor" }),
              label: fields.text({ label: "Rótulo" }),
            }),
            { label: "Métricas do Case", itemLabel: props => props.fields.label.value }
          )
        }, { label: "Estudo de Caso" }),
        metrics: fields.array(
          fields.object({
            target: fields.integer({ label: "Valor (Número)" }),
            suffix: fields.text({ label: "Sufixo (ex: +)" }),
            prefix: fields.text({ label: "Prefixo" }),
            label: fields.text({ label: "Título" }),
            description: fields.text({ label: "Descrição" }),
          }),
          { label: "Métricas Globais", itemLabel: props => props.fields.label.value }
        ),
      }
    }),
  },
  collections: {
    faq: collection({
      label: "FAQ (Dúvidas)",
      slugField: "question",
      path: "src/content/faq/*",
      format: { data: "json" },
      schema: {
        question: fields.slug({ name: { label: "Pergunta" } }),
        answer: fields.text({ label: "Resposta", multiline: true }),
      },
    }),
    authors: collection({
      label: "Autores",
      slugField: "name",
      path: "src/content/authors/*",
      format: { data: "json" },
      schema: {
        name: fields.slug({ name: { label: "Nome" } }),
        role: fields.text({ label: "Cargo" }),
        bio: fields.text({ label: "Bio", multiline: true }),
        avatarInitials: fields.text({ label: "Iniciais do Avatar" }),
      },
    }),
    blog: collection({
      label: "Blog",
      slugField: "title",
      path: "src/content/blog/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Título" } }),
        description: fields.text({
          label: "Descrição",
          description: "Resumo do artigo para SEO e listagem",
        }),
        status: fields.select({
          label: "Status",
          description: "Rascunho não aparece na listagem do blog",
          options: [
            { label: "Rascunho", value: "draft" },
            { label: "Publicado", value: "published" },
          ],
          defaultValue: "draft",
        }),
        author: fields.relationship({
          label: "Autor",
          description: "Opcional — se vazio, exibe 'Equipe Kronos'",
          collection: "authors",
        }),
        categories: fields.multiselect({
          label: "Categorias",
          options: [
            { label: "Vendas", value: "Vendas" },
            { label: "CRM", value: "CRM" },
            { label: "Inteligência Artificial", value: "Inteligência Artificial" },
            { label: "WhatsApp Business", value: "WhatsApp Business" },
            { label: "Gestão Comercial", value: "Gestão Comercial" },
            { label: "Tecnologia", value: "Tecnologia" },
          ],
        }),
        pubDate: fields.date({
          label: "Data de publicação",
        }),
        updatedDate: fields.date({
          label: "Data de atualização",
          description: "Opcional — preencha apenas se o artigo foi atualizado",
        }),
        heroImage: fields.image({
          label: "Imagem de capa",
          description: "Opcional — imagem exibida no topo do artigo",
          directory: "src/assets/images/blog",
          publicPath: "../../assets/images/blog/",
        }),
        seoTitle: fields.text({
          label: "Título SEO",
          description: "Opcional — se vazio, usa o título do artigo",
        }),
        seoDescription: fields.text({
          label: "Descrição SEO",
          description: "Opcional — se vazia, usa a descrição do artigo",
          multiline: true,
        }),
        content: fields.mdx({
          label: "Conteúdo",
          options: {
            image: {
              directory: "src/assets/images/blog",
              publicPath: "../../assets/images/blog/",
            },
          },
        }),
      },
    }),
  },
});

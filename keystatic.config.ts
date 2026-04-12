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

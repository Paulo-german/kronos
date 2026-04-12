import { config, fields, collection } from "@keystatic/core";

const isDev = import.meta.env?.DEV || process.env.NODE_ENV === 'development';

export default config({
  storage: isDev 
    ? { kind: "local" }
    : { kind: "github", repo: "Paulo-german/kronos" },
  collections: {
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

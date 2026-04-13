import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date().optional(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image().optional(),
      status: z.enum(["draft", "published"]).default("published"),
      author: z.string().optional(),
      categories: z.array(z.string()).default([]),
      seoTitle: z.string().optional(),
      seoDescription: z.string().optional(),
    }),
});

const authors = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    role: z.string(),
    bio: z.string(),
    avatarInitials: z.string(),
  }),
});

const clients = defineCollection({
  type: "data",
  schema: z.object({
    testimonials: z.array(
      z.object({
        name: z.string(),
        role: z.string(),
        company: z.string(),
        quote: z.string(),
        avatarInitials: z.string(),
        avatarColor: z.string(),
        rating: z.number().min(1).max(5),
      }),
    ),
    companies: z.array(
      z.object({
        name: z.string(),
        icon: z.string(),
        style: z.string(),
      }),
    ),
    caseStudy: z.object({
      company: z.string(),
      title: z.string(),
      metrics: z.array(
        z.object({
          value: z.string(),
          label: z.string(),
        }),
      ),
    }),
    metrics: z.array(
      z.object({
        target: z.number(),
        suffix: z.string(),
        prefix: z.string().default(""),
        label: z.string(),
        description: z.string(),
      }),
    ),
    socialProof: z.object({
      heroText: z.string(),
      fomoText: z.string(),
    }),
  }),
});

const faq = defineCollection({
  type: "data",
  schema: z.object({
    question: z.string(),
    answer: z.string()
  }),
});

export const collections = { blog, clients, faq, authors };

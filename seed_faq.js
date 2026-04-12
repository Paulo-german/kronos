const fs = require('fs');

const faqs = [
  {
    question: "Por que a Kronos e não um HubSpot, Pipedrive ou RD?",
    answer: "Essas ferramentas são CRMs genéricos — fazem um pouco de tudo e não focam em resultado de vendas. A Kronos foi construída pra uma coisa só: ajudar seu time a vender mais. Funil de vendas que se atualiza sozinho, IA que responde lead em segundos, inbox unificada. Tudo que move o ponteiro, sem funcionalidade que ninguém usa.",
  },
  {
    question: "Pra que tipo de empresa a Kronos funciona?",
    answer: "Funciona pra qualquer empresa que vende com time comercial — de 1 a 200 vendedores. Especialmente quem vende serviço, produto de alto valor ou atendimento consultivo. Se seu lead chega por WhatsApp, Instagram ou formulário e precisa de resposta rápida, a Kronos foi feita pra você.",
  },
  {
    question: "Em quanto tempo eu vejo resultado?",
    answer: "A implementação leva de 3 a 5 dias úteis com acompanhamento da nossa equipe. Mas o impacto é imediato: no dia 1 seus leads já são respondidos em segundos pela IA. Clientes relatam aumento de conversão já na primeira semana.",
  },
  {
    question: "E se meu time não souber usar?",
    answer: "A Kronos foi feita pra ser simples — se você sabe usar WhatsApp, sabe usar a Kronos. Mas além disso, todo plano inclui onboarding completo. Configuramos tudo, treinamos o time e acompanhamos até vocês estarem rodando sozinhos.",
  },
  {
    question: "Integra com WhatsApp e Instagram?",
    answer: "Sim. Integrações nativas com WhatsApp Business API, Meta Ads (Facebook e Instagram), além de Supabase, n8n e Typebot. Tudo chega na mesma inbox e alimenta o CRM automaticamente.",
  },
  {
    question: "Consigo migrar meus dados de outro CRM?",
    answer: "Sim. Importamos contatos, negócios e histórico via CSV, Excel ou API. Nossa equipe acompanha a migração pra garantir que nada se perca. Já migramos clientes de Salesforce, HubSpot, Pipedrive e planilhas.",
  },
  {
    question: "A IA não vai parecer um robô genérico?",
    answer: "Não. Os agentes são treinados com informações da sua empresa, seu tom de voz, seus produtos e suas respostas pra objeções. O cliente conversa com algo que soa como sua marca, não como um bot de menu.",
  },
];

faqs.forEach((faq, index) => {
  const content = JSON.stringify(faq, null, 2);
  const title = faq.question.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  // add index so order is preserved locally nicely
  fs.writeFileSync(`src/content/faq/${index + 1}-${title}.json`, content);
});
console.log('FAQs seeded successfully!');

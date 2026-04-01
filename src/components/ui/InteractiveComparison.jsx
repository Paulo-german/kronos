import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  Bot,
  Zap,
  XCircle,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Clock,
} from "lucide-react";

export default function InteractiveComparison() {
  const [activeTab, setActiveTab] = useState("kronos");

  const tabs = [
    {
      id: "old",
      label: "O Jeito Antigo",
      icon: <Layers size={18} />,
      title: "Planilha + WhatsApp + Reza",
      description:
        "Vendedor pulando entre 5 abas, lead esperando horas por resposta, gestor sem visibilidade nenhuma. O resultado? Venda perdida e ninguém sabe por quê.",
      metrics: [
        {
          label: "Tempo de Resposta",
          value: "3 a 5 horas (se responde)",
          icon: <Clock size={16} color="var(--danger)" />,
        },
        {
          label: "Leads Perdidos",
          value: "Alto — sem rastreio",
          icon: <XCircle size={16} color="var(--danger)" />,
        },
        {
          label: "Vendas Fora do Horário",
          value: "Zero",
          icon: <AlertTriangle size={16} color="var(--warning)" />,
        },
      ],
      color: "var(--danger)",
      bgImage:
        "linear-gradient(45deg, rgba(239, 68, 68, 0.05) 0%, transparent 100%)",
      borderColor: "rgba(239, 68, 68, 0.2)",
    },
    {
      id: "generic",
      label: "Bots Genéricos",
      icon: <Bot size={18} />,
      title: "\"Digite 1 para Vendas\"",
      description:
        "Menus robóticos que irritam o cliente e perdem a venda. O lead quer conversar, não navegar num labirinto. E no final, ninguém sabe o que aconteceu com aquele contato.",
      metrics: [
        {
          label: "Experiência do Cliente",
          value: "Frustrante",
          icon: <XCircle size={16} color="var(--danger)" />,
        },
        {
          label: "Qualificação Real",
          value: "Quase nenhuma",
          icon: <AlertTriangle size={16} color="var(--warning)" />,
        },
        {
          label: "Conexão com CRM",
          value: "Gambiarra",
          icon: <AlertTriangle size={16} color="var(--warning)" />,
        },
      ],
      color: "var(--warning)",
      bgImage:
        "linear-gradient(45deg, rgba(245, 158, 11, 0.05) 0%, transparent 100%)",
      borderColor: "rgba(245, 158, 11, 0.2)",
    },
    {
      id: "kronos",
      label: "Com a Kronos",
      icon: <Zap size={18} />,
      title: "Resposta, qualificação e funil de vendas. Tudo automático.",
      description:
        "A IA responde em segundos, entende o que o cliente precisa, cria o negócio no CRM e avisa o vendedor na hora certa. Tudo numa tela, sem esforço manual.",
      metrics: [
        {
          label: "Tempo de Resposta",
          value: "< 2 segundos, 24/7",
          icon: <CheckCircle2 size={16} color="var(--success)" />,
        },
        {
          label: "Qualificação",
          value: "Automática e completa",
          icon: <CheckCircle2 size={16} color="var(--success)" />,
        },
        {
          label: "Funil de vendas",
          value: "Atualizado em tempo real",
          icon: <CheckCircle2 size={16} color="var(--success)" />,
        },
      ],
      color: "var(--purple)",
      bgImage:
        "linear-gradient(135deg, rgba(130, 87, 229, 0.1) 0%, rgba(97, 218, 251, 0.05) 100%)",
      borderColor: "rgba(130, 87, 229, 0.3)",
    },
  ];

  const activeContent = tabs.find((t) => t.id === activeTab);

  return (
    <section
      className="comparison-section"
      style={{
        padding: "80px 0",
        borderTop: "1px solid var(--dark-3)",
      }}
    >
      <div
        className="container"
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px" }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div
            style={{
              display: "inline-block",
              background: "var(--dark)",
              border: "1px solid var(--dark-3)",
              color: "var(--text-primary)",
              fontFamily: "var(--font-body)",
              fontSize: "12px",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "2px",
              padding: "6px 16px",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          >
            Antes vs Depois
          </div>
          <h2
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(28px, 4vw, 36px)",
              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}
          >
            Você ainda vende{" "}
            <span style={{ color: "var(--text-primary)" }}>assim?</span>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "16px",
              color: "var(--text-secondary)",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Compare o jeito antigo, os bots genéricos e o que a Kronos entrega
            de verdade. A diferença aparece no faturamento.
          </p>
        </div>

        {/* Tab Switcher Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.8fr)",
            gap: "40px",
            alignItems: "start",
          }}
          className="comparison-layout"
        >
          {/* Tabs Menu */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "24px",
                    background: isActive
                      ? "var(--dark)"
                      : "transparent",
                    border: `1px solid ${isActive ? tab.borderColor : "var(--dark-3)"}`,
                    borderRadius: "16px",
                    color: isActive ? "var(--text-primary)" : "var(--text-muted)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    textAlign: "left",
                    width: "100%",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  className="tab-button"
                  onMouseEnter={(e) => {
                    if (!isActive)
                      e.currentTarget.style.background =
                        "var(--overlay-bg)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive)
                      e.currentTarget.style.background = "transparent";
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "40px",
                      height: "40px",
                      borderRadius: "12px",
                      background: isActive
                        ? `rgba(${tab.color === "#ef4444" ? "239,68,68" : tab.color === "#f59e0b" ? "245,158,11" : "130,87,229"}, 0.2)`
                        : "var(--overlay-bg)",
                      color: isActive ? tab.color : "var(--text-secondary)",
                      transition: "all 0.3s",
                    }}
                  >
                    {tab.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: isActive ? 600 : 500,
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {tab.label}
                    </div>
                  </div>

                  {isActive && (
                    <motion.div
                      layoutId="active-indicator"
                      style={{
                        position: "absolute",
                        right: "16px",
                        display: "flex",
                      }}
                    >
                      <ArrowRight size={18} color={tab.color} />
                    </motion.div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Content Window */}
          <div
            style={{
              background: "var(--dark)",
              border: `1px solid ${activeContent.borderColor}`,
              borderRadius: "16px",
              overflow: "hidden",
              position: "relative",
              minHeight: "400px",
            }}
            className="content-window"
          >
            {/* Animated Background Mesh */}
            <motion.div
              key={`bg-${activeTab}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                position: "absolute",
                inset: 0,
                background: activeContent.bgImage,
                pointerEvents: "none",
                zIndex: 0,
              }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                style={{
                  position: "relative",
                  zIndex: 1,
                  padding: "32px",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <div style={{ marginBottom: "auto" }}>
                  <div
                    style={{
                      color: activeContent.color,
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      fontWeight: 500,
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      marginBottom: "16px",
                    }}
                  >
                    Processo
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "28px",
                      fontWeight: 500,
                      letterSpacing: "-0.02em",
                      color: "var(--text-primary)",
                      marginBottom: "24px",
                    }}
                  >
                    {activeContent.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "16px",
                      color: "var(--text-secondary)",
                      lineHeight: 1.8,
                      marginBottom: "40px",
                      maxWidth: "500px",
                    }}
                  >
                    {activeContent.description}
                  </p>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "20px",
                    borderTop: "1px solid var(--dark-3)",
                    paddingTop: "32px",
                  }}
                >
                  {activeContent.metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: "12px",
                          color: "var(--text-secondary)",
                          fontWeight: 500,
                        }}
                      >
                        {metric.icon} {metric.label}
                      </div>
                      <div
                        style={{
                          fontSize: "15px",
                          color: "var(--text-primary)",
                          fontWeight: 600,
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        {metric.value}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .comparison-layout {
            grid-template-columns: 1fr !important;
          }
          .content-window {
            min-height: auto !important;
          }
        }
        @media (max-width: 640px) {
          .comparison-section {
            padding: 48px 0 !important;
          }
          .content-window > div > div:last-child {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .tab-button {
            padding: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}

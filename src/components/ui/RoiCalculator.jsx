import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  TrendingUp,
  DollarSign,
  MousePointerClick,
} from "lucide-react";

export default function RoiCalculator() {
  const [leads, setLeads] = useState(500);
  const [ticket, setTicket] = useState(1500);
  const [winRate, setWinRate] = useState(10);
  const [isHovered, setIsHovered] = useState(false);

  // Calcula a receita atual
  const currentRevenue = leads * ticket * (winRate / 100);

  // A Kronos aumenta a taxa de conversão recuperando leads perdidos e acelerando a qualificação
  const projectedWinRate = Math.min(winRate * 2.5, 100);
  const projectedRevenue = leads * ticket * (projectedWinRate / 100);

  // Dinheiro deixado na mesa = diferença
  const lostMoney = projectedRevenue - currentRevenue;

  const formatCurrency = (val) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <section
      className="roi-section"
      style={{ padding: "80px 0", position: "relative" }}
    >
      <div
        className="container"
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px" }}
      >
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div
            style={{
              display: "inline-block",
              background: "var(--dark-2)",
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
            Faça as contas
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
            Quanto você está{" "}
            <span style={{ color: "var(--text-primary)" }}>perdendo por mês?</span>
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
            Coloque os números da sua operação e veja quanto de receita sua
            equipe deixa escapar todo mês por falta de velocidade.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
            gap: "40px",
            alignItems: "center",
            background: "var(--dark-2)",
            border: "1px solid var(--dark-3)",
            borderRadius: "16px",
            padding: "32px",
          }}
          className="calc-grid"
        >
          {/* Controllers */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "32px" }}
          >
            {/* Leads */}
            <div className="slider-group">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "12px",
                }}
              >
                <label
                  style={{ fontFamily: "var(--font-body)", fontSize: "15px", fontWeight: 500, color: "var(--text-primary)" }}
                >
                  Leads novos por mês
                </label>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "var(--cyan)",
                  }}
                >
                  {leads}
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="5000"
                step="50"
                value={leads}
                onChange={(e) => setLeads(Number(e.target.value))}
                style={{
                  width: "100%",
                  accentColor: "#61dafb",
                  cursor: "grab",
                }}
              />
            </div>

            {/* Ticket Médio */}
            <div className="slider-group">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "12px",
                }}
              >
                <label
                  style={{ fontFamily: "var(--font-body)", fontSize: "15px", fontWeight: 500, color: "var(--text-primary)" }}
                >
                  Valor médio por venda (R$)
                </label>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "var(--purple)",
                  }}
                >
                  {formatCurrency(ticket)}
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="20000"
                step="100"
                value={ticket}
                onChange={(e) => setTicket(Number(e.target.value))}
                style={{
                  width: "100%",
                  accentColor: "#8257e5",
                  cursor: "grab",
                }}
              />
            </div>

            {/* Taxa de Conversão Atual */}
            <div className="slider-group">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "12px",
                }}
              >
                <label
                  style={{ fontFamily: "var(--font-body)", fontSize: "15px", fontWeight: 500, color: "var(--text-primary)" }}
                >
                  Taxa de conversão atual (%)
                </label>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                  }}
                >
                  {winRate}%
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                step="1"
                value={winRate}
                onChange={(e) => setWinRate(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#fff", cursor: "grab" }}
              />
            </div>

            <div
              style={{
                marginTop: "16px",
                padding: "24px",
                background: "var(--dark-3)",
                borderRadius: "16px",
                border: "1px solid var(--dark-3)",
              }}
            >
              <h4
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "14px",
                  color: "var(--text-secondary)",
                  marginBottom: "8px",
                  fontWeight: 500,
                }}
              >
                Sua receita mensal hoje
              </h4>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "28px",
                  fontWeight: 700,
                }}
              >
                {formatCurrency(currentRevenue)}
              </div>
            </div>
          </div>

          {/* Results Display */}
          <motion.div
            style={{
              position: "relative",
              background: "var(--dark-3)",
              borderRadius: "16px",
              padding: "32px",
              border: "1px solid rgba(130, 87, 229, 0.3)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              overflow: "hidden",
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <div style={{ position: "relative", zIndex: 10 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "24px",
                }}
              >
                <TrendingUp size={24} color="var(--cyan)" />
                <h3 style={{ fontFamily: "var(--font-body)", fontSize: "18px", fontWeight: 500 }}>
                  Com a Kronos
                </h3>
              </div>

              <div style={{ marginBottom: "32px" }}>
                <div
                  style={{
                    fontSize: "14px",
                    color: "var(--text-secondary)",
                    marginBottom: "8px",
                    fontWeight: 500,
                  }}
                >
                  Nova taxa de conversão estimada
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "12px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "40px",
                      fontWeight: 700,
                      color: "var(--cyan)",
                    }}
                  >
                    {projectedWinRate.toFixed(1)}%
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      color: "rgba(97, 218, 251, 0.8)",
                    }}
                  >
                    (+{(projectedWinRate - winRate).toFixed(1)}% de melhoria)
                  </span>
                </div>
              </div>

              <div
                style={{
                  padding: "24px",
                  background: "var(--dark-2)",
                  borderRadius: "16px",
                  border: "1px solid var(--dark-3)",
                }}
              >
                <div
                  style={{
                    fontSize: "14px",
                    color: "var(--text-secondary)",
                    marginBottom: "8px",
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <DollarSign size={16} color="var(--purple)" /> Receita que você
                  está deixando escapar
                </div>

                {/* Animated Number Logic could be built with framer-motion, but straight interpolation works fine in React for now */}
                <motion.div
                  key={lostMoney}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "clamp(32px, 4vw, 48px)",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  <span style={{ color: "var(--purple)" }}>+</span>{" "}
                  {formatCurrency(lostMoney)}
                </motion.div>

                <div
                  style={{
                    fontSize: "13px",
                    color: "var(--text-muted)",
                    marginTop: "8px",
                  }}
                >
                  Todo mês. Indo pro concorrente que responde mais rápido.
                </div>
              </div>

              <a
                href="https://app.kronoshub.com.br/login"
                className="roi-cta"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  marginTop: "32px",
                  height: "44px",
                  padding: "0 28px",
                  background: "transparent",
                  color: "var(--text-primary)",
                  border: "1px solid var(--purple)",
                  borderRadius: "8px",
                  fontFamily: "var(--font-body)",
                  fontWeight: 700,
                  fontSize: "14px",
                  textTransform: "uppercase",
                  letterSpacing: "0.02em",
                  textDecoration: "none",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "var(--purple)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                id="cta-comecar-calculadora"
              >
                QUERO RECUPERAR ESSA RECEITA
              </a>
            </div>

            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    background: "var(--dark-2)",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    fontFamily: "var(--font-body)",
                    fontSize: "11px",
                    color: "var(--text-primary)",
                    border: "1px solid var(--dark-3)",
                    zIndex: 20,
                  }}
                >
                  Atualizado em tempo real
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .calc-grid {
            grid-template-columns: 1fr !important;
            padding: 24px !important;
          }
        }
        @media (max-width: 640px) {
          .calc-grid {
            padding: 16px !important;
          }
          .roi-section {
            padding: 48px 0 !important;
          }
        }
        input[type=range] {
          -webkit-appearance: none;
          background: var(--dark-3);
          height: 6px;
          border-radius: 6px;
          outline: none;
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: currentColor;
          cursor: pointer;
          border: 4px solid var(--dark-2);
        }
        input[type=range]::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: currentColor;
          cursor: pointer;
          border: 4px solid var(--dark-2);
        }
      `}</style>
    </section>
  );
}

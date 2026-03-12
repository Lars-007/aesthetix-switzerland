"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqData = [
    { q: "Was genau sind die Produkte von AESTHETIX?", a: "Unsere Produkte sind hochdosierte Skincare-Formeln und professionelle Tools, die speziell für Männer entwickelt wurden. Von Wimpernserum über Dermaroller bis zur Jawline Mask — alles Swiss Made." },
    { q: "Wann sehe ich erste Resultate?", a: "Sofortige Ergebnisse bei Tools wie Gua Sha und Jawline Mask. Bei Seren und Cremes sind sichtbare Verbesserungen nach 2–4 Wochen täglicher Anwendung zu erwarten." },
    { q: "Wie lange dauert der Versand?", a: "1–3 Werktage innerhalb der Schweiz mit Tracking. Express-Versand ist ebenfalls verfügbar für Zustellung am nächsten Tag. Ab CHF 50 versandkostenfrei." },
    { q: "Kann ich Produkte zurückgeben?", a: "Ja, wir bieten ein 14-tägiges Rückgaberecht auf alle ungeöffneten Produkte. Einfach eine E-Mail an support@aesthetix.ch." },
    { q: "Sind die Produkte tierversuchsfrei?", a: "Alle AESTHETIX Produkte sind 100% vegan und tierversuchsfrei (cruelty-free). Wir testen nie an Tieren und verwenden nur nachhaltige Inhaltsstoffe." },
];

export default function FAQ() {
    const [open, setOpen] = useState<number | null>(null);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section className="section-gap" id="faq">
            <div className="container" style={{ maxWidth: "720px" }} ref={ref}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }} style={{ textAlign: "center", marginBottom: "3.5rem" }}>
                    <div className="badge" style={{ margin: "0 auto 1rem" }}>SUPPORT</div>
                    <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900 }}>
                        {"Häufige Fragen".split("").map((c, i) => (
                            <motion.span key={i} initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.1 + i * 0.02, duration: 0.4 }} style={{ display: "inline-block" }}>
                                {c === " " ? "\u00A0" : c}
                            </motion.span>
                        ))}
                    </h2>
                </motion.div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {faqData.map((f, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                            style={{
                                borderRadius: "var(--radius-sm)",
                                border: `1px solid ${open === i ? "rgba(255,255,255,0.1)" : "var(--border)"}`,
                                background: open === i ? "var(--bg-hover)" : "transparent",
                                transition: "all 0.4s var(--ease)",
                            }}>
                            <button onClick={() => setOpen(open === i ? null : i)} style={{
                                width: "100%", padding: "1.2rem 1.4rem", background: "transparent", border: "none", color: "#fff",
                                fontSize: "0.92rem", fontWeight: 600, display: "flex", justifyContent: "space-between", alignItems: "center",
                                cursor: "pointer", textAlign: "left", transition: "padding 0.3s",
                            }}>
                                <span>{f.q}</span>
                                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                                    <ChevronDown size={16} color={open === i ? "#fff" : "#555"} />
                                </motion.div>
                            </button>
                            <AnimatePresence>
                                {open === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 25 }}>
                                        <div style={{ padding: "0 1.4rem 1.4rem", color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "0.9rem" }}>
                                            {f.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

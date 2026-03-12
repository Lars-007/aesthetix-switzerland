"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="container" style={{ padding: "5rem 2rem", minHeight: "80vh", maxWidth: "900px" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center", marginBottom: "4rem" }}>
                <div className="badge" style={{ margin: "0 auto 1rem" }}>UNSERE STORY</div>
                <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 900, marginBottom: "1.5rem" }}>Über AESTHETIX</h1>
                <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", lineHeight: 1.8, maxWidth: "600px", margin: "0 auto" }}>
                    Wir glauben, dass jeder Mann das Potenzial hat, sein bestes Selbst zu sein. AESTHETIX wurde in der Schweiz gegründet mit einer klaren Mission: Premium Skincare & Tools, die wirklich funktionieren.
                </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                style={{ borderRadius: "var(--radius)", overflow: "hidden", marginBottom: "4rem", height: "400px", position: "relative", border: "1px solid var(--border)" }}>
                <Image src="/hero.png" alt="AESTHETIX Team" fill style={{ objectFit: "cover", opacity: 0.6 }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #000 10%, transparent 60%)" }} />
            </motion.div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", marginBottom: "5rem" }}>
                {[
                    { title: "Swiss Quality", desc: "Alle Produkte werden in der Schweiz entwickelt und unterliegen strengsten Qualitätsstandards. Hochdosierte Wirkstoffe, keine Kompromisse." },
                    { title: "Science-Based", desc: "Jede Formel basiert auf wissenschaftlichen Studien. Klinisch getestete Inhaltsstoffe für nachweisbare Ergebnisse." },
                    { title: "For Men", desc: "Speziell für Männerhaut entwickelt. Unsere Produkte sind auf den pH-Wert und die Hautstärke von Männern abgestimmt." },
                    { title: "Cruelty Free", desc: "100% vegan und tierversuchsfrei. Wir testen nie an Tieren und verwenden nur nachhaltige Inhaltsstoffe." },
                ].map((item, i) => (
                    <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                        style={{ padding: "2rem", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)" }}>
                        <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.8rem" }}>{item.title}</h3>
                        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.7 }}>{item.desc}</p>
                    </motion.div>
                ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem", textAlign: "center", padding: "3rem 0", borderTop: "1px solid var(--border)" }}>
                {[{ n: "10,000+", l: "Zufriedene Kunden" }, { n: "4.8 / 5.0", l: "Bewertung" }, { n: "2024", l: "Gegründet in Zürich" }].map((s) => (
                    <div key={s.l}>
                        <div style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "0.3rem" }}>{s.n}</div>
                        <div style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>{s.l}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

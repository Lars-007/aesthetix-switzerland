"use client";
import { motion } from "framer-motion";

export default function Impressum() {
    return (
        <div className="container" style={{ padding: "5rem 2rem", maxWidth: "760px" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="badge" style={{ marginBottom: "1.2rem" }}>RECHTLICHES</div>
                <h1 style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: "0.5rem" }}>Impressum</h1>
                <p style={{ color: "var(--text-muted)", marginBottom: "3rem", fontSize: "0.85rem" }}>Stand: März 2026</p>

                {[
                    { title: "Angaben gemäss Art. 3 UWG (Schweiz)", body: `AESTHETIX GmbH\nMusterstrasse 1\n8001 Zürich\nSchweiz` },
                    { title: "Kontakt", body: `E-Mail: hello@aesthetix.ch\nTelefon: +41 44 000 00 00\nWebsite: www.aesthetix.ch` },
                    { title: "Unternehmensregister", body: `Handelsregister Kanton Zürich\nUID: CHE-000.000.000\nMwSt.-Nr.: CHE-000.000.000 MWST` },
                    { title: "Verantwortlich für den Inhalt", body: `AESTHETIX GmbH\nGeschäftsführung: [Name]\nMusterstrasse 1, 8001 Zürich` },
                    { title: "Haftungsausschluss", body: `Die Inhalte unserer Seiten wurden mit grösster Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten verantwortlich.` },
                    { title: "Urheberrecht", body: `Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem schweizerischen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung ausserhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.` },
                ].map(({ title, body }) => (
                    <div key={title} style={{ marginBottom: "2.5rem", paddingBottom: "2.5rem", borderBottom: "1px solid var(--border)" }}>
                        <h2 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.8rem", letterSpacing: "-0.01em" }}>{title}</h2>
                        <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.9, whiteSpace: "pre-line" }}>{body}</p>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

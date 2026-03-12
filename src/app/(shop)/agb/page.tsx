"use client";
import { motion } from "framer-motion";

export default function AGB() {
    return (
        <div className="container" style={{ padding: "5rem 2rem", maxWidth: "760px" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="badge" style={{ marginBottom: "1.2rem" }}>RECHTLICHES</div>
                <h1 style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: "0.5rem" }}>Allgemeine Geschäftsbedingungen</h1>
                <p style={{ color: "var(--text-muted)", marginBottom: "3rem", fontSize: "0.85rem" }}>Stand: März 2026</p>

                {[
                    { title: "§1 Geltungsbereich", body: `Diese Allgemeinen Geschäftsbedingungen gelten für alle Bestellungen, die über den Online-Shop von AESTHETIX GmbH (nachfolgend "AESTHETIX") abgeschlossen werden. Vertragspartner sind AESTHETIX GmbH und der Käufer (Verbraucher oder Unternehmer).` },
                    { title: "§2 Vertragsschluss", body: `Die Darstellung von Produkten im Online-Shop stellt kein rechtlich bindendes Angebot dar. Durch das Klicken auf "Zur Kasse" geben Sie eine verbindliche Bestellung ab. Die Bestellungsannahme erfolgt durch eine Auftragsbestätigungs-E-Mail von AESTHETIX.` },
                    { title: "§3 Preise und Zahlung", body: `Alle Preise sind in CHF angegeben und verstehen sich inkl. der gesetzlichen Mehrwertsteuer (7.7%). Akzeptierte Zahlungsmethoden: Kreditkarte, TWINT, PayPal. Die Zahlung ist sofort bei Bestellabschluss fällig.` },
                    { title: "§4 Versand und Lieferung", body: `• Kostenloser Versand ab CHF 50 Bestellwert (Schweiz)\n• Standardversand (3–5 Werktage): CHF 6.00\n• Expressversand (1–2 Werktage): CHF 12.00\n• Lieferung nur innerhalb der Schweiz und Liechtenstein\n\nLieferzeiten gelten ab Zahlungseingang.` },
                    { title: "§5 Widerrufsrecht", body: `Verbraucher haben das Recht, binnen 14 Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt 14 Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter die Waren in Besitz genommen haben. Ausgenommen sind geöffnete Produkte aus hygienischen Gründen.` },
                    { title: "§6 Retourenabwicklung", body: `Bitte kontaktieren Sie uns vor der Rücksendung unter hello@aesthetix.ch. Die Rücksendung erfolgt auf Ihre Kosten. Nach Eingang und Prüfung der Ware erstatten wir den Kaufpreis innerhalb von 14 Tagen. Erstattung erfolgt über die ursprüngliche Zahlungsmethode.` },
                    { title: "§7 Gewährleistung", body: `Es gelten die gesetzlichen Gewährleistungsrechte gemäss Schweizer OR. Bei Mängeln kontaktieren Sie uns unter hello@aesthetix.ch mit Beschreibung und Foto des Mangels.` },
                    { title: "§8 Haftungsbeschränkung", body: `AESTHETIX haftet uneingeschränkt für Schäden aus Verletzung des Lebens, des Körpers oder der Gesundheit sowie für vorsätzliche und grob fahrlässige Pflichtverletzungen. Im Übrigen ist die Haftung auf vorhersehbare Schäden begrenzt.` },
                    { title: "§9 Anwendbares Recht", body: `Es gilt Schweizer Recht. Gerichtsstand ist Zürich, Schweiz.` },
                ].map(({ title, body }) => (
                    <div key={title} style={{ marginBottom: "2.5rem", paddingBottom: "2.5rem", borderBottom: "1px solid var(--border)" }}>
                        <h2 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.8rem" }}>{title}</h2>
                        <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.9, whiteSpace: "pre-line" }}>{body}</p>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

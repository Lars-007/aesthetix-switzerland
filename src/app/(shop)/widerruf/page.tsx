"use client";
import { motion } from "framer-motion";

export default function Widerruf() {
    return (
        <div className="container" style={{ padding: "5rem 2rem", maxWidth: "760px" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="badge" style={{ marginBottom: "1.2rem" }}>RECHTLICHES</div>
                <h1 style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: "0.5rem" }}>Widerrufsrecht</h1>
                <p style={{ color: "var(--text-muted)", marginBottom: "3rem", fontSize: "0.85rem" }}>Stand: März 2026</p>

                {[
                    { title: "Widerrufsrecht", body: `Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.\n\nDie Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die Waren in Besitz genommen haben bzw. hat.\n\nUm Ihr Widerrufsrecht auszuüben, müssen Sie uns (AESTHETIX GmbH, Musterstrasse 1, 8001 Zürich, hello@aesthetix.ch) mittels einer eindeutigen Erklärung (z.B. ein Brief oder eine E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.` },
                    { title: "Ausnahmen vom Widerrufsrecht", body: `Das Widerrufsrecht besteht nicht bei:\n• Waren, die aus Gründen des Gesundheitsschutzes oder der Hygiene nicht zur Rückgabe geeignet sind, wenn ihre Versiegelung nach der Lieferung entfernt wurde\n• Waren, die bereits geöffnet oder benutzt wurden` },
                    { title: "Folgen des Widerrufs", body: `Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist.\n\nDie Rückzahlung erfolgt mit demselben Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben.\n\nWir können die Rückzahlung verweigern, bis wir die Waren wieder zurückerhalten haben oder bis Sie den Nachweis erbracht haben, dass Sie die Waren zurückgesandt haben.` },
                    { title: "Rücksendung", body: `Sie haben die Waren unverzüglich und in jedem Fall spätestens binnen vierzehn Tagen ab dem Tag, an dem Sie uns über den Widerruf dieses Vertrags unterrichten, an uns zurückzusenden oder zu übergeben.\n\nAdresse:\nAESTHETIX GmbH\nMusterstrasse 1\n8001 Zürich\n\nSie tragen die unmittelbaren Kosten der Rücksendung der Waren.` },
                    { title: "Musterwiderrufsformular", body: `An AESTHETIX GmbH, Musterstrasse 1, 8001 Zürich, hello@aesthetix.ch:\n\nHiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den Kauf der folgenden Waren (*):\n\n[Produktname / Bestellnummer]\n\nBestellt am (*) / erhalten am (*):\n[Datum]\n\nName des/der Verbraucher(s):\n[Ihr Name]\n\nAnschrift des/der Verbraucher(s):\n[Ihre Adresse]\n\nDatum: [Datum]\n\n(*) Unzutreffendes streichen.` },
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

"use client";
import { motion } from "framer-motion";

export default function Datenschutz() {
    return (
        <div className="container" style={{ padding: "5rem 2rem", maxWidth: "760px" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="badge" style={{ marginBottom: "1.2rem" }}>RECHTLICHES</div>
                <h1 style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: "0.5rem" }}>Datenschutzerklärung</h1>
                <p style={{ color: "var(--text-muted)", marginBottom: "3rem", fontSize: "0.85rem" }}>Stand: März 2026 · Gemäss Schweizer Datenschutzgesetz (DSG) und DSGVO</p>

                {[
                    { title: "1. Verantwortliche Stelle", body: `AESTHETIX GmbH\nMusterstrasse 1, 8001 Zürich\nSchweiz\nE-Mail: datenschutz@aesthetix.ch` },
                    { title: "2. Welche Daten wir erheben", body: `• Name, E-Mail-Adresse, Lieferadresse beim Kauf\n• Zahlungsdaten (werden verschlüsselt über Stripe verarbeitet)\n• Newsletter-Anmeldung (E-Mail)\n• Technische Daten: IP-Adresse, Browser-Typ, Geräteinformationen\n• Cookies für Warenkorb und Session-Verwaltung` },
                    { title: "3. Zweck der Datenverarbeitung", body: `• Abwicklung von Bestellungen und Zahlungen\n• Versand von Bestellbestätigungen\n• Newsletter-Versand (nur mit expliziter Einwilligung)\n• Verbesserung unserer Website und Services\n• Erfüllung gesetzlicher Pflichten` },
                    { title: "4. Rechtsgrundlagen", body: `Die Verarbeitung deiner personenbezogenen Daten erfolgt auf Basis:\n• Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO)\n• Einwilligung (Art. 6 Abs. 1 lit. a DSGVO)\n• Gesetzliche Verpflichtung (Art. 6 Abs. 1 lit. c DSGVO)` },
                    { title: "5. Datenweitergabe", body: `Wir geben deine Daten nur weiter an:\n• Zahlungsdienstleister (Stripe, TWINT) zur Zahlungsabwicklung\n• Versanddienstleister (Post CH, DHL) zur Lieferung\n• E-Mail-Dienstleister für Transaktions-E-Mails\n\nEine Weitergabe an Dritte zu Werbezwecken findet nicht statt.` },
                    { title: "6. Cookies", body: `Wir verwenden technisch notwendige Cookies für Warenkorb und Session sowie optionale Analytics-Cookies (nur nach Zustimmung). Du kannst Cookies in deinem Browser ablehnen oder löschen.` },
                    { title: "7. Deine Rechte", body: `• Auskunftsrecht (Art. 15 DSGVO)\n• Berichtigungsrecht (Art. 16 DSGVO)\n• Löschungsrecht (Art. 17 DSGVO)\n• Widerspruchsrecht (Art. 21 DSGVO)\n• Recht auf Datenübertragbarkeit (Art. 20 DSGVO)\n\nAnfragen an: datenschutz@aesthetix.ch` },
                    { title: "8. Datensicherheit", body: `Wir verwenden SSL/TLS-Verschlüsselung und verarbeiten Zahlungen ausschliesslich über PCI-DSS-zertifizierte Anbieter. Deine Daten werden auf Servern in der Schweiz/EU gespeichert.` },
                    { title: "9. Aufbewahrungsfristen", body: `Bestelldaten werden gemäss gesetzlicher Aufbewahrungspflicht 10 Jahre gespeichert. Newsletter-Abonnements bis zu deiner Abmeldung. Technische Logs werden nach 90 Tagen gelöscht.` },
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

"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Save, Store, Truck, Bell, Shield, ExternalLink } from "lucide-react";

function Section({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
    return (
        <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden", marginBottom: "1.2rem" }}>
            <div style={{ padding: "1rem 1.3rem", borderBottom: "1px solid var(--border)", background: "var(--bg-card)", display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <Icon size={14} color="#555" />
                <h3 style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>{title}</h3>
            </div>
            <div style={{ padding: "1.3rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                {children}
            </div>
        </div>
    );
}

function Field({ label, defaultValue, desc, type = "text" }: { label: string; defaultValue: string; desc?: string; type?: string }) {
    return (
        <div>
            <label style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", display: "block", marginBottom: "0.4rem" }}>{label}</label>
            <input type={type} defaultValue={defaultValue}
                style={{ width: "100%", padding: "0.65rem 0.9rem", background: "var(--bg-raised)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", color: "#fff", outline: "none", fontSize: "0.83rem", boxSizing: "border-box" }}
                onFocus={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"} onBlur={(e) => e.currentTarget.style.borderColor = "var(--border)"} />
            {desc && <p style={{ fontSize: "0.68rem", color: "var(--text-muted)", marginTop: "0.3rem" }}>{desc}</p>}
        </div>
    );
}

function Toggle({ label, desc, defaultOn = false }: { label: string; desc?: string; defaultOn?: boolean }) {
    const [on, setOn] = useState(defaultOn);
    return (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
                <div style={{ fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.1rem" }}>{label}</div>
                {desc && <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{desc}</div>}
            </div>
            <button onClick={() => setOn(!on)} style={{
                width: "40px", height: "22px", borderRadius: "11px", background: on ? "#fff" : "var(--bg-hover)", border: "1px solid var(--border)",
                cursor: "pointer", position: "relative", transition: "background 0.3s", flexShrink: 0
            }}>
                <span style={{ position: "absolute", top: "2px", left: on ? "20px" : "2px", width: "16px", height: "16px", borderRadius: "50%", background: on ? "#000" : "#555", transition: "left 0.3s, background 0.3s" }} />
            </button>
        </div>
    );
}

export default function AdminSettings() {
    const [saved, setSaved] = useState(false);
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: "640px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <div>
                    <h1 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.2rem" }}>Einstellungen</h1>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>Store-Konfiguration und Präferenzen</p>
                </div>
                <motion.button className="btn btn-white" style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem", padding: "0.6rem 1.2rem" }}
                    whileTap={{ scale: 0.96 }} onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500); }}>
                    <Save size={13} /> {saved ? "Gespeichert ✓" : "Speichern"}
                </motion.button>
            </div>

            <Section title="Store" icon={Store}>
                <Field label="Shop-Name" defaultValue="AESTHETIX" desc="Angezeigt in Browser-Tab und E-Mails" />
                <Field label="Support E-Mail" defaultValue="hello@aesthetix.ch" type="email" />
                <Field label="Website-URL" defaultValue="https://aesthetix.ch" />
                <Field label="Adresse" defaultValue="Musterstrasse 1, 8001 Zürich, Schweiz" />
            </Section>

            <Section title="Versand" icon={Truck}>
                <Field label="Kostenlos-Versand ab (CHF)" defaultValue="50" />
                <Field label="Standard-Versandkosten (CHF)" defaultValue="6.00" />
                <Field label="Express-Versandkosten (CHF)" defaultValue="12.00" />
                <Field label="Liefergebiet" defaultValue="Schweiz & Liechtenstein" />
            </Section>

            <Section title="Benachrichtigungen" icon={Bell}>
                <Toggle label="Neue Bestellung" desc="E-Mail bei jeder Bestellung" defaultOn={true} />
                <Toggle label="Neue Nachricht (Kontaktformular)" desc="E-Mail bei Kontaktanfragen" defaultOn={true} />
                <Toggle label="Newsletter-Anmeldungen" desc="Benachrichtigung bei neuen Abonnenten" defaultOn={false} />
            </Section>

            <Section title="Rechtliches" icon={Shield}>
                <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                    Alle rechtlichen Texte (Impressum, AGB, Datenschutz, Widerruf) sind unter den entsprechenden Seiten erreichbar. Bitte passe die Angaben auf diesen Seiten an dein tatsächliches Unternehmen an.
                </p>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {["/impressum", "/agb", "/datenschutz", "/widerruf"].map(href => (
                        <a key={href} href={href} target="_blank" style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", padding: "0.4rem 0.8rem", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: "0.72rem", color: "var(--text-secondary)", textDecoration: "none", transition: "all 0.2s" }}
                            onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.borderColor = "var(--border)"; }}>
                            {href.slice(1)} <ExternalLink size={10} />
                        </a>
                    ))}
                </div>
            </Section>
        </motion.div>
    );
}

"use client";
import { motion } from "framer-motion";
import { Mail, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="container" style={{ padding: "5rem 2rem", minHeight: "80vh", maxWidth: "900px" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center", marginBottom: "4rem" }}>
                <div className="badge" style={{ margin: "0 auto 1rem" }}>KONTAKT</div>
                <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, marginBottom: "1rem" }}>Brauchst du Hilfe?</h1>
                <p style={{ color: "var(--text-secondary)", maxWidth: "480px", margin: "0 auto" }}>Schreib uns und unser Team meldet sich innerhalb von 24 Stunden.</p>
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                    style={{ borderRadius: "var(--radius)", border: "1px solid var(--border)", padding: "2rem" }}>
                    <form style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }} onSubmit={(e) => e.preventDefault()}>
                        {[{ l: "Name", t: "text", p: "Max Mustermann" }, { l: "E-Mail", t: "email", p: "max@email.ch" }, { l: "Betreff", t: "text", p: "Frage zu meiner Bestellung" }].map((f) => (
                            <div key={f.l} style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                                <label style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)" }}>{f.l}</label>
                                <input type={f.t} placeholder={f.p} style={{ padding: "0.8rem 1rem", background: "transparent", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", color: "#fff", outline: "none", fontSize: "0.85rem", transition: "border-color 0.3s" }}
                                    onFocus={(e) => e.currentTarget.style.borderColor = "#fff"} onBlur={(e) => e.currentTarget.style.borderColor = "var(--border)"} />
                            </div>
                        ))}
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                            <label style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)" }}>Nachricht</label>
                            <textarea rows={4} placeholder="Deine Nachricht..." style={{ padding: "0.8rem 1rem", background: "transparent", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", color: "#fff", outline: "none", resize: "vertical", fontSize: "0.85rem", fontFamily: "inherit", transition: "border-color 0.3s" }}
                                onFocus={(e) => e.currentTarget.style.borderColor = "#fff"} onBlur={(e) => e.currentTarget.style.borderColor = "var(--border)"} />
                        </div>
                        <button className="btn btn-white" style={{ marginTop: "0.5rem" }}>Nachricht Senden</button>
                    </form>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                    {[{ icon: Mail, title: "E-Mail", desc: "support@aesthetix.ch", sub: "Antwort innerhalb von 24h" },
                    { icon: MapPin, title: "Standort", desc: "Zürich, Schweiz 🇨🇭", sub: "Premium Swiss Brand" },
                    { icon: Clock, title: "Support", desc: "Mo–Fr: 09:00–18:00", sub: "Sa: 10:00–14:00" }].map(({ icon: I, title, desc, sub }) => (
                        <div key={title} style={{ display: "flex", gap: "1rem", padding: "1.2rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", transition: "all 0.3s" }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border-hover)"; e.currentTarget.style.background = "var(--bg-hover)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "transparent"; }}>
                            <div style={{ width: "40px", height: "40px", borderRadius: "var(--radius-sm)", background: "var(--bg-card)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                <I size={16} color="#999" />
                            </div>
                            <div>
                                <h4 style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.2rem" }}>{title}</h4>
                                <p style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>{desc}</p>
                                <p style={{ color: "var(--text-muted)", fontSize: "0.7rem", marginTop: "0.1rem" }}>{sub}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}

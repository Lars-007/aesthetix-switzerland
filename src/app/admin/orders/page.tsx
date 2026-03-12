"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, AlertCircle } from "lucide-react";

const FILTERS = ["Alle", "Offen", "Bezahlt", "Versendet", "Storniert"];
const statusColor = (s: string) => s === "Versendet" ? "#4ade80" : s === "Bezahlt" ? "#7dd3fc" : s === "Storniert" ? "#f87171" : "#fbbf24";

// Empty for a new store — orders will appear here after real purchases
const allOrders: { id: string; date: string; customer: string; email: string; items: number; total: string; status: string }[] = [];

export default function AdminOrders() {
    const [filter, setFilter] = useState("Alle");
    const filtered = filter === "Alle" ? allOrders : allOrders.filter(o => o.status === filter);

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <div>
                    <h1 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.2rem" }}>Bestellungen</h1>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>{allOrders.length} Bestellungen total</p>
                </div>
                <div style={{ display: "flex", gap: "0.4rem" }}>
                    {FILTERS.map(f => (
                        <button key={f} onClick={() => setFilter(f)}
                            className="badge"
                            style={{ cursor: "pointer", border: filter === f ? "1px solid #fff" : "1px solid transparent", color: filter === f ? "#fff" : "var(--text-muted)", background: filter === f ? "var(--bg-hover)" : "transparent", transition: "all 0.2s", fontSize: "0.68rem" }}>
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden" }}>
                <div style={{ display: "grid", gridTemplateColumns: "110px 110px 1.5fr 1fr 70px 110px 90px", padding: "0.7rem 1.2rem", background: "var(--bg-card)", borderBottom: "1px solid var(--border)", fontSize: "0.65rem", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    <span>Nr.</span><span>Datum</span><span>Kunde</span><span>E-Mail</span><span>Artikel</span><span>Total</span><span>Status</span>
                </div>

                <AnimatePresence mode="wait">
                    {filtered.length === 0 ? (
                        <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            style={{ padding: "5rem 2rem", textAlign: "center", color: "var(--text-muted)" }}>
                            <ShoppingBag size={36} strokeWidth={1} style={{ marginBottom: "1rem", opacity: 0.3 }} />
                            <p style={{ marginBottom: "0.4rem", fontWeight: 600, fontSize: "0.9rem" }}>Keine Bestellungen</p>
                            <p style={{ fontSize: "0.78rem" }}>
                                {filter === "Alle" ? "Noch keine Bestellungen eingegangen. Bestellungen erscheinen hier nach dem ersten Kauf." : `Keine Bestellungen mit Status "${filter}".`}
                            </p>
                            {filter === "Alle" && (
                                <div style={{ marginTop: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem", justifyContent: "center", padding: "0.8rem 1.2rem", background: "rgba(251,191,36,0.05)", border: "1px solid rgba(251,191,36,0.15)", borderRadius: "var(--radius-sm)", maxWidth: "420px", margin: "1.5rem auto 0" }}>
                                    <AlertCircle size={14} style={{ color: "#fbbf24", flexShrink: 0 }} />
                                    <p style={{ fontSize: "0.72rem", color: "#fbbf24" }}>Stripe-Integration nötig für echte Bestellungen</p>
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            {filtered.map((o, i) => (
                                <div key={o.id} style={{ display: "grid", gridTemplateColumns: "110px 110px 1.5fr 1fr 70px 110px 90px", alignItems: "center", padding: "0.85rem 1.2rem", borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none", fontSize: "0.8rem", transition: "background 0.2s" }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-hover)"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                                    <span style={{ fontWeight: 700, fontSize: "0.75rem" }}>{o.id}</span>
                                    <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>{o.date}</span>
                                    <span style={{ fontWeight: 600 }}>{o.customer}</span>
                                    <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>{o.email}</span>
                                    <span>{o.items}</span>
                                    <span style={{ fontWeight: 700 }}>{o.total}</span>
                                    <span style={{ color: statusColor(o.status), fontWeight: 700, fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{o.status}</span>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

"use client";
import { motion } from "framer-motion";
import { Package, ShoppingCart, TrendingUp, AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";

export default function AdminDashboard() {
    const today = new Date().toLocaleDateString("de-CH", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2.5rem" }}>
                <div>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.3rem" }}>{today}</p>
                    <h1 style={{ fontSize: "1.8rem", fontWeight: 900, letterSpacing: "-0.02em" }}>Willkommen zurück 👋</h1>
                </div>
                <Link href="/products" target="_blank">
                    <button className="btn btn-outline" style={{ fontSize: "0.75rem", padding: "0.55rem 1.2rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        Shop öffnen <ArrowRight size={13} />
                    </button>
                </Link>
            </div>

            {/* Launch Notice */}
            <div style={{ padding: "1.2rem 1.5rem", borderRadius: "var(--radius)", background: "rgba(251,191,36,0.05)", border: "1px solid rgba(251,191,36,0.15)", display: "flex", alignItems: "flex-start", gap: "0.8rem", marginBottom: "2rem" }}>
                <AlertCircle size={16} style={{ color: "#fbbf24", flexShrink: 0, marginTop: "1px" }} />
                <div>
                    <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#fbbf24", marginBottom: "0.2rem" }}>Shop noch nicht live</p>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                        Bestellungen und Statistiken erscheinen hier sobald du echte Transaktionen hast. Verbinde Stripe für Zahlungsabwicklung.
                    </p>
                </div>
            </div>

            {/* Stats — real zeros */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.8rem", marginBottom: "1.5rem" }}>
                {[
                    { label: "Bestellungen heute", value: "—", sub: "Noch keine Bestellungen", icon: ShoppingCart },
                    { label: "Umsatz heute", value: "—", sub: "Noch keine Einnahmen", icon: TrendingUp },
                    { label: "Produkte aktiv", value: PRODUCTS.length.toString(), sub: "Im Katalog", icon: Package },
                    { label: "Besucher heute", value: "—", sub: "Analytics einrichten", icon: TrendingUp },
                ].map((s, i) => (
                    <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                        style={{ padding: "1.3rem", borderRadius: "var(--radius)", border: "1px solid var(--border)", background: "var(--bg-card)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.8rem" }}>
                            <span style={{ color: "var(--text-secondary)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.02em" }}>{s.label}</span>
                            <s.icon size={15} color="#444" />
                        </div>
                        <div style={{ fontSize: "1.8rem", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "0.2rem", color: s.value === "—" ? "#333" : "#fff" }}>{s.value}</div>
                        <div style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>{s.sub}</div>
                    </motion.div>
                ))}
            </div>

            {/* Product overview + Quick links */}
            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "0.8rem" }}>
                <div style={{ borderRadius: "var(--radius)", border: "1px solid var(--border)", background: "var(--bg-card)", padding: "1.3rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem" }}>
                        <h3 style={{ fontSize: "0.85rem", fontWeight: 700 }}>Produkte im Katalog</h3>
                        <Link href="/admin/products" style={{ fontSize: "0.72rem", color: "var(--text-muted)", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                            Alle anzeigen <ArrowRight size={11} />
                        </Link>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                        {PRODUCTS.slice(0, 5).map(p => (
                            <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.78rem" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80" }} />
                                    <span style={{ color: "var(--text-secondary)" }}>{p.name.replace("AESTHETIX ", "")}</span>
                                </div>
                                <span style={{ fontWeight: 600 }}>CHF {p.price.toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ borderRadius: "var(--radius)", border: "1px solid var(--border)", background: "var(--bg-card)", padding: "1.3rem" }}>
                    <h3 style={{ fontSize: "0.85rem", fontWeight: 700, marginBottom: "1.2rem" }}>Schnellzugriff</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        {[
                            { label: "Produkte verwalten", href: "/admin/products" },
                            { label: "Bestellungen", href: "/admin/orders" },
                            { label: "Einstellungen", href: "/admin/settings" },
                            { label: "Shop live ansehen", href: "/" },
                            { label: "Impressum bearbeiten", href: "/impressum" },
                        ].map(link => (
                            <Link key={link.href} href={link.href}
                                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.6rem 0.8rem", borderRadius: "var(--radius-sm)", background: "var(--bg-raised)", color: "var(--text-secondary)", fontSize: "0.78rem", textDecoration: "none", transition: "all 0.2s" }}
                                onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "var(--bg-hover)"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.background = "var(--bg-raised)"; }}>
                                {link.label} <ArrowRight size={12} />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

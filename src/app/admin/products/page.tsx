"use client";
import { motion } from "framer-motion";
import { Package, AlertCircle } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import Image from "next/image";
import Link from "next/link";

export default function AdminProducts() {
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <div>
                    <h1 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.2rem" }}>Produkte</h1>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>{PRODUCTS.length} Produkte im Katalog</p>
                </div>
                <div style={{ display: "flex", gap: "0.8rem", alignItems: "center" }}>
                    <div style={{ padding: "0.5rem 1rem", background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.72rem", color: "#fbbf24" }}>
                        <AlertCircle size={13} /> Bearbeitung via Code-Editor
                    </div>
                    <Link href="/products">
                        <button className="btn btn-outline" style={{ padding: "0.55rem 1.1rem", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                            <Package size={13} /> Shop ansehen →
                        </button>
                    </Link>
                </div>
            </div>

            <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden" }}>
                <div style={{ display: "grid", gridTemplateColumns: "52px 2.5fr 1fr 1fr 120px", padding: "0.7rem 1.2rem", background: "var(--bg-card)", borderBottom: "1px solid var(--border)", fontSize: "0.65rem", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    <span></span><span>Produkt</span><span>Kategorie</span><span>Preis</span><span>Status</span>
                </div>
                {PRODUCTS.map((p, i) => (
                    <div key={p.id} style={{ display: "grid", gridTemplateColumns: "52px 2.5fr 1fr 1fr 120px", alignItems: "center", padding: "0.85rem 1.2rem", borderBottom: i < PRODUCTS.length - 1 ? "1px solid var(--border)" : "none", transition: "background 0.2s" }}
                        onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-hover)"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                        <div style={{ width: "36px", height: "36px", borderRadius: "6px", overflow: "hidden", position: "relative", background: "#111", flexShrink: 0 }}>
                            <Image src={p.imageUrl} alt={p.name} fill style={{ objectFit: "cover" }} />
                        </div>
                        <div>
                            <div style={{ fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.15rem" }}>{p.name}</div>
                            <div style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>/{p.id}</div>
                        </div>
                        <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)", textTransform: "capitalize" }}>{p.category}</span>
                        <div>
                            <div style={{ fontSize: "0.85rem", fontWeight: 700 }}>CHF {p.price.toFixed(2)}</div>
                            {p.comparePrice && <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textDecoration: "line-through" }}>CHF {p.comparePrice.toFixed(2)}</div>}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            {p.badge && <span style={{ fontSize: "0.58rem", fontWeight: 800, background: "rgba(255,255,255,0.08)", color: "#fff", padding: "0.2rem 0.55rem", borderRadius: "3px", letterSpacing: "0.06em" }}>{p.badge}</span>}
                            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", flexShrink: 0 }} title="Aktiv" />
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

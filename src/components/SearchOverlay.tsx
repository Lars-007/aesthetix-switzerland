"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import Image from "next/image";
import Link from "next/link";

export default function SearchOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [query, setQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
            setQuery("");
        }
    }, [isOpen]);

    useEffect(() => {
        const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", fn);
        return () => window.removeEventListener("keydown", fn);
    }, [onClose]);

    const results = query.length > 1
        ? PRODUCTS.filter((p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5)
        : [];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    style={{ position: "fixed", inset: 0, zIndex: 150, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)" }}
                    onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
                    <motion.div
                        initial={{ y: -40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -40, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        style={{ maxWidth: "640px", margin: "10vh auto 0", padding: "0 2rem" }}>

                        {/* Search input */}
                        <div style={{ position: "relative", marginBottom: "1rem" }}>
                            <Search size={18} style={{ position: "absolute", left: "1.2rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                            <input ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)}
                                placeholder="Produkte suchen..."
                                style={{
                                    width: "100%", padding: "1.1rem 3rem 1.1rem 3.2rem",
                                    background: "var(--bg-card)", border: "1px solid var(--border-hover)",
                                    borderRadius: "var(--radius)", color: "#fff", fontSize: "1rem",
                                    outline: "none", transition: "border-color 0.3s",
                                }}
                                onFocus={(e) => e.target.style.borderColor = "rgba(255,255,255,0.15)"}
                                onBlur={(e) => e.target.style.borderColor = "var(--border-hover)"}
                            />
                            <button onClick={onClose} style={{
                                position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)",
                                background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer",
                            }}><X size={18} /></button>
                        </div>

                        <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", letterSpacing: "0.1em", marginBottom: "1.5rem", paddingLeft: "0.5rem" }}>
                            {query.length > 1 ? `${results.length} ERGEBNIS${results.length !== 1 ? "SE" : ""}` : "ESC ZUM SCHLIESSEN · ⌘K ZUM ÖFFNEN"}
                        </div>

                        {/* Results */}
                        <AnimatePresence>
                            {results.map((p, i) => (
                                <motion.div key={p.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ delay: i * 0.05 }}>
                                    <Link href={`/products/${p.id}`} onClick={onClose}
                                        style={{
                                            display: "flex", alignItems: "center", gap: "1rem",
                                            padding: "0.8rem 1rem", borderRadius: "var(--radius-sm)",
                                            transition: "background 0.2s", marginBottom: "0.3rem",
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-hover)"}
                                        onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                                        <div style={{ width: "50px", height: "50px", borderRadius: "8px", overflow: "hidden", position: "relative", flexShrink: 0, background: "#080808" }}>
                                            <Image src={p.imageUrl} alt={p.name} fill style={{ objectFit: "cover" }} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>{p.name}</div>
                                            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{p.category}</div>
                                        </div>
                                        <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>CHF {p.price.toFixed(2)}</div>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {query.length > 1 && results.length === 0 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>
                                <p style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>🔍</p>
                                <p>Keine Ergebnisse für &ldquo;{query}&rdquo;</p>
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

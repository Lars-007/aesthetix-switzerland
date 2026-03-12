"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Minus, Plus, Star } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";
import type { Product } from "@/data/products";
import { useState } from "react";
import Link from "next/link";

interface Props { product: Product | null; onClose: () => void; }

export default function QuickViewModal({ product, onClose }: Props) {
    const [qty, setQty] = useState(1);
    const addItem = useCartStore((s) => s.addItem);
    const addToast = useToastStore((s) => s.addToast);

    if (!product) return null;

    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ position: "fixed", inset: 0, zIndex: 180, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
                onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
                <motion.div
                    initial={{ scale: 0.85, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.85, opacity: 0, y: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    style={{
                        width: "800px", maxWidth: "90vw", maxHeight: "85vh", overflow: "auto",
                        background: "var(--bg-card)", border: "1px solid var(--border)",
                        borderRadius: "var(--radius)", display: "grid", gridTemplateColumns: "1fr 1fr",
                        boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
                    }}>
                    {/* Image */}
                    <div style={{ position: "relative", aspectRatio: "1", background: "#080808" }}>
                        <Image src={product.imageUrl} alt={product.name} fill style={{ objectFit: "cover" }} />
                        {product.badge && (
                            <span style={{ position: "absolute", top: "14px", left: "14px", background: "#fff", color: "#000", fontSize: "0.6rem", fontWeight: 800, padding: "0.35rem 0.9rem", borderRadius: "4px", letterSpacing: "0.1em" }}>
                                {product.badge}
                            </span>
                        )}
                    </div>

                    {/* Details */}
                    <div style={{ padding: "2rem", display: "flex", flexDirection: "column" }}>
                        <button onClick={onClose} style={{ position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}>
                            <X size={18} />
                        </button>

                        <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.2em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "0.5rem" }}>{product.category}</span>
                        <h2 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "0.8rem", lineHeight: 1.2 }}>{product.name}</h2>

                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                            <div style={{ display: "flex", gap: "1px" }}>{[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < Math.round(product.rating) ? "#fff" : "transparent"} color={i < Math.round(product.rating) ? "#fff" : "#333"} />)}</div>
                            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>({product.reviewCount})</span>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
                            <span style={{ fontSize: "1.5rem", fontWeight: 800 }}>CHF {product.price.toFixed(2)}</span>
                            {product.comparePrice && <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", textDecoration: "line-through" }}>CHF {product.comparePrice.toFixed(2)}</span>}
                        </div>

                        <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.7, marginBottom: "1.5rem", flex: 1 }}>
                            {product.description.slice(0, 160)}...
                        </p>

                        <div style={{ display: "flex", gap: "0.8rem", marginBottom: "1rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "0.5rem 0.8rem" }}>
                                <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}><Minus size={14} /></button>
                                <span style={{ fontWeight: 700, minWidth: "20px", textAlign: "center" }}>{qty}</span>
                                <button onClick={() => setQty(qty + 1)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}><Plus size={14} /></button>
                            </div>
                            <motion.button className="btn btn-white" style={{ flex: 1 }}
                                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                onClick={() => {
                                    for (let i = 0; i < qty; i++) addItem({ id: product.id, name: product.name, price: product.price, imageUrl: product.imageUrl });
                                    addToast(`${product.name} hinzugefügt ✓`);
                                    onClose();
                                }}>
                                In den Warenkorb
                            </motion.button>
                        </div>

                        <Link href={`/products/${product.id}`} onClick={onClose}
                            style={{ fontSize: "0.78rem", color: "var(--text-secondary)", textAlign: "center", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                            Alle Details ansehen →
                        </Link>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

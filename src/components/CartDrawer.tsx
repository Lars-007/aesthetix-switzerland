"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import FreeShippingBar from "./FreeShippingBar";

export default function CartDrawer() {
    const { isOpen, toggleCart, items, updateQuantity, removeItem } = useCartStore();
    const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
    const count = items.reduce((a, i) => a + i.quantity, 0);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={toggleCart} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)", zIndex: 100 }} />
                    <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 250 }}
                        style={{
                            position: "fixed", top: 0, right: 0, bottom: 0, width: "100%", maxWidth: "400px", zIndex: 101,
                            background: "#0a0a0a", borderLeft: "1px solid var(--border)", display: "flex", flexDirection: "column"
                        }}>

                        <div style={{ padding: "1.5rem 2rem", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <h2 style={{ fontSize: "1rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.6rem" }}>
                                <ShoppingBag size={18} /> Warenkorb ({count})
                            </h2>
                            <button onClick={toggleCart} style={{
                                background: "transparent", border: "1px solid var(--border)", borderRadius: "50%", width: "32px", height: "32px",
                                color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 0.3s"
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.borderColor = "#fff"} onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border)"}>
                                <X size={14} />
                            </button>
                        </div>

                        <div style={{ padding: "0 2rem" }}><FreeShippingBar /></div>
                        <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem 2rem" }}>
                            {items.length === 0 ? (
                                <div style={{ textAlign: "center", color: "var(--text-muted)", paddingTop: "4rem" }}>
                                    <ShoppingBag size={40} strokeWidth={1} style={{ marginBottom: "1rem", opacity: 0.3 }} />
                                    <p style={{ marginBottom: "1.5rem" }}>Dein Warenkorb ist leer.</p>
                                    <button onClick={toggleCart} className="btn btn-outline" style={{ fontSize: "0.75rem" }}>Weiter Shoppen</button>
                                </div>
                            ) : (
                                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                                    {items.map((item) => (
                                        <motion.div layout key={item.id} style={{ display: "flex", gap: "1rem", paddingBottom: "1.5rem", borderBottom: "1px solid var(--border)" }}>
                                            <div style={{ width: "72px", height: "72px", borderRadius: "var(--radius-sm)", overflow: "hidden", background: "#111", flexShrink: 0, position: "relative" }}>
                                                <Image src={item.imageUrl} alt={item.name} fill style={{ objectFit: "cover" }} />
                                            </div>
                                            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                                <div>
                                                    <h4 style={{ fontSize: "0.85rem", fontWeight: 600, lineHeight: 1.3, marginBottom: "0.2rem" }}>{item.name}</h4>
                                                    <p style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>CHF {item.price.toFixed(2)}</p>
                                                </div>
                                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "0.2rem 0.5rem" }}>
                                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: "2px" }}><Minus size={12} /></button>
                                                        <span style={{ fontSize: "0.8rem", fontWeight: 700, minWidth: "14px", textAlign: "center" }}>{item.quantity}</span>
                                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: "2px" }}><Plus size={12} /></button>
                                                    </div>
                                                    <button onClick={() => removeItem(item.id)} style={{ color: "var(--text-muted)", background: "none", border: "none", fontSize: "0.7rem", cursor: "pointer", transition: "color 0.3s" }}
                                                        onMouseEnter={(e) => e.currentTarget.style.color = "#fff"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}>
                                                        Entfernen
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {items.length > 0 && (
                            <div style={{ padding: "1.5rem 2rem", borderTop: "1px solid var(--border)" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                                    <span style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>Versand</span>
                                    <span style={{ fontSize: "0.85rem" }}>Kostenlos</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
                                    <span style={{ fontSize: "1rem", fontWeight: 700 }}>Total</span>
                                    <span style={{ fontSize: "1rem", fontWeight: 700 }}>CHF {total.toFixed(2)}</span>
                                </div>
                                <Link href="/checkout" onClick={toggleCart}>
                                    <button className="btn btn-white" style={{ width: "100%", padding: "0.9rem" }}>Zur Kasse</button>
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

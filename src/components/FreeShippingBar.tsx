"use client";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { Truck } from "lucide-react";

const FREE_SHIPPING_THRESHOLD = 50;

export default function FreeShippingBar() {
    const items = useCartStore((s) => s.items);
    const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
    const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
    const progress = Math.min(1, subtotal / FREE_SHIPPING_THRESHOLD);

    if (items.length === 0) return null;

    return (
        <div style={{ padding: "0.8rem 0", borderBottom: "1px solid var(--border)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem" }}>
                <Truck size={14} color={remaining === 0 ? "#22c55e" : "var(--text-muted)"} />
                <span style={{ fontSize: "0.78rem", color: remaining === 0 ? "#22c55e" : "var(--text-secondary)" }}>
                    {remaining === 0 ? "🎉 Kostenloser Versand!" : `Noch CHF ${remaining.toFixed(2)} bis kostenloser Versand`}
                </span>
            </div>
            <div style={{ height: "3px", background: "var(--border)", borderRadius: "2px", overflow: "hidden" }}>
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: progress }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        height: "100%", transformOrigin: "left",
                        background: remaining === 0 ? "#22c55e" : "linear-gradient(90deg, #fff, rgba(255,255,255,0.5))",
                        borderRadius: "2px",
                    }}
                />
            </div>
        </div>
    );
}

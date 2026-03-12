"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import type { ShopifyProduct } from "@/lib/shopify";

const categories = ["all", "skincare", "tools", "grooming"];

export default function ProductsPageClient({ initialProducts }: { initialProducts: ShopifyProduct[] }) {
    const [cat, setCat] = useState("all");

    // Filter based on Shopify's collection handles, falling back to all
    const filtered = cat === "all" 
        ? initialProducts 
        : initialProducts.filter(p => 
            p.collections?.edges?.some(edge => edge.node.handle.toLowerCase().includes(cat))
          );

    return (
        <div className="container" style={{ padding: "4rem 2rem", minHeight: "80vh" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="badge" style={{ marginBottom: "1rem" }}>ALLE PRODUKTE</div>
                <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, marginBottom: "0.8rem" }}>Shop</h1>
                <p style={{ color: "var(--text-secondary)", maxWidth: "480px", marginBottom: "2.5rem" }}>Premium Skincare, Tools und Grooming für den modernen Mann.</p>
            </motion.div>
            <div style={{ display: "flex", gap: "0.6rem", marginBottom: "3rem" }}>
                {categories.map((c) => (
                    <button key={c} onClick={() => setCat(c)} style={{
                        padding: "0.45rem 1.2rem", borderRadius: "100px", fontSize: "0.75rem", fontWeight: 600,
                        letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer",
                        border: cat === c ? "1px solid #fff" : "1px solid var(--border)",
                        background: cat === c ? "#fff" : "transparent",
                        color: cat === c ? "#000" : "var(--text-secondary)",
                        transition: "all 0.3s",
                    }}>{c === "all" ? "Alle" : c.charAt(0).toUpperCase() + c.slice(1)}</button>
                ))}
            </div>
            <motion.div layout style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: "1.2rem" }}>
                <AnimatePresence mode="popLayout">
                    {filtered.map((p) => (
                        <motion.div layout key={p.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}>
                            <ProductCard product={p} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}

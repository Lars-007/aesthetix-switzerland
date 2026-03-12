"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useRecentlyViewedStore } from "@/store/recentlyViewedStore";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function RecentlyViewed() {
    const ids = useRecentlyViewedStore((s) => s.ids);
    const products = ids.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean).slice(0, 4);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });

    if (products.length === 0) return null;

    return (
        <section ref={ref} style={{ padding: "4rem 0" }}>
            <div className="container">
                <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                    style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "2rem" }}>
                    Kürzlich angesehen
                </motion.h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.2rem" }}>
                    {products.map((p, i) => p && (
                        <motion.div key={p.id} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08 }}>
                            <ProductCard product={p as any} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

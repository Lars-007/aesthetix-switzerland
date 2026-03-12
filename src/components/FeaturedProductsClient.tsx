"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ProductCard from "./ProductCard";
import type { ShopifyProduct } from "@/lib/shopify";

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as any } },
};

export default function FeaturedProductsClient({ featured }: { featured: ShopifyProduct[] }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section className="section-gap">
            <div className="container" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3.5rem" }}
                >
                    <div>
                        <motion.div className="badge" style={{ marginBottom: "1rem" }}
                            initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.1, type: "spring" }}>
                            ◆ CURATED SELECTION
                        </motion.div>
                        <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900 }}>
                            {"Bestseller".split("").map((char, i) => (
                                <motion.span key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.2 + i * 0.03, duration: 0.5 }} style={{ display: "inline-block" }}>
                                    {char}
                                </motion.span>
                            ))}
                        </h2>
                    </div>
                    <motion.a href="/products" className="hover-line"
                        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}
                        style={{ fontSize: "0.8rem", color: "var(--text-secondary)", textDecoration: "none", paddingBottom: "2px" }}>
                        Alle ansehen →
                    </motion.a>
                </motion.div>

                <motion.div variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"}
                    style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.2rem" }}>
                    {featured.map((p) => (
                        <motion.div key={p.id} variants={itemVariants}>
                            <ProductCard product={p} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

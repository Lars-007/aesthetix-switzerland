"use client";
import { use } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { getProductsByCollection, COLLECTIONS } from "@/data/products";

export default function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const collection = COLLECTIONS.find(c => c.slug === slug);
    const products = getProductsByCollection(slug);

    if (!collection) return <div className="container" style={{ padding: "6rem 2rem", textAlign: "center" }}><h1>Collection nicht gefunden</h1></div>;

    return (
        <div className="container" style={{ padding: "4rem 2rem", minHeight: "80vh" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="badge" style={{ marginBottom: "1rem" }}>COLLECTION</div>
                <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, marginBottom: "0.8rem" }}>{collection.name}</h1>
                <p style={{ color: "var(--text-secondary)", maxWidth: "480px", marginBottom: "3rem" }}>{collection.description}</p>
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: "1.2rem" }}>
                {products.map((p, i) => (
                    <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                        <ProductCard product={p} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

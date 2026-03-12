"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useWishlistStore } from "@/store/wishlistStore";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function WishlistPage() {
    const ids = useWishlistStore((s) => s.ids);
    const wishlistProducts = PRODUCTS.filter((p) => ids.includes(p.id));
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <div className="container" style={{ padding: "4rem 2rem", minHeight: "80vh" }} ref={ref}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
                <div className="badge" style={{ marginBottom: "1rem" }}>
                    <Heart size={12} /> FAVORITEN
                </div>
                <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, marginBottom: "0.5rem" }}>Deine Favoriten</h1>
                <p style={{ color: "var(--text-secondary)", marginBottom: "3rem" }}>
                    {wishlistProducts.length > 0 ? `${wishlistProducts.length} Produkt${wishlistProducts.length !== 1 ? "e" : ""} gespeichert.` : "Du hast noch keine Favoriten gespeichert."}
                </p>
            </motion.div>

            {wishlistProducts.length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                    style={{ textAlign: "center", padding: "4rem 0" }}>
                    <Heart size={48} strokeWidth={1} style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }} />
                    <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>Klicke auf das Herz ♡ bei einem Produkt, um es hier zu speichern.</p>
                    <Link href="/products"><button className="btn btn-white">Produkte entdecken</button></Link>
                </motion.div>
            ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.2rem" }}>
                    {wishlistProducts.map((p, i) => (
                        <motion.div key={p.id} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 + i * 0.08 }}>
                            <ProductCard product={p as any} />
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}

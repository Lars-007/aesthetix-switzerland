"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { PRODUCTS } from "@/data/products";

export default function InstagramFeed() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });
    const images = PRODUCTS.slice(0, 6);

    return (
        <section ref={ref} style={{ padding: "5rem 0 0" }}>
            <div className="container">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                    style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                    <div className="badge" style={{ marginBottom: "1rem" }}>@AESTHETIX.OFFICIAL</div>
                    <h2 style={{ fontSize: "1.8rem", fontWeight: 900, marginBottom: "0.5rem" }}>Folge uns auf Instagram</h2>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Inspiration, Tipps & hinter den Kulissen</p>
                </motion.div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "3px" }}>
                {images.map((p, i) => (
                    <motion.div key={p.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.1 + i * 0.06 }}
                        style={{ position: "relative", aspectRatio: "1", overflow: "hidden", cursor: "pointer" }}
                    >
                        <motion.div whileHover={{ scale: 1.08 }} transition={{ duration: 0.5 }} style={{ width: "100%", height: "100%", position: "relative" }}>
                            <Image src={p.imageUrl} alt={p.name} fill style={{ objectFit: "cover" }} />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            style={{
                                position: "absolute", inset: 0,
                                background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                flexDirection: "column", gap: "0.3rem",
                            }}>
                            <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em" }}>♡ {Math.floor(Math.random() * 500 + 100)}</span>
                            <span style={{ fontSize: "0.6rem", color: "var(--text-secondary)" }}>{p.name}</span>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

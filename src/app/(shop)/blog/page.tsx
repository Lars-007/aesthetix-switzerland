"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const posts = [
    { slug: "looksmaxing-guide", title: "Der ultimative Looksmaxing Guide 2026", excerpt: "Alles was du wissen musst, um das Beste aus deinem Aussehen herauszuholen — von Skincare bis Jawline-Training.", date: "06. März 2026", category: "Guide", readTime: "8 Min", image: "/products/collagen-cream.png" },
    { slug: "skincare-routine", title: "Die perfekte Skincare-Routine für Männer", excerpt: "Step-by-step Anleitung für eine makellose Haut. Welche Produkte wirklich wirken und welche du dir sparen kannst.", date: "04. März 2026", category: "Skincare", readTime: "6 Min", image: "/products/vitamin-c-serum.png" },
    { slug: "dermaroller-anleitung", title: "Dermaroller richtig anwenden — Komplette Anleitung", excerpt: "Die richtige Nadellänge, Frequenz und Technik für maximale Kollagenproduktion und Hauterneuerung.", date: "01. März 2026", category: "Tutorial", readTime: "5 Min", image: "/products/dermaroller.png" },
    { slug: "gua-sha-gesichtsmassage", title: "Gua Sha: Die Gesichtsmassage für definierte Konturen", excerpt: "Wie du mit einem Gua Sha Tool Schwellungen reduzierst, die Durchblutung förderst und Konturen definierst.", date: "27. Feb 2026", category: "Tutorial", readTime: "4 Min", image: "/products/guasha.png" },
    { slug: "jawline-training", title: "Jawline definieren — Übungen & Tools", excerpt: "Von Mewing bis Jawline Mask: Die effektivsten Methoden für eine markante Kieferlinie, wissenschaftlich erklärt.", date: "24. Feb 2026", category: "Guide", readTime: "7 Min", image: "/products/jawline-mask.png" },
    { slug: "vitamin-c-serum-wirkung", title: "Warum Vitamin C dein wichtigstes Serum ist", excerpt: "Antioxidantien, Kollagenaufbau, Anti-Aging — warum ein gutes Vitamin C Serum in jede Routine gehört.", date: "20. Feb 2026", category: "Skincare", readTime: "5 Min", image: "/products/vitamin-c-serum.png" },
];

export default function BlogPage() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <div className="container" style={{ padding: "4rem 2rem", minHeight: "80vh" }} ref={ref}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
                <div className="badge" style={{ marginBottom: "1rem" }}>JOURNAL</div>
                <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, marginBottom: "0.8rem" }}>Blog & Guides</h1>
                <p style={{ color: "var(--text-secondary)", maxWidth: "500px", marginBottom: "3rem" }}>Expertenwissen rund um Skincare, Looksmaxing und Grooming. Von unserem Team für dich geschrieben.</p>
            </motion.div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "1.5rem" }}>
                {posts.map((post, i) => (
                    <motion.article key={post.slug}
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2 + i * 0.08, duration: 0.6 }}
                        whileHover={{ y: -5, transition: { duration: 0.3 } }}
                        style={{
                            borderRadius: "var(--radius)", border: "1px solid var(--border)",
                            overflow: "hidden", background: "var(--bg-card)",
                            transition: "border-color 0.3s, box-shadow 0.3s",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border-hover)"; e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.3)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}
                    >
                        <Link href={`/blog/${post.slug}`} style={{ display: "block" }}>
                            <div style={{ height: "200px", position: "relative", overflow: "hidden", background: "#080808" }}>
                                <motion.img src={post.image} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }}
                                    whileHover={{ scale: 1.05 }} />
                                <span style={{
                                    position: "absolute", top: "12px", left: "12px",
                                    background: "rgba(0,0,0,0.7)", backdropFilter: "blur(10px)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    padding: "0.3rem 0.8rem", borderRadius: "4px",
                                    fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                                }}>{post.category}</span>
                            </div>
                            <div style={{ padding: "1.5rem" }}>
                                <div style={{ display: "flex", gap: "1rem", fontSize: "0.7rem", color: "var(--text-muted)", marginBottom: "0.8rem" }}>
                                    <span>{post.date}</span>
                                    <span>·</span>
                                    <span>{post.readTime} Lesezeit</span>
                                </div>
                                <h2 style={{ fontSize: "1.05rem", fontWeight: 700, lineHeight: 1.4, marginBottom: "0.6rem" }}>{post.title}</h2>
                                <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.7 }}>{post.excerpt}</p>
                            </div>
                        </Link>
                    </motion.article>
                ))}
            </div>
        </div>
    );
}

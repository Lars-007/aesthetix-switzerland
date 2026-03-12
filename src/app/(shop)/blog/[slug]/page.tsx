"use client";
import { use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";

const articles: Record<string, { title: string; category: string; date: string; readTime: string; image: string; content: string[] }> = {
    "looksmaxing-guide": {
        title: "Der ultimative Looksmaxing Guide 2026",
        category: "Guide", date: "06. März 2026", readTime: "8 Min",
        image: "/products/collagen-cream.png",
        content: [
            "Looksmaxing ist mehr als nur ein Trend — es ist eine Philosophie. Es geht darum, systematisch an jedem Aspekt deines Aussehens zu arbeiten, um das maximale Potenzial auszuschöpfen.",
            "Der erste und wichtigste Schritt ist eine solide Skincare-Routine. Deine Haut ist das Fundament deines gesamten Erscheinungsbildes. Beginne mit einem sanften Reiniger, gefolgt von einem Vitamin C Serum am Morgen und Retinol am Abend.",
            "Jawline-Training ist der zweite Pfeiler. Eine definierte Kieferlinie ist eines der markantesten männlichen Merkmale. Mewing, Jawline Masks und gezielte Übungen können hier einen echten Unterschied machen.",
            "Vergiss nicht die Basics: 7-8 Stunden Schlaf, 2-3 Liter Wasser pro Tag, regelmässiges Training und eine proteinreiche Ernährung. Diese Grundlagen verstärken die Wirkung aller anderen Massnahmen.",
            "Tools wie Dermaroller und Gua Sha sind keine Marketing-Tricks, sondern wissenschaftlich fundierte Methoden zur Hautverbesserung. Ein Dermaroller mit 0.5mm Nadeln stimuliert die Kollagenproduktion, während Gua Sha die Lymphdrainage fördert.",
        ],
    },
    "skincare-routine": {
        title: "Die perfekte Skincare-Routine für Männer",
        category: "Skincare", date: "04. März 2026", readTime: "6 Min",
        image: "/products/vitamin-c-serum.png",
        content: [
            "Eine gute Skincare-Routine muss nicht kompliziert sein. Mit 3-4 Produkten kannst du bereits 80% der Ergebnisse erzielen.",
            "Morgens: Reinigung → Vitamin C Serum → Feuchtigkeitscreme → Sonnenschutz (SPF 50). Dieser simple Ablauf schützt deine Haut vor UV-Strahlen und freien Radikalen.",
            "Abends: Reinigung → Peeling (2-3x pro Woche) → Retinol oder Collagen Cream. Nachts regeneriert sich die Haut am stärksten, nutze diese Phase optimal.",
            "Eye Patches unter den Augen nach dem Aufstehen reduzieren Schwellungen und Dark Circles innerhalb von 15 Minuten. Ideal vor wichtigen Terminen.",
            "Unser AESTHETIX Mineral Peeling entfernt abgestorbene Hautzellen sanft mit vulkanischen Mineralien und bereitet die Haut perfekt auf die nachfolgende Pflege vor.",
        ],
    },
};

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const article = articles[slug];

    if (!article) return (
        <div className="container" style={{ padding: "6rem 2rem", textAlign: "center" }}>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1rem" }}>Artikel nicht gefunden</h1>
            <Link href="/blog" style={{ color: "var(--text-secondary)" }}>← Zurück zum Blog</Link>
        </div>
    );

    return (
        <div className="container" style={{ padding: "4rem 2rem", maxWidth: "750px" }}>
            <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "var(--text-secondary)", fontSize: "0.8rem", marginBottom: "2.5rem", transition: "color 0.3s" }}
                onMouseEnter={(e) => e.currentTarget.style.color = "#fff"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"}>
                <ArrowLeft size={14} /> Zurück zum Blog
            </Link>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <span className="badge" style={{ marginBottom: "1rem" }}>{article.category}</span>
                <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 900, lineHeight: 1.2, marginBottom: "1.2rem" }}>{article.title}</h1>
                <div style={{ display: "flex", gap: "1.5rem", color: "var(--text-muted)", fontSize: "0.8rem", marginBottom: "3rem" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}><Calendar size={13} /> {article.date}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}><Clock size={13} /> {article.readTime} Lesezeit</span>
                </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                style={{ borderRadius: "var(--radius)", overflow: "hidden", marginBottom: "3rem", height: "300px", position: "relative", background: "#080808" }}>
                <img src={article.image} alt={article.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </motion.div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {article.content.map((p, i) => (
                    <motion.p key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
                        style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 2 }}>{p}</motion.p>
                ))}
            </div>

            <div style={{ marginTop: "4rem", padding: "2rem", background: "var(--bg-card)", borderRadius: "var(--radius)", border: "1px solid var(--border)", textAlign: "center" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>Bereit, dein Level zu erhöhen?</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginBottom: "1.5rem" }}>Entdecke unsere Swiss Premium Skincare Produkte.</p>
                <Link href="/products"><button className="btn btn-white">Zum Shop</button></Link>
            </div>
        </div>
    );
}

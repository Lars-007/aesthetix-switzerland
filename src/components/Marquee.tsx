"use client";
import { motion } from "framer-motion";

const row1 = ["HIGH PERFORMANCE", "SWISS PRECISION", "LOOKSMAXING", "PREMIUM SKINCARE", "ELEVATE YOURSELF"];
const row2 = ["DERMAROLLER", "GUA SHA", "VITAMIN C", "COLLAGEN", "JAWLINE MASK"];

function MarqueeRow({ words, speed, reverse }: { words: string[]; speed: number; reverse?: boolean }) {
    const doubled = [...words, ...words, ...words, ...words];
    return (
        <div style={{ overflow: "hidden", padding: "0.6rem 0" }}>
            <motion.div
                animate={{ x: reverse ? [0, 2400] : [0, -2400] }}
                transition={{ repeat: Infinity, ease: "linear", duration: speed }}
                style={{ display: "flex", gap: "3rem", whiteSpace: "nowrap" }}
            >
                {doubled.map((w, i) => (
                    <span key={i} style={{
                        fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.25em",
                        color: i % 2 === 0 ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)",
                        textTransform: "uppercase",
                    }}>
                        {w} <span style={{ color: "rgba(255,255,255,0.08)", margin: "0 0.5rem" }}>◆</span>
                    </span>
                ))}
            </motion.div>
        </div>
    );
}

export default function Marquee() {
    return (
        <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", overflow: "hidden" }}>
            <MarqueeRow words={row1} speed={25} />
            <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, var(--border), transparent)" }} />
            <MarqueeRow words={row2} speed={30} reverse />
        </div>
    );
}

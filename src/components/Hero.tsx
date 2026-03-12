"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

function Counter({ target, suffix = "" }: { target: string; suffix?: string }) {
    const [display, setDisplay] = useState("0");
    const ref = useRef<HTMLDivElement>(null);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) setStarted(true); }, { threshold: 0.5 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [started]);

    useEffect(() => {
        if (!started) return;
        const num = parseInt(target.replace(/\D/g, ""));
        if (isNaN(num)) { setDisplay(target); return; }
        let current = 0;
        const step = Math.max(1, Math.floor(num / 40));
        const interval = setInterval(() => {
            current = Math.min(current + step, num);
            setDisplay(current.toLocaleString() + suffix);
            if (current >= num) clearInterval(interval);
        }, 30);
        return () => clearInterval(interval);
    }, [started, target, suffix]);

    return <div ref={ref}>{display}</div>;
}

export default function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

    return (
        <section ref={ref} style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", overflow: "hidden" }}>
            {/* Parallax background */}
            <motion.div style={{ position: "absolute", inset: "-10%", zIndex: 0, y: imgY }}>
                <Image src="/hero.png" alt="AESTHETIX Hero" fill style={{ objectFit: "cover", opacity: 0.4 }} priority />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 50%, #000 92%)" }} />
            </motion.div>

            {/* Floating particles */}
            {[...Array(5)].map((_, i) => (
                <motion.div key={i}
                    animate={{ y: [0, -30, 0], x: [0, 10, 0], opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 4 + i * 1.5, repeat: Infinity, delay: i * 0.8 }}
                    style={{
                        position: "absolute", width: "2px", height: "2px", borderRadius: "50%",
                        background: "#fff", top: `${20 + i * 15}%`, left: `${10 + i * 18}%`, zIndex: 1
                    }}
                />
            ))}

            <motion.div className="container" style={{ position: "relative", zIndex: 2, paddingTop: "6rem", y: textY, opacity }}>
                <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
                    <motion.div className="badge" style={{ marginBottom: "2rem" }}
                        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, type: "spring" }}>
                        <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }}
                            style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#fff" }} />
                        Swiss Premium Skincare
                    </motion.div>

                    {/* Animated headline — word by word */}
                    <h1 style={{ fontSize: "clamp(3rem, 8vw, 7rem)", fontWeight: 900, lineHeight: 0.92, textTransform: "uppercase", marginBottom: "2rem", maxWidth: "750px" }}>
                        {"Master Your Appearance.".split(" ").map((word, i) => (
                            <motion.span key={i} initial={{ opacity: 0, y: 50, rotateX: -40 }} animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                transition={{ delay: 0.5 + i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                style={{ display: "inline-block", marginRight: "0.3em" }}>
                                {word}
                            </motion.span>
                        ))}
                    </h1>

                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                        style={{ color: "var(--text-secondary)", fontSize: "1.1rem", maxWidth: "480px", lineHeight: 1.8, marginBottom: "3rem" }}>
                        Hochdosierte Formeln und professionelle Tools aus der Schweiz. Designed für Männer, die das Maximum aus ihrem Look herausholen.
                    </motion.p>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 0.6 }}
                        style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                        <Link href="/products">
                            <motion.button className="btn btn-white" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                                Shop Now
                            </motion.button>
                        </Link>
                        <Link href="/about">
                            <motion.button className="btn btn-outline" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                                Über AESTHETIX
                            </motion.button>
                        </Link>
                    </motion.div>

                    {/* Brand pillars — no fake stats */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
                        style={{ display: "flex", gap: "3.5rem", marginTop: "5rem" }}>
                        {[
                            { icon: "🇨🇭", label: "Swiss Precision" },
                            { icon: "⚗️", label: "Premium Formeln" },
                            { icon: "🌿", label: "Vegan & Tierversuchsfrei" },
                        ].map((s, i) => (
                            <motion.div key={s.label}
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 2 + i * 0.15 }}>
                                <div style={{ fontSize: "1.6rem", marginBottom: "0.2rem" }}>{s.icon}</div>
                                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", letterSpacing: "0.06em" }}>{s.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Scroll indicator with bounce */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}
                style={{ position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontSize: "0.6rem", color: "var(--text-muted)", letterSpacing: "0.25em", textTransform: "uppercase" }}>Scroll</span>
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    style={{ width: "16px", height: "28px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.15)", display: "flex", justifyContent: "center", paddingTop: "6px" }}>
                    <motion.div animate={{ opacity: [1, 0], y: [0, 8] }} transition={{ duration: 1.8, repeat: Infinity }}
                        style={{ width: "2px", height: "6px", borderRadius: "1px", background: "rgba(255,255,255,0.5)" }} />
                </motion.div>
            </motion.div>
        </section>
    );
}

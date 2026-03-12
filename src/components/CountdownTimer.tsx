"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

export default function CountdownTimer({ endHours = 12 }: { endHours?: number }) {
    const [time, setTime] = useState({ h: endHours, m: 0, s: 0 });

    useEffect(() => {
        const end = Date.now() + endHours * 60 * 60 * 1000;
        const tick = () => {
            const diff = Math.max(0, end - Date.now());
            setTime({
                h: Math.floor(diff / 3600000),
                m: Math.floor((diff % 3600000) / 60000),
                s: Math.floor((diff % 60000) / 1000),
            });
        };
        tick();
        const interval = setInterval(tick, 1000);
        return () => clearInterval(interval);
    }, [endHours]);

    const pad = (n: number) => String(n).padStart(2, "0");

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                padding: "0.5rem 1rem", borderRadius: "var(--radius-sm)",
                background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)",
                fontSize: "0.75rem", fontWeight: 700, color: "#ef4444",
            }}>
            <Clock size={12} />
            <span>Angebot endet in</span>
            <span style={{ fontFamily: "monospace", letterSpacing: "0.08em" }}>
                {pad(time.h)}:{pad(time.m)}:{pad(time.s)}
            </span>
        </motion.div>
    );
}

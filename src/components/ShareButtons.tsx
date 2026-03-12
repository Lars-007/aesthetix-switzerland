"use client";
import { motion } from "framer-motion";
import { Share2, MessageCircle, Link as LinkIcon, Check } from "lucide-react";
import { useState } from "react";

export default function ShareButtons({ productName, productUrl }: { productName: string; productUrl: string }) {
    const [copied, setCopied] = useState(false);

    const fullUrl = typeof window !== "undefined" ? window.location.origin + productUrl : productUrl;

    const shareWhatsApp = () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(`Schau dir ${productName} bei AESTHETIX an: ${fullUrl}`)}`, "_blank");
    };

    const copyLink = () => {
        navigator.clipboard.writeText(fullUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Teilen:</span>
            {[
                { icon: MessageCircle, label: "WhatsApp", action: shareWhatsApp },
                { icon: copied ? Check : LinkIcon, label: copied ? "Kopiert!" : "Link", action: copyLink },
            ].map((btn) => (
                <motion.button key={btn.label} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                    onClick={btn.action}
                    style={{
                        width: "34px", height: "34px", borderRadius: "50%",
                        background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer", color: copied && btn.label === "Kopiert!" ? "#22c55e" : "var(--text-secondary)",
                        transition: "all 0.3s",
                    }}>
                    <btn.icon size={14} />
                </motion.button>
            ))}
        </div>
    );
}

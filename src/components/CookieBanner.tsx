"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, X } from "lucide-react";

export default function CookieBanner() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const accepted = localStorage.getItem("cookies-accepted");
        if (!accepted) setTimeout(() => setShow(true), 2000);
    }, []);

    const accept = () => { localStorage.setItem("cookies-accepted", "1"); setShow(false); };

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    style={{
                        position: "fixed", bottom: "1.5rem", left: "50%", transform: "translateX(-50%)",
                        zIndex: 95, width: "min(600px, 90vw)",
                        background: "rgba(10,10,10,0.95)", backdropFilter: "blur(30px)",
                        border: "1px solid var(--border)", borderRadius: "var(--radius)",
                        padding: "1.3rem 1.5rem",
                        display: "flex", alignItems: "center", gap: "1rem",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                    }}>
                    <Shield size={20} style={{ flexShrink: 0, color: "var(--text-secondary)" }} />
                    <div style={{ flex: 1 }}>
                        <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                            Wir verwenden Cookies für ein besseres Erlebnis. Mit der Nutzung stimmst du unserer{" "}
                            <span style={{ color: "#fff", textDecoration: "underline", textUnderlineOffset: "2px", cursor: "pointer" }}>Datenschutzerklärung</span> zu.
                        </p>
                    </div>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        onClick={accept} className="btn btn-white"
                        style={{ padding: "0.6rem 1.2rem", fontSize: "0.7rem", flexShrink: 0 }}>
                        OK
                    </motion.button>
                    <button onClick={() => setShow(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", flexShrink: 0 }}>
                        <X size={16} />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

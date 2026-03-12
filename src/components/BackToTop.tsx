"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

export default function BackToTop() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const fn = () => setShow(window.scrollY > 600);
        window.addEventListener("scroll", fn);
        return () => window.removeEventListener("scroll", fn);
    }, []);

    return (
        <AnimatePresence>
            {show && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(255,255,255,0.15)" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    style={{
                        position: "fixed", bottom: "2rem", left: "2rem", zIndex: 90,
                        width: "44px", height: "44px", borderRadius: "50%",
                        background: "rgba(255,255,255,0.08)", border: "1px solid var(--border)",
                        backdropFilter: "blur(20px)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer", color: "#fff",
                    }}>
                    <ArrowUp size={16} />
                </motion.button>
            )}
        </AnimatePresence>
    );
}

"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift } from "lucide-react";

export default function NewsletterPopup() {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const dismissed = sessionStorage.getItem("newsletter-dismissed");
        if (dismissed) return;
        const timer = setTimeout(() => setShow(true), 5000);
        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = () => {
        if (!email.includes("@")) return;
        setSubmitted(true);
        setTimeout(() => { setShow(false); sessionStorage.setItem("newsletter-dismissed", "1"); }, 2500);
    };

    const handleClose = () => {
        setShow(false);
        sessionStorage.setItem("newsletter-dismissed", "1");
    };

    return (
        <AnimatePresence>
            {show && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
                    onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}>
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 30 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        style={{
                            width: "440px", padding: "3rem", borderRadius: "var(--radius)",
                            background: "var(--bg-card)", border: "1px solid var(--border)",
                            textAlign: "center", position: "relative",
                            boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
                        }}>
                        <button onClick={handleClose} style={{
                            position: "absolute", top: "1rem", right: "1rem",
                            background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer",
                        }}><X size={18} /></button>

                        {!submitted ? (
                            <>
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}
                                    style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
                                    <Gift size={22} />
                                </motion.div>
                                <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.5rem" }}>10% Rabatt</h3>
                                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "2rem", lineHeight: 1.7 }}>
                                    Melde dich für unseren Newsletter an und erhalte <strong style={{ color: "#fff" }}>10% Rabatt</strong> auf deine erste Bestellung.
                                </p>
                                <div style={{ display: "flex", gap: "0.5rem" }}>
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                        placeholder="deine@email.ch"
                                        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                                        style={{
                                            flex: 1, padding: "0.85rem 1rem", background: "var(--bg)", border: "1px solid var(--border)",
                                            borderRadius: "var(--radius-sm)", color: "#fff", fontSize: "0.85rem", outline: "none",
                                            transition: "border-color 0.3s",
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = "rgba(255,255,255,0.2)"}
                                        onBlur={(e) => e.target.style.borderColor = "var(--border)"}
                                    />
                                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                        className="btn btn-white" onClick={handleSubmit}
                                        style={{ padding: "0.85rem 1.5rem" }}>
                                        SICHERN
                                    </motion.button>
                                </div>
                                <p style={{ fontSize: "0.68rem", color: "var(--text-muted)", marginTop: "1rem" }}>
                                    Kein Spam. Jederzeit kündbar.
                                </p>
                            </>
                        ) : (
                            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎉</div>
                                <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "0.5rem" }}>Willkommen!</h3>
                                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                                    Dein Code: <strong style={{ color: "#fff", letterSpacing: "0.1em" }}>WELCOME10</strong>
                                </p>
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

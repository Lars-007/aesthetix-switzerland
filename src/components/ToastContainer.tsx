"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useToastStore } from "@/store/toastStore";
import { Check, X, Info, AlertTriangle } from "lucide-react";

const icons = { success: Check, error: AlertTriangle, info: Info };
const colors = { success: "#22c55e", error: "#ef4444", info: "#3b82f6" };

export default function ToastContainer() {
    const toasts = useToastStore((s) => s.toasts);
    const removeToast = useToastStore((s) => s.removeToast);

    return (
        <div style={{ position: "fixed", bottom: "2rem", right: "2rem", zIndex: 100, display: "flex", flexDirection: "column", gap: "0.6rem", pointerEvents: "none" }}>
            <AnimatePresence>
                {toasts.map((t) => {
                    const Icon = icons[t.type];
                    return (
                        <motion.div key={t.id}
                            initial={{ opacity: 0, x: 80, scale: 0.8 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 80, scale: 0.8 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            style={{
                                pointerEvents: "auto",
                                display: "flex", alignItems: "center", gap: "0.8rem",
                                padding: "0.9rem 1.3rem",
                                background: "rgba(10,10,10,0.95)", backdropFilter: "blur(20px)",
                                border: `1px solid ${colors[t.type]}33`,
                                borderRadius: "var(--radius-sm)",
                                boxShadow: `0 8px 30px rgba(0,0,0,0.4), 0 0 20px ${colors[t.type]}15`,
                                minWidth: "280px",
                            }}>
                            <div style={{
                                width: "28px", height: "28px", borderRadius: "50%",
                                background: `${colors[t.type]}18`, display: "flex", alignItems: "center", justifyContent: "center",
                                flexShrink: 0,
                            }}>
                                <Icon size={14} color={colors[t.type]} />
                            </div>
                            <span style={{ fontSize: "0.85rem", fontWeight: 500, flex: 1 }}>{t.message}</span>
                            <button onClick={() => removeToast(t.id)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: "2px" }}>
                                <X size={14} />
                            </button>
                            {/* Progress bar */}
                            <motion.div
                                initial={{ scaleX: 1 }}
                                animate={{ scaleX: 0 }}
                                transition={{ duration: 3.5, ease: "linear" }}
                                style={{
                                    position: "absolute", bottom: 0, left: 0, right: 0, height: "2px",
                                    background: colors[t.type], transformOrigin: "left", borderRadius: "0 0 8px 8px",
                                }}
                            />
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
}

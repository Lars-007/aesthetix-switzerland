"use client";
import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Package, Truck, CheckCircle, MapPin, Clock } from "lucide-react";

const steps = [
    { icon: CheckCircle, label: "Bestätigt", desc: "Bestellung eingegangen", time: "Vor 2 Min." },
    { icon: Package, label: "Verarbeitung", desc: "Wird verpackt", time: "In Kürze" },
    { icon: Truck, label: "Versandt", desc: "Unterwegs zu dir", time: "Heute Abend" },
    { icon: MapPin, label: "Zugestellt", desc: "Bei dir angekommen", time: "Morgen" },
];

function TrackingContent() {
    const searchParams = useSearchParams();
    const orderParam = searchParams.get("order") || "AE" + Math.floor(Math.random() * 9000 + 1000);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const timers = [
            setTimeout(() => setCurrentStep(1), 2000),
            setTimeout(() => setCurrentStep(2), 5000),
        ];
        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <div className="container" style={{ padding: "4rem 2rem", maxWidth: "700px", minHeight: "80vh" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="badge" style={{ marginBottom: "1rem" }}>BESTELLVERFOLGUNG</div>
                <h1 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "0.5rem" }}>Bestellung #{orderParam}</h1>
                <p style={{ color: "var(--text-secondary)", marginBottom: "3rem" }}>Verfolge den Status deiner Bestellung in Echtzeit.</p>
            </motion.div>

            {/* Progress Steps */}
            <div style={{ position: "relative", marginBottom: "4rem" }}>
                {/* Line */}
                <div style={{ position: "absolute", left: "22px", top: "44px", bottom: "44px", width: "2px", background: "var(--border)" }}>
                    <motion.div
                        initial={{ height: "0%" }}
                        animate={{ height: `${(currentStep / (steps.length - 1)) * 100}%` }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        style={{ width: "100%", background: "#fff", borderRadius: "2px" }}
                    />
                </div>

                {steps.map((step, i) => {
                    const Icon = step.icon;
                    const active = i <= currentStep;
                    return (
                        <motion.div key={step.label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                            style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", marginBottom: i < steps.length - 1 ? "2.5rem" : 0 }}>
                            <motion.div
                                animate={{ scale: active ? 1 : 0.85, background: active ? "#fff" : "var(--bg-card)" }}
                                transition={{ type: "spring", stiffness: 300 }}
                                style={{
                                    width: "44px", height: "44px", borderRadius: "50%",
                                    border: `2px solid ${active ? "#fff" : "var(--border)"}`,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    flexShrink: 0, zIndex: 1, transition: "all 0.5s",
                                }}>
                                <Icon size={18} color={active ? "#000" : "var(--text-muted)"} />
                            </motion.div>
                            <div style={{ paddingTop: "0.3rem" }}>
                                <div style={{ fontSize: "0.95rem", fontWeight: 700, color: active ? "#fff" : "var(--text-muted)", transition: "color 0.5s" }}>{step.label}</div>
                                <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "0.2rem" }}>{step.desc}</div>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.72rem", color: "var(--text-muted)" }}>
                                    <Clock size={10} /> {step.time}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Delivery Info */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "1.5rem" }}>
                <h3 style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "1rem" }}>Lieferdetails</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    {[
                        { l: "Versandart", v: "Express (1-2 Tage)" },
                        { l: "Verpackung", v: "Premium Black Box" },
                        { l: "Tracking-Nr.", v: `CH${Math.floor(Math.random() * 900000 + 100000)}` },
                        { l: "Gewicht", v: "0.4 kg" },
                    ].map((d) => (
                        <div key={d.l}>
                            <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginBottom: "0.2rem", letterSpacing: "0.05em" }}>{d.l}</div>
                            <div style={{ fontSize: "0.85rem", fontWeight: 600 }}>{d.v}</div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

export default function TrackingPage() {
    return (
        <Suspense fallback={<div className="container" style={{ padding: "8rem 2rem", textAlign: "center" }}><div className="skeleton" style={{ width: "200px", height: "30px", margin: "0 auto" }} /></div>}>
            <TrackingContent />
        </Suspense>
    );
}

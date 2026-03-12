"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Lock, CreditCard, Truck, CheckCircle, Tag, X } from "lucide-react";

const COUPONS: Record<string, number> = { WELCOME10: 10, AESTHETIX20: 20, LOOKSMAXING: 15, SWISS10: 10 };

export default function CheckoutPage() {
    const { items, updateQuantity, removeItem } = useCartStore();
    const addToast = useToastStore((s) => s.addToast);
    const [submitted, setSubmitted] = useState(false);
    const [orderNum, setOrderNum] = useState("");
    const [coupon, setCoupon] = useState("");
    const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);

    const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
    const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discount / 100) : 0;
    const afterDiscount = subtotal - discountAmount;
    const shipping = afterDiscount >= 50 ? 0 : 5.90;
    const total = afterDiscount + shipping;

    const applyCoupon = () => {
        const code = coupon.trim().toUpperCase();
        if (COUPONS[code]) {
            setAppliedCoupon({ code, discount: COUPONS[code] });
            addToast(`Gutscheincode ${code} angewendet — ${COUPONS[code]}% Rabatt! 🎉`);
            setCoupon("");
        } else {
            addToast("Ungültiger Gutscheincode", "error");
        }
    };

    if (submitted) {
        return (
            <div className="container" style={{ padding: "8rem 2rem", textAlign: "center", minHeight: "80vh" }}>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}>
                        <CheckCircle size={64} strokeWidth={1} style={{ marginBottom: "2rem", color: "#22c55e" }} />
                    </motion.div>
                    <h1 style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: "1rem" }}>Vielen Dank!</h1>
                    <p style={{ color: "var(--text-secondary)", marginBottom: "0.5rem", fontSize: "1.1rem" }}>Deine Bestellung wurde erfolgreich aufgegeben.</p>
                    <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>Bestätigung an deine E-Mail gesendet.</p>
                    <p style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>Bestellnummer: #{orderNum}</p>
                    <p style={{ color: "var(--text-secondary)", marginBottom: "3rem", fontSize: "0.9rem" }}>Du kannst deine Bestellung unter &quot;Bestellverfolgung&quot; tracken.</p>
                    <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                        <Link href="/products"><button className="btn btn-white">Weiter Shoppen</button></Link>
                        <Link href={`/tracking?order=${orderNum}`}><button className="btn btn-outline">Bestellung verfolgen</button></Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="container" style={{ padding: "8rem 2rem", textAlign: "center", minHeight: "80vh" }}>
                <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "1rem" }}>Warenkorb ist leer</h1>
                <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>Füge Produkte hinzu, um zur Kasse zu gehen.</p>
                <Link href="/products"><button className="btn btn-white">Zum Shop</button></Link>
            </div>
        );
    }

    const inputStyle = { width: "100%", padding: "0.8rem 1rem", background: "transparent", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", color: "#fff", outline: "none", fontSize: "0.85rem" };
    const labelStyle = { fontSize: "0.7rem", fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase" as const, display: "block", marginBottom: "0.3rem" };

    return (
        <div className="container" style={{ padding: "3rem 2rem", minHeight: "80vh" }}>
            <Link href="/products" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "var(--text-secondary)", marginBottom: "2rem", fontSize: "0.8rem" }}>
                <ChevronLeft size={14} /> Zurück zum Shop
            </Link>
            <h1 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "3rem" }}>Checkout</h1>

            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "4rem" }}>
                <form onSubmit={(e) => { e.preventDefault(); const num = `AE${Math.floor(Math.random() * 9000 + 1000)}`; setOrderNum(num); setSubmitted(true); }} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                    <div>
                        <h3 style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: "1.2rem", display: "flex", alignItems: "center", gap: "0.5rem" }}><Truck size={16} /> Lieferadresse</h3>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                            {[{ l: "Vorname", p: "Max" }, { l: "Nachname", p: "Mustermann" }].map((f) => (
                                <div key={f.l}>
                                    <label style={labelStyle}>{f.l}</label>
                                    <input required placeholder={f.p} style={inputStyle}
                                        onFocus={(e) => e.currentTarget.style.borderColor = "#fff"} onBlur={(e) => e.currentTarget.style.borderColor = "var(--border)"} />
                                </div>
                            ))}
                        </div>
                        <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                            {[{ l: "E-Mail", p: "max@email.ch", t: "email" }, { l: "Strasse & Hausnr.", p: "Bahnhofstrasse 1" }, { l: "Stadt", p: "Zürich" }].map((f) => (
                                <div key={f.l}>
                                    <label style={labelStyle}>{f.l}</label>
                                    <input required type={f.t || "text"} placeholder={f.p} style={inputStyle}
                                        onFocus={(e) => e.currentTarget.style.borderColor = "#fff"} onBlur={(e) => e.currentTarget.style.borderColor = "var(--border)"} />
                                </div>
                            ))}
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                                <div><label style={labelStyle}>PLZ</label><input required placeholder="8001" style={inputStyle} onFocus={(e) => e.currentTarget.style.borderColor = "#fff"} onBlur={(e) => e.currentTarget.style.borderColor = "var(--border)"} /></div>
                                <div><label style={labelStyle}>Land</label><input value="Schweiz" readOnly style={{ ...inputStyle, background: "var(--bg-card)", color: "var(--text-secondary)" }} /></div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: "1.2rem", display: "flex", alignItems: "center", gap: "0.5rem" }}><CreditCard size={16} /> Zahlungsmethode</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                            {["Kreditkarte", "TWINT", "PayPal"].map((m, i) => (
                                <label key={m} style={{ display: "flex", alignItems: "center", gap: "0.8rem", padding: "1rem", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", cursor: "pointer", transition: "border-color 0.3s" }}
                                    onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--border-hover)"} onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border)"}>
                                    <input type="radio" name="payment" defaultChecked={i === 0} style={{ accentColor: "#fff" }} />
                                    <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>{m}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <motion.button type="submit" className="btn btn-white" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        style={{ padding: "1rem", fontSize: "0.85rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                        <Lock size={14} /> Jetzt Bestellen — CHF {total.toFixed(2)}
                    </motion.button>
                </form>

                {/* Order Summary */}
                <div style={{ position: "sticky", top: "100px", alignSelf: "start" }}>
                    <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "1.5rem" }}>
                        <h3 style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: "1.5rem" }}>Bestellübersicht</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
                            {items.map((item) => (
                                <div key={item.id} style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                                    <div style={{ width: "56px", height: "56px", borderRadius: "var(--radius-sm)", overflow: "hidden", background: "#111", flexShrink: 0, position: "relative" }}>
                                        <Image src={item.imageUrl} alt={item.name} fill style={{ objectFit: "cover" }} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: "0.8rem", fontWeight: 600, lineHeight: 1.3, marginBottom: "0.2rem" }}>{item.name}</div>
                                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Menge: {item.quantity}</div>
                                    </div>
                                    <span style={{ fontSize: "0.85rem", fontWeight: 700, flexShrink: 0 }}>CHF {(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        {/* Coupon Code */}
                        <div style={{ marginBottom: "1.5rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.6rem" }}>
                                <Tag size={13} color="var(--text-muted)" />
                                <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Gutscheincode</span>
                            </div>
                            {appliedCoupon ? (
                                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.7rem 1rem", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: "var(--radius-sm)" }}>
                                    <span style={{ fontSize: "0.8rem", color: "#22c55e", fontWeight: 600 }}>✓ {appliedCoupon.code} (-{appliedCoupon.discount}%)</span>
                                    <button onClick={() => { setAppliedCoupon(null); addToast("Gutschein entfernt"); }} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}><X size={14} /></button>
                                </motion.div>
                            ) : (
                                <div style={{ display: "flex", gap: "0.4rem" }}>
                                    <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Code eingeben"
                                        onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                                        style={{ flex: 1, padding: "0.65rem 0.8rem", background: "transparent", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", color: "#fff", fontSize: "0.8rem", outline: "none" }} />
                                    <button onClick={applyCoupon} className="btn btn-outline" style={{ padding: "0.65rem 1rem", fontSize: "0.7rem" }}>Anwenden</button>
                                </div>
                            )}
                        </div>

                        <div className="divider" style={{ marginBottom: "1rem" }} />
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", fontSize: "0.85rem" }}>
                            <span style={{ color: "var(--text-secondary)" }}>Zwischensumme</span>
                            <span>CHF {subtotal.toFixed(2)}</span>
                        </div>
                        {appliedCoupon && (
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", fontSize: "0.85rem" }}>
                                <span style={{ color: "#22c55e" }}>Rabatt (-{appliedCoupon.discount}%)</span>
                                <span style={{ color: "#22c55e" }}>-CHF {discountAmount.toFixed(2)}</span>
                            </div>
                        )}
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", fontSize: "0.85rem" }}>
                            <span style={{ color: "var(--text-secondary)" }}>Versand</span>
                            <span>{shipping === 0 ? "Kostenlos" : `CHF ${shipping.toFixed(2)}`}</span>
                        </div>
                        <div className="divider" style={{ marginBottom: "1rem" }} />
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.1rem", fontWeight: 800 }}>
                            <span>Total</span>
                            <span>CHF {total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

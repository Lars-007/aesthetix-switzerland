"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useToastStore } from "@/store/toastStore";
import { type ShopifyProduct } from "@/lib/shopify";
import { useRef, useState } from "react";
import { Heart, Eye } from "lucide-react";
import QuickViewModal from "./QuickViewModal";

export default function ProductCard({ product }: { product: ShopifyProduct }) {
    const addItem = useCartStore((s) => s.addItem);
    const addToast = useToastStore((s) => s.addToast);
    const toggle = useWishlistStore((s) => s.toggle);
    const ids = useWishlistStore((s) => s.ids);
    const isFav = ids.includes(product.id);
    const [quickView, setQuickView] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // 3D tilt
    const mx = useMotionValue(0.5), my = useMotionValue(0.5);
    const rx = useSpring(useTransform(my, [0, 1], [4, -4]), { stiffness: 200, damping: 20 });
    const ry = useSpring(useTransform(mx, [0, 1], [-4, 4]), { stiffness: 200, damping: 20 });
    const onMove = (e: React.MouseEvent) => { if (!ref.current) return; const r = ref.current.getBoundingClientRect(); mx.set((e.clientX - r.left) / r.width); my.set((e.clientY - r.top) / r.height); };
    const onLeave = () => { mx.set(0.5); my.set(0.5); };

    // Map ShopifyProduct to expected flat structure
    const variantId = product.variants?.edges?.[0]?.node?.id || product.id;
    const priceAmount = parseFloat(product.variants?.edges?.[0]?.node?.price?.amount || "0");
    const compareAmount = parseFloat(product.variants?.edges?.[0]?.node?.compareAtPrice?.amount || "0");
    const imageUrl = product.featuredImage?.url || "/products/placeholder.png";
    const category = product.collections?.edges?.[0]?.node?.title || "Product";

    return (
        <>
            <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
                style={{
                    borderRadius: "var(--radius)", overflow: "hidden",
                    background: "var(--bg-card)", border: "1px solid var(--border)",
                    display: "flex", flexDirection: "column",
                    transformStyle: "preserve-3d", perspective: "800px", rotateX: rx, rotateY: ry,
                }}
                whileHover={{ y: -8, boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 40px rgba(255,255,255,0.03)" }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
                <div style={{ position: "relative" }}>
                    <Link href={`/products/${product.id}`} style={{ display: "block" }}>
                        <div style={{ height: "340px", position: "relative", overflow: "hidden", background: "#080808" }}>
                            <motion.div style={{ position: "absolute", inset: 0 }} whileHover={{ scale: 1.08 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
                                <Image src={imageUrl} alt={product.title} fill style={{ objectFit: "cover" }} />
                            </motion.div>
                            {/* "NEU" badge handling could be added via meta-fields, hardcoding off for now or checking tags */}
                            {compareAmount > priceAmount && (
                                <span style={{ position: "absolute", top: "14px", right: "50px", background: "rgba(0,0,0,0.7)", color: "#fff", border: "1px solid rgba(255,255,255,0.1)", fontSize: "0.6rem", fontWeight: 700, padding: "0.35rem 0.7rem", borderRadius: "4px", backdropFilter: "blur(10px)", zIndex: 2 }}>
                                    -{Math.round((1 - priceAmount / compareAmount) * 100)}%
                                </span>
                            )}
                            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50%", background: "linear-gradient(to top, var(--bg-card), transparent)", pointerEvents: "none" }} />
                        </div>
                    </Link>

                    {/* Wishlist Heart */}
                    <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}
                        onClick={(e) => { e.preventDefault(); toggle(product.id); addToast(isFav ? "Von Favoriten entfernt" : "Zu Favoriten hinzugefügt ♡"); }}
                        style={{
                            position: "absolute", top: "14px", right: "14px", zIndex: 3,
                            width: "34px", height: "34px", borderRadius: "50%",
                            background: isFav ? "#fff" : "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.1)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            cursor: "pointer", backdropFilter: "blur(10px)", transition: "all 0.3s",
                        }}>
                        <Heart size={14} fill={isFav ? "#000" : "none"} color={isFav ? "#000" : "#fff"} />
                    </motion.button>

                    {/* Quick View Eye */}
                    <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}
                        onClick={(e) => { e.preventDefault(); setQuickView(true); }}
                        style={{
                            position: "absolute", top: "54px", right: "14px", zIndex: 3,
                            width: "34px", height: "34px", borderRadius: "50%",
                            background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.1)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            cursor: "pointer", backdropFilter: "blur(10px)", transition: "all 0.3s",
                        }}>
                        <Eye size={14} color="#fff" />
                    </motion.button>
                </div>

                <div style={{ padding: "1.3rem 1.5rem", display: "flex", flexDirection: "column", flex: 1 }}>
                    <span style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.18em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "0.5rem" }}>{category}</span>
                    <Link href={`/products/${product.handle}`}>
                        <h3 style={{ fontSize: "0.95rem", fontWeight: 600, lineHeight: 1.4, marginBottom: "0.6rem", transition: "color 0.3s" }}
                            onMouseEnter={(e) => e.currentTarget.style.color = "var(--text-secondary)"} onMouseLeave={(e) => e.currentTarget.style.color = "#fff"}>
                            {product.title}
                        </h3>
                    </Link>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.3rem" }}>
                        <span style={{ fontSize: "1.15rem", fontWeight: 800 }}>CHF {priceAmount.toFixed(2)}</span>
                        {compareAmount > priceAmount && <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", textDecoration: "line-through" }}>CHF {compareAmount.toFixed(2)}</span>}
                    </div>
                    <motion.button className="btn btn-white" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                        style={{ width: "100%", padding: "0.75rem", fontSize: "0.73rem", marginTop: "auto" }}
                        onClick={(e) => { e.preventDefault(); addItem({ id: variantId, name: product.title, price: priceAmount, imageUrl: imageUrl }); addToast(`${product.title} hinzugefügt ✓`); }}>
                        In den Warenkorb
                    </motion.button>
                </div>
            </motion.div>

            {/* TODO: Update QuickViewModal to accept ShopifyProduct types soon */}
            {quickView && <QuickViewModal product={product as any} onClose={() => setQuickView(false)} />}
        </>
    );
}

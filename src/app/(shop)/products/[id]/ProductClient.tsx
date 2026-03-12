"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";
import { useRecentlyViewedStore } from "@/store/recentlyViewedStore";
import { Minus, Plus, ChevronLeft, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import ShareButtons from "@/components/ShareButtons";
import RecentlyViewed from "@/components/RecentlyViewed";
import type { ShopifyProduct } from "@/lib/shopify";

export default function ProductClient({ product, related, crossSell }: { product: ShopifyProduct, related: ShopifyProduct[], crossSell: ShopifyProduct[] }) {
    const [qty, setQty] = useState(1);
    const [zoomedPos, setZoomedPos] = useState<{ x: number; y: number } | null>(null);
    const addItem = useCartStore((s) => s.addItem);
    const addToast = useToastStore((s) => s.addToast);
    const addRecentlyViewed = useRecentlyViewedStore((s) => s.addId);

    const variantId = product.variants?.edges?.[0]?.node?.id || product.id;
    const priceAmount = parseFloat(product.variants?.edges?.[0]?.node?.price?.amount || "0");
    const compareAmount = parseFloat(product.variants?.edges?.[0]?.node?.compareAtPrice?.amount || "0");
    const imageUrl = product.featuredImage?.url || "/products/placeholder.png";
    const category = product.collections?.edges?.[0]?.node?.title || "Product";

    useEffect(() => { if (product) addRecentlyViewed(product.handle); }, [product, addRecentlyViewed]);

    return (
        <div className="container" style={{ padding: "3rem 2rem" }}>
            <Link href="/products" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "var(--text-secondary)", marginBottom: "2.5rem", fontSize: "0.8rem", transition: "color 0.3s" }}
                onMouseEnter={(e) => e.currentTarget.style.color = "#fff"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"}>
                <ChevronLeft size={14} /> Zurück
            </Link>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", marginBottom: "6rem" }}>
                {/* Image with Zoom */}
                <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
                    style={{ borderRadius: "var(--radius)", overflow: "hidden", background: "#0a0a0a", border: "1px solid var(--border)", aspectRatio: "4/5", position: "relative", cursor: "crosshair" }}
                    onMouseMove={(e) => {
                        const r = e.currentTarget.getBoundingClientRect();
                        setZoomedPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
                    }}
                    onMouseLeave={() => setZoomedPos(null)}>
                    <Image src={imageUrl} alt={product.title} fill
                        style={{
                            objectFit: "cover",
                            transform: zoomedPos ? "scale(2)" : "scale(1)",
                            transformOrigin: zoomedPos ? `${zoomedPos.x}% ${zoomedPos.y}%` : "center",
                            transition: zoomedPos ? "none" : "transform 0.3s ease",
                        }} />
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                    style={{ paddingTop: "1rem" }}>
                    <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "0.6rem", display: "block" }}>{category}</span>
                    <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "1rem", lineHeight: 1.15 }}>{product.title}</h1>

                    <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "2rem" }}>
                        <span style={{ fontSize: "1.8rem", fontWeight: 800 }}>CHF {priceAmount.toFixed(2)}</span>
                        {compareAmount > priceAmount && <span style={{ fontSize: "1rem", color: "var(--text-muted)", textDecoration: "line-through" }}>CHF {compareAmount.toFixed(2)}</span>}
                        {compareAmount > priceAmount && <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#22c55e", background: "rgba(34,197,94,0.1)", padding: "0.25rem 0.6rem", borderRadius: "4px" }}>-{Math.round((1 - priceAmount / compareAmount) * 100)}%</span>}
                    </div>

                    <div style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "3rem" }} dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />

                    <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "0.5rem 1rem" }}>
                            <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}><Minus size={14} /></button>
                            <span style={{ fontWeight: 700, minWidth: "20px", textAlign: "center" }}>{qty}</span>
                            <button onClick={() => setQty(qty + 1)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}><Plus size={14} /></button>
                        </div>
                        <motion.button className="btn btn-white" style={{ flex: 1 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                            onClick={() => { for (let i = 0; i < qty; i++) addItem({ id: variantId, name: product.title, price: priceAmount, imageUrl }); addToast(`${product.title} hinzugefügt ✓`); }}>
                            In den Warenkorb — CHF {(priceAmount * qty).toFixed(2)}
                        </motion.button>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "1.5rem", borderTop: "1px solid var(--border)" }}>
                        <div style={{ display: "flex", gap: "2rem" }}>
                            {[{ icon: Truck, txt: "Express Versand" }, { icon: ShieldCheck, txt: "Premium Qualität" }, { icon: RotateCcw, txt: "14 Tage Retoure" }].map(({ icon: I, txt }) => (
                                <div key={txt} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                    <I size={16} strokeWidth={1.5} color="#555" />
                                    <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{txt}</span>
                                </div>
                            ))}
                        </div>
                        <ShareButtons productName={product.title} productUrl={`/products/${product.handle}`} />
                    </div>
                </motion.div>
            </div>

            {/* Cross-sell */}
            {crossSell.length > 0 && (
                <section style={{ paddingBottom: "3rem" }}>
                    <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "2rem" }}>Andere kauften auch</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.2rem" }}>
                        {crossSell.map((p) => <ProductCard key={p.id} product={p} />)}
                    </div>
                </section>
            )}

            {/* Related */}
            {related.length > 0 && (
                <section style={{ paddingBottom: "3rem" }}>
                    <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "2rem" }}>Das könnte dir auch gefallen</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.2rem" }}>
                        {related.map((p) => <ProductCard key={p.id} product={p} />)}
                    </div>
                </section>
            )}

            <RecentlyViewed />
        </div>
    );
}

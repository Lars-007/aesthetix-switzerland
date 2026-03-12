"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import SearchOverlay from "./SearchOverlay";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const toggleCart = useCartStore((s) => s.toggleCart);
    const items = useCartStore((s) => s.items);
    const count = items.reduce((a, i) => a + i.quantity, 0);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 30);
        window.addEventListener("scroll", fn);
        return () => window.removeEventListener("scroll", fn);
    }, []);

    // ⌘K shortcut
    useEffect(() => {
        const fn = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setSearchOpen(true); } };
        window.addEventListener("keydown", fn);
        return () => window.removeEventListener("keydown", fn);
    }, []);

    const navLinks = [
        { href: "/products", label: "Shop" },
        { href: "/collections/bestseller", label: "Bestseller" },
        { href: "/collections/skincare", label: "Skincare" },
        { href: "/collections/tools", label: "Tools" },
        { href: "/about", label: "Über Uns" },
        { href: "/contact", label: "Kontakt" },
        { href: "/blog", label: "Blog" },
    ];

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
                    height: scrolled ? "64px" : "80px",
                    display: "flex", alignItems: "center",
                    transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                    background: scrolled ? "rgba(0,0,0,0.85)" : "transparent",
                    backdropFilter: scrolled ? "blur(40px) saturate(1.4)" : "none",
                    borderBottom: scrolled ? "1px solid rgba(255,255,255,0.04)" : "none",
                }}
            >
                <div className="container-wide" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                    {/* Logo icon + brand name */}
                    <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
                        <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }}
                            style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
                            <Image src="/logo-icon.png" alt="AESTHETIX" width={34} height={34} style={{ objectFit: "contain", borderRadius: "4px" }} priority />
                            <span style={{ fontSize: "1.2rem", fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase", color: "#fff" }}>
                                AESTHETIX
                            </span>
                        </motion.div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="desktop-nav">
                        {navLinks.map((l, i) => (
                            <motion.div key={l.href}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + i * 0.05, duration: 0.5 }}
                            >
                                <Link href={l.href} className="hover-line" style={{
                                    color: "var(--text-secondary)", fontSize: "0.75rem", fontWeight: 500,
                                    letterSpacing: "0.08em", textTransform: "uppercase",
                                    transition: "color 0.4s", padding: "0.3rem 0",
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = "#fff"}
                                    onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"}
                                >
                                    {l.label}
                                </Link>
                            </motion.div>
                        ))}
                    </nav>

                    {/* Right side actions */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                        {/* Search */}
                        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                            onClick={() => setSearchOpen(true)}
                            style={{
                                background: "transparent", border: "1px solid var(--border)",
                                borderRadius: "50%", width: "42px", height: "42px",
                                color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                                cursor: "pointer", transition: "all 0.4s",
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#fff"; e.currentTarget.style.boxShadow = "0 0 20px rgba(255,255,255,0.08)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}
                        >
                            <Search size={16} strokeWidth={1.5} />
                        </motion.button>

                        {/* Cart */}
                        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            onClick={toggleCart}
                            style={{
                                background: "transparent", border: "1px solid var(--border)",
                                borderRadius: "50%", width: "42px", height: "42px",
                                color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                                position: "relative", cursor: "pointer", transition: "all 0.4s",
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#fff"; e.currentTarget.style.boxShadow = "0 0 20px rgba(255,255,255,0.08)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}
                        >
                            <ShoppingBag size={16} strokeWidth={1.5} />
                            <AnimatePresence>
                                {count > 0 && (
                                    <motion.span
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0, opacity: 0 }}
                                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                                        style={{
                                            position: "absolute", top: "-6px", right: "-6px",
                                            background: "#fff", color: "#000",
                                            fontSize: "0.6rem", fontWeight: 800,
                                            width: "20px", height: "20px", borderRadius: "50%",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            boxShadow: "0 2px 10px rgba(255,255,255,0.2)",
                                        }}>
                                        {count}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.button>

                        {/* Mobile hamburger */}
                        <motion.button whileTap={{ scale: 0.9 }} onClick={() => setMobileOpen(!mobileOpen)}
                            className="mobile-menu-btn"
                            style={{
                                display: "none", background: "transparent", border: "1px solid var(--border)",
                                borderRadius: "50%", width: "42px", height: "42px",
                                color: "#fff", alignItems: "center", justifyContent: "center", cursor: "pointer",
                            }}>
                            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
                        </motion.button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        style={{
                            position: "fixed", top: "64px", left: 0, right: 0, bottom: 0,
                            zIndex: 49, background: "rgba(0,0,0,0.98)", backdropFilter: "blur(20px)",
                            padding: "2rem", display: "flex", flexDirection: "column", gap: "0.5rem",
                        }}>
                        {navLinks.map((l, i) => (
                            <motion.div key={l.href}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.06 }}>
                                <Link href={l.href} onClick={() => setMobileOpen(false)}
                                    style={{
                                        display: "block", padding: "1rem 0",
                                        fontSize: "1.2rem", fontWeight: 600,
                                        color: "var(--text-secondary)", borderBottom: "1px solid var(--border)",
                                        transition: "color 0.3s",
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = "#fff"}
                                    onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"}>
                                    {l.label}
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        </>
    );
}

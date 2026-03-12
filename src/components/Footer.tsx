"use client";
import Link from "next/link";
import Image from "next/image";
export default function Footer() {
    return (
        <footer style={{ borderTop: "1px solid var(--border)", padding: "5rem 0 2rem" }}>
            <div className="container" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1.5fr", gap: "3rem", marginBottom: "4rem" }}>
                <div>
                    <Image src="/logo.png" alt="AESTHETIX" width={100} height={24} style={{ objectFit: "contain", marginBottom: "1.2rem" }} />
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.7 }}>Premium High-Performance Skincare & Tools für den modernen Mann. 🇨🇭 Designed in Switzerland.</p>
                </div>
                {[
                    { title: "Shop", links: [{ label: "Alle Produkte", href: "/products" }, { label: "Skincare", href: "/collections/skincare" }, { label: "Tools", href: "/collections/tools" }, { label: "Grooming", href: "/collections/grooming" }, { label: "Favoriten", href: "/wishlist" }] },
                    { title: "Info", links: [{ label: "Über Uns", href: "/about" }, { label: "Blog", href: "/blog" }, { label: "FAQ", href: "/#faq" }, { label: "Kontakt", href: "/contact" }, { label: "Bestellverfolgung", href: "/tracking" }] },
                ].map((col) => (
                    <div key={col.title}>
                        <h4 style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.2rem" }}>{col.title}</h4>
                        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                            {col.links.map((l) => (
                                <li key={l.label}><Link href={l.href} style={{ color: "var(--text-secondary)", fontSize: "0.85rem", transition: "color 0.3s" }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = "#fff"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"}>{l.label}</Link></li>
                            ))}
                        </ul>
                    </div>
                ))}
                <div>
                    <h4 style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.2rem" }}>Newsletter</h4>
                    <p style={{ color: "var(--text-secondary)", marginBottom: "1rem", fontSize: "0.85rem" }}>Neuheiten & exklusive Angebote direkt in dein Postfach.</p>
                    <div style={{ display: "flex", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
                        <input type="email" placeholder="deine@email.ch" style={{ flex: 1, background: "transparent", border: "none", padding: "0.8rem 1rem", color: "#fff", outline: "none", fontSize: "0.85rem" }} />
                        <button style={{ background: "#fff", color: "#000", border: "none", padding: "0 1.5rem", fontWeight: 700, cursor: "pointer", fontSize: "0.75rem", letterSpacing: "0.08em" }}>GO</button>
                    </div>
                </div>
            </div>
            <div className="divider" />
            <div className="container" style={{ paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", color: "var(--text-muted)", fontSize: "0.75rem" }}>
                <p>&copy; 2026 AESTHETIX SWITZERLAND. All rights reserved.</p>
                <div style={{ display: "flex", gap: "1.5rem" }}>
                    {[{ label: "Impressum", href: "/impressum" }, { label: "AGB", href: "/agb" }, { label: "Datenschutz", href: "/datenschutz" }, { label: "Widerruf", href: "/widerruf" }].map((l) => (
                        <Link key={l.label} href={l.href} style={{ transition: "color 0.3s" }}
                            onMouseEnter={(e) => e.currentTarget.style.color = "#fff"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}>{l.label}</Link>
                    ))}
                </div>
            </div>
        </footer>
    );
}

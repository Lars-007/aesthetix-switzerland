"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { LayoutDashboard, Package, ShoppingCart, Settings, LogOut, BarChart3 } from "lucide-react";

const nav = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/products", label: "Produkte", icon: Package },
    { href: "/admin/orders", label: "Bestellungen", icon: ShoppingCart },
    { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            <aside style={{
                width: "240px", borderRight: "1px solid var(--border)", padding: "1.5rem", display: "flex", flexDirection: "column",
                background: "var(--bg-raised)", position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 40
            }}>
                <div style={{ marginBottom: "2.5rem", paddingTop: "0.5rem" }}>
                    <Image src="/logo.png" alt="AESTHETIX" width={90} height={22} style={{ objectFit: "contain", marginBottom: "0.3rem" }} />
                    <span style={{ color: "var(--text-muted)", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Admin Panel</span>
                </div>
                <nav style={{ display: "flex", flexDirection: "column", gap: "0.2rem", flex: 1 }}>
                    {nav.map((n) => {
                        const active = pathname === n.href;
                        return (
                            <Link key={n.href} href={n.href} style={{
                                display: "flex", alignItems: "center", gap: "0.7rem",
                                padding: "0.65rem 0.8rem", borderRadius: "var(--radius-sm)",
                                background: active ? "var(--bg-hover)" : "transparent",
                                border: active ? "1px solid var(--border)" : "1px solid transparent",
                                color: active ? "#fff" : "var(--text-secondary)",
                                fontSize: "0.8rem", fontWeight: active ? 600 : 500, transition: "all 0.2s",
                            }}
                                onMouseEnter={(e) => { if (!active) { e.currentTarget.style.background = "var(--bg-hover)"; e.currentTarget.style.color = "#fff"; } }}
                                onMouseLeave={(e) => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-secondary)"; } }}
                            >
                                <n.icon size={16} /> {n.label}
                            </Link>
                        );
                    })}
                </nav>
                <button style={{ display: "flex", alignItems: "center", gap: "0.7rem", padding: "0.65rem 0.8rem", background: "transparent", border: "none", color: "var(--text-muted)", fontSize: "0.8rem", cursor: "pointer", transition: "color 0.3s" }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "#fff"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}>
                    <LogOut size={16} /> Abmelden
                </button>
            </aside>
            <main style={{ flex: 1, padding: "2rem 2.5rem", marginLeft: "240px" }}>{children}</main>
        </div>
    );
}

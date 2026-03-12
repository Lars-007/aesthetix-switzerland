"use client";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import FeaturedProducts from "@/components/FeaturedProducts";
import FAQ from "@/components/FAQ";
import Reviews from "@/components/Reviews";
import RecentlyViewed from "@/components/RecentlyViewed";
import InstagramFeed from "@/components/InstagramFeed";
import { motion, useInView } from "framer-motion";
import { Truck, ShieldCheck, RotateCcw, Sparkles } from "lucide-react";
import { useRef } from "react";

function Benefits() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const items = [
    { icon: Truck, title: "Kostenloser Versand", desc: "Ab CHF 50 in der ganzen Schweiz" },
    { icon: ShieldCheck, title: "Premium Qualität", desc: "Hochdosierte, klinisch getestete Formeln" },
    { icon: RotateCcw, title: "14 Tage Retoure", desc: "Einfache Rückgabe bei ungeöffneten Produkten" },
    { icon: Sparkles, title: "Swiss Made", desc: "Entwickelt und designed in der Schweiz" },
  ];
  return (
    <section ref={ref} style={{ padding: "6rem 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem" }}>
          {items.map(({ icon: Icon, title, desc }, i) => (
            <motion.div key={title}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
              style={{
                textAlign: "center", padding: "2.5rem 1.5rem",
                borderRadius: "var(--radius-sm)", border: "1px solid transparent",
                transition: "border-color 0.4s, background 0.4s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "var(--bg-raised)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.background = "transparent"; }}>
              <motion.div whileHover={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 0.5 }}>
                <Icon size={30} strokeWidth={1.2} style={{ marginBottom: "1.2rem", color: "#fff" }} />
              </motion.div>
              <h4 style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: "0.5rem" }}>{title}</h4>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.8rem", lineHeight: 1.7 }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Benefits />
      <FeaturedProducts />
      <FAQ />
      <InstagramFeed />
      <RecentlyViewed />
      <Reviews />
    </>
  );
}

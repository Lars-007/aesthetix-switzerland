"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Star, MessageSquarePlus } from "lucide-react";

// Empty state — new shop, no reviews yet. Shows a CTA to leave a review.
export default function Reviews() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", text: "", rating: 5 });

  return (
    <section ref={ref} style={{ padding: "4rem 0" }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <div className="badge" style={{ marginBottom: "1rem" }}>BEWERTUNGEN</div>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 900, marginBottom: "0.5rem" }}>Kundenbewertungen</h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "3rem", fontSize: "0.9rem" }}>
            Sei der Erste, der dieses Produkt bewertet.
          </p>
        </motion.div>

        {!submitted ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
            style={{ maxWidth: "540px", padding: "2rem", border: "1px solid var(--border)", borderRadius: "var(--radius)", background: "var(--bg-card)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
              <MessageSquarePlus size={18} />
              <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>Bewertung schreiben</span>
            </div>

            {/* Star picker */}
            <div style={{ display: "flex", gap: "4px", marginBottom: "1.2rem" }}>
              {[1,2,3,4,5].map(n => (
                <button key={n} onClick={() => setForm(f => ({ ...f, rating: n }))}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: "2px" }}>
                  <Star size={22} fill={n <= form.rating ? "#fff" : "transparent"} color={n <= form.rating ? "#fff" : "#444"} />
                </button>
              ))}
            </div>

            <input placeholder="Dein Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              style={{ width: "100%", padding: "0.7rem 1rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", color: "#fff", outline: "none", fontSize: "0.85rem", marginBottom: "0.8rem", boxSizing: "border-box" }} />

            <textarea placeholder="Deine Erfahrung mit dem Produkt..." value={form.text} onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
              rows={3} style={{ width: "100%", padding: "0.7rem 1rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", color: "#fff", outline: "none", fontSize: "0.85rem", resize: "vertical", marginBottom: "1.2rem", boxSizing: "border-box" }} />

            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => { if (form.name && form.text) setSubmitted(true); }}
              className="btn btn-white" style={{ width: "100%", padding: "0.75rem" }}>
              Bewertung abschicken
            </motion.button>
            <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", textAlign: "center", marginTop: "0.8rem" }}>
              Bewertungen werden von unserem Team geprüft.
            </p>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            style={{ maxWidth: "540px", padding: "2rem", border: "1px solid rgba(34,197,94,0.2)", borderRadius: "var(--radius)", background: "rgba(34,197,94,0.04)", textAlign: "center" }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.8rem" }}>✓</div>
            <p style={{ fontWeight: 700, marginBottom: "0.4rem" }}>Danke für deine Bewertung!</p>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Sie wird nach Prüfung veröffentlicht.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

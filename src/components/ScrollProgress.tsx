"use client";
import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();

    return (
        <motion.div
            style={{
                position: "fixed", top: 0, left: 0, right: 0,
                height: "2px", zIndex: 100,
                background: "rgba(255,255,255,0.06)",
                transformOrigin: "left",
            }}>
            <motion.div
                style={{
                    scaleX: scrollYProgress,
                    height: "100%",
                    background: "linear-gradient(90deg, rgba(255,255,255,0.3), #fff)",
                    transformOrigin: "left",
                    boxShadow: "0 0 10px rgba(255,255,255,0.3)",
                }}
            />
        </motion.div>
    );
}

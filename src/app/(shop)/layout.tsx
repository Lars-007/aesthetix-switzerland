"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ToastContainer from "@/components/ToastContainer";
import NewsletterPopup from "@/components/NewsletterPopup";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import CookieBanner from "@/components/CookieBanner";
import SocialProofPopup from "@/components/SocialProofPopup";

export default function ShopLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <ScrollProgress />
            <Header />
            <CartDrawer />
            <ToastContainer />
            <NewsletterPopup />
            <CookieBanner />
            <SocialProofPopup />
            <BackToTop />
            <main style={{ paddingTop: "90px", minHeight: "calc(100vh - 400px)" }}>{children}</main>
            <Footer />
        </>
    );
}

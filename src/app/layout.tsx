import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

export const metadata: Metadata = {
  title: 'AESTHETIX SWITZERLAND | Premium Männer-Skincare',
  description: 'Verbessere dein Aussehen mit hochwertigen AESTHETIX Produkten. Premium Männer-Skincare aus der Schweiz. Natürliche Inhaltsstoffe, sichtbare Resultate.',
  keywords: ['Männer Skincare', 'Looksmaxxing', 'Schweiz', 'Premium', 'Jawline', 'Niacinamid', 'Hautpflege Männer'],
  openGraph: {
    title: 'AESTHETIX SWITZERLAND | Premium Männer-Skincare',
    description: 'Verbessere dein Aussehen mit hochwertigen AESTHETIX Produkten.',
    type: 'website',
    locale: 'de_CH',
    siteName: 'AESTHETIX SWITZERLAND',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className="bg-bg text-white antialiased">
        <Navbar />
        <CartDrawer />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

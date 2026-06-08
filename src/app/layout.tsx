import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

export const metadata: Metadata = {
  metadataBase: new URL('https://aesthetix-switzerland.ch'),
  title: 'AESTHETIX SWITZERLAND | Premium Männer-Skincare',
  description: 'Verbessere dein Aussehen mit hochwertigen AESTHETIX Produkten. Premium Männer-Skincare einer Schweizer Marke. EU-geprüfte Qualität, natürliche Inhaltsstoffe, sichtbare Resultate.',
  keywords: ['Männer Skincare', 'Looksmaxxing', 'Schweiz', 'Premium', 'Jawline', 'Niacinamid', 'Hautpflege Männer'],
  openGraph: {
    title: 'AESTHETIX SWITZERLAND | Premium Männer-Skincare',
    description: 'Verbessere dein Aussehen mit hochwertigen AESTHETIX Produkten. EU-geprüfte Qualität, sichtbare Resultate.',
    type: 'website',
    locale: 'de_CH',
    siteName: 'AESTHETIX SWITZERLAND',
    images: [{ url: '/hero.png', width: 606, height: 548, alt: 'AESTHETIX SWITZERLAND' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AESTHETIX SWITZERLAND | Premium Männer-Skincare',
    description: 'Premium Männer-Skincare einer Schweizer Marke. EU-geprüfte Qualität, sichtbare Resultate.',
    images: ['/hero.png'],
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

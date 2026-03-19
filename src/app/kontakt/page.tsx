import { getShopPage } from '@/lib/shopify';

export default async function KontaktPage() {
  const page = await getShopPage('kontakt');

  return (
    <main className="min-h-screen pt-32 pb-16 px-6 max-w-3xl mx-auto">
      <h1 className="font-display text-3xl md:text-5xl font-bold mb-8">
        {page?.title || 'Kontaktinformationen'}
      </h1>
      <div className="space-y-6 text-white/70 leading-relaxed text-sm md:text-base">
        {page?.body ? (
          <div
            className="prose prose-invert max-w-none prose-p:text-white/70 prose-headings:text-white prose-a:text-white"
            dangerouslySetInnerHTML={{ __html: page.body }}
          />
        ) : (
          <>
            <p>Haben Sie Fragen oder benötigen Sie Unterstützung? Wir sind für Sie da.</p>
            <div className="bg-bg-raised p-8 rounded-2xl border border-white/5 mt-8">
              <h2 className="text-xl font-bold text-white mb-6">AESTHETIX SWITZERLAND</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <span className="font-semibold text-white/50 w-24">E-Mail:</span>
                  <a href="mailto:info@aesthetix-switzerland.ch" className="text-white hover:text-white/70 transition-colors">info@aesthetix-switzerland.ch</a>
                </li>
              </ul>
            </div>
            <p className="mt-8 text-white/40 text-xs italic">
              (Du kannst diese Seite übrigens im Shopify Admin unter "Vertriebskanäle &gt; Onlineshop &gt; Seiten" erstellen, Titel: Kontakt, und sie wird hier automatisch angezeigt!)
            </p>
          </>
        )}
      </div>
    </main>
  );
}

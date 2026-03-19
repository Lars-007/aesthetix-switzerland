import { getShopPage } from '@/lib/shopify';
import { Mail, MapPin, Clock } from 'lucide-react';

export const metadata = {
  title: 'Kontakt – AESTHETIX Switzerland',
};

export default async function KontaktPage() {
  const page = await getShopPage('kontakt');

  return (
    <main className="min-h-screen pt-32 pb-16 px-6 max-w-3xl mx-auto">
      <h1 className="font-display text-3xl md:text-5xl font-bold mb-10">
        Kontakt
      </h1>

      {page?.body ? (
        <div
          className="prose prose-invert max-w-none
            prose-headings:font-display prose-headings:tracking-wide
            prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
            prose-p:text-white/70 prose-p:leading-relaxed prose-p:text-sm prose-p:md:text-base
            prose-strong:text-white prose-strong:font-semibold
            prose-a:text-white prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-white/70"
          dangerouslySetInnerHTML={{ __html: page.body }}
        />
      ) : (
        <div className="space-y-6">
          <p className="text-white/60 text-sm md:text-base leading-relaxed">
            Hast du Fragen oder brauchst Unterstützung? Wir sind für dich da.
          </p>

          <div className="grid gap-4 mt-8">
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-white/50" />
              </div>
              <div>
                <p className="text-xs text-white/40 uppercase tracking-wider mb-1">E-Mail</p>
                <a href="mailto:info@aesthetix-switzerland.ch" className="text-white hover:text-white/70 transition-colors text-sm font-medium">
                  info@aesthetix-switzerland.ch
                </a>
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-white/50" />
              </div>
              <div>
                <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Standort</p>
                <p className="text-white text-sm font-medium">Schweiz</p>
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-white/50" />
              </div>
              <div>
                <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Antwortzeit</p>
                <p className="text-white text-sm font-medium">Innerhalb von 24 Stunden</p>
              </div>
            </div>
          </div>

          <p className="text-white/30 text-xs mt-8">
            Du kannst diese Seite auch über Shopify Admin verwalten: Vertriebskanäle &rarr; Onlineshop &rarr; Seiten &rarr; Neue Seite &quot;kontakt&quot; erstellen.
          </p>
        </div>
      )}
    </main>
  );
}

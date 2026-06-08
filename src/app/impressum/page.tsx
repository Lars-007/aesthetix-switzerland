import PageHeader from '@/components/PageHeader';

export const metadata = {
  title: 'Impressum – AESTHETIX Switzerland',
};

const sections = [
  {
    heading: 'Anbieterin',
    body: (
      <>
        AESTHETIX Switzerland
        <br />
        {/* TODO: vollständige Firmierung & Adresse ergänzen */}
        [Strasse Nr.], [PLZ Ort]
        <br />
        Schweiz
      </>
    ),
  },
  {
    heading: 'Kontakt',
    body: (
      <>
        E-Mail:{' '}
        <a
          href="mailto:info@aesthetix-switzerland.ch"
          className="text-white underline underline-offset-4 hover:text-white/70 transition-colors"
        >
          info@aesthetix-switzerland.ch
        </a>
      </>
    ),
  },
  {
    heading: 'Handelsregister / UID',
    body: <>UID-Nummer: [CHE-XXX.XXX.XXX] (wird ergänzt)</>,
  },
  {
    heading: 'Vertretungsberechtigte Person',
    body: <>[Vor- und Nachname] (wird ergänzt)</>,
  },
  {
    heading: 'Haftungsausschluss',
    body: (
      <>
        Die Inhalte dieser Website werden mit grösstmöglicher Sorgfalt erstellt. Für die
        Richtigkeit, Vollständigkeit und Aktualität der Inhalte wird jedoch keine Gewähr
        übernommen. Für Inhalte externer Links sind ausschliesslich deren Betreiber
        verantwortlich.
      </>
    ),
  },
];

export default function ImpressumPage() {
  return (
    <main className="min-h-screen pt-32 pb-16 px-6 max-w-3xl mx-auto">
      <PageHeader label="Rechtliches" title="Impressum" />

      <div className="space-y-10">
        {sections.map((s) => (
          <section key={s.heading} className="border-t border-white/5 pt-6">
            <h2 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-3 font-semibold">
              {s.heading}
            </h2>
            <p className="text-white/70 text-sm md:text-base leading-relaxed">{s.body}</p>
          </section>
        ))}
      </div>
    </main>
  );
}

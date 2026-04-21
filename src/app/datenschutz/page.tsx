import { getShopPolicies } from '@/lib/shopify';

export const metadata = {
  title: 'Datenschutzerklärung – AESTHETIX Switzerland',
};

export default async function DatenschutzPage() {
  const policies = await getShopPolicies();
  const policy = policies.privacyPolicy;

  return (
    <main className="min-h-screen pt-32 pb-16 px-6 max-w-3xl mx-auto">
      <h1 className="font-display text-3xl md:text-5xl font-bold mb-10">
        Datenschutzerklärung
      </h1>
      {policy?.body ? (
        <div
          className="prose prose-invert max-w-none
            prose-headings:font-sans prose-headings:font-semibold prose-headings:normal-case prose-headings:tracking-normal
            prose-h2:text-lg prose-h2:mt-8 prose-h2:mb-3
            prose-h3:text-base prose-h3:mt-6 prose-h3:mb-2
            prose-p:text-white/70 prose-p:leading-relaxed prose-p:text-sm prose-p:md:text-base
            prose-li:text-white/70 prose-li:text-sm prose-li:md:text-base
            prose-strong:text-white prose-strong:font-semibold
            prose-a:text-white prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-white/70
            prose-ul:my-4 prose-ol:my-4"
          dangerouslySetInnerHTML={{ __html: policy.body }}
        />
      ) : (
        <p className="text-white/50 text-sm">
          Richtlinien werden geladen. Bitte im Shopify Admin unter Einstellungen &rarr; Richtlinien ausfüllen.
        </p>
      )}
    </main>
  );
}

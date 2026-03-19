import { getShopPolicies } from '@/lib/shopify';

export default async function WiderrufsrechtPage() {
  const policies = await getShopPolicies();
  const policy = policies.refundPolicy;

  return (
    <main className="min-h-screen pt-32 pb-16 px-6 max-w-3xl mx-auto">
      <h1 className="font-display text-3xl md:text-5xl font-bold mb-8">
        {policy?.title || 'Widerrufsrecht'}
      </h1>
      <div className="space-y-6 text-white/70 leading-relaxed text-sm md:text-base">
        {policy?.body ? (
          <div
            className="prose prose-invert max-w-none prose-p:text-white/70 prose-headings:text-white prose-a:text-white"
            dangerouslySetInnerHTML={{ __html: policy.body }}
          />
        ) : (
          <p>
            Richtlinien werden automatisch aus Shopify geladen. Bitte im Shopify Admin unter Einstellungen {'->'} Richtlinien ausfüllen.
          </p>
        )}
      </div>
    </main>
  );
}

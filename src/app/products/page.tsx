import { getProducts } from '@/lib/shopify';
import ProductsGrid from './ProductsGrid';

export const metadata = {
  title: 'Produkte | AESTHETIX SWITZERLAND',
  description: 'Entdecke alle AESTHETIX Premium Männer-Skincare Produkte. Jawline Mask, Niacinamid Gel, Vulkan-Mineral-Peeling und mehr.',
};

export default async function ProductsPage() {
  let products: Awaited<ReturnType<typeof getProducts>> = [];
  try {
    products = await getProducts(50);
  } catch {
    // fallback to empty
  }

  return (
    <section className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-14">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-medium">
            Shop
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold mt-3">
            Alle Produkte
          </h1>
          <p className="text-base text-white/40 mt-4 max-w-lg">
            Premium Skincare für den modernen Mann. Jedes Produkt entwickelt für maximale Wirkung.
          </p>
        </div>

        <ProductsGrid products={products} />
      </div>
    </section>
  );
}

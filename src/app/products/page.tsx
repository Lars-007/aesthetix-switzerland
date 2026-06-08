import { getProducts } from '@/lib/shopify';
import ProductsGrid from './ProductsGrid';
import PageHeader from '@/components/PageHeader';

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
        <PageHeader
          label="Shop"
          title="Alle Produkte"
          description="Premium Skincare für den modernen Mann. Jedes Produkt entwickelt für maximale Wirkung."
        />

        <ProductsGrid products={products} />
      </div>
    </section>
  );
}

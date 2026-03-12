import { getProduct, getProducts } from '@/lib/shopify';
import { notFound } from 'next/navigation';
import ProductDetail from './ProductDetail';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ handle: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) return { title: 'Produkt nicht gefunden' };
  return {
    title: `${product.title} | AESTHETIX SWITZERLAND`,
    description: product.description.slice(0, 160),
  };
}

export async function generateStaticParams() {
  try {
    const products = await getProducts(50);
    return products.map((p) => ({ handle: p.handle }));
  } catch {
    return [];
  }
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) notFound();

  return <ProductDetail product={product} />;
}

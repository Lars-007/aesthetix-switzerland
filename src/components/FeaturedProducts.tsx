import { getProducts, ShopifyProduct } from '@/lib/shopify';
import FeaturedProductsClient from './FeaturedProductsClient';

export default async function FeaturedProducts() {
  let products: ShopifyProduct[] = [];
  try {
    products = await getProducts(6);
  } catch {
    // fallback to empty
  }

  return <FeaturedProductsClient products={products} />;
}

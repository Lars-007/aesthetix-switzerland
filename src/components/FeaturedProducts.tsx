import { getProducts } from "@/lib/shopify";
import FeaturedProductsClient from "./FeaturedProductsClient";

export default async function FeaturedProducts() {
    // Fetch products from Shopify instead of static file
    let products = [];
    try {
        products = await getProducts({ sortKey: "BEST_SELLING", reverse: true });
    } catch (e) {
        console.error("Failed to fetch featured products:", e);
    }
    
    // Only take the first 4 for the featured section
    const featured = products.slice(0, 4);

    if (!featured.length) return null;

    return <FeaturedProductsClient featured={featured} />;
}

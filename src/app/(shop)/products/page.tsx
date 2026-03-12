import { getProducts } from "@/lib/shopify";
import ProductsPageClient from "./ProductsClient";

export default async function ProductsPage() {
    let products = [];
    try {
        products = await getProducts({ sortKey: "TITLE" });
    } catch (e) {
        console.error("Failed to fetch products for Shop page:", e);
    }
    
    return <ProductsPageClient initialProducts={products} />;
}

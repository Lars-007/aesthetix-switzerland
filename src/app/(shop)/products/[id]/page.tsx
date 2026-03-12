import { getProduct, getProducts } from "@/lib/shopify";
import ProductClient from "./ProductClient";
import Link from "next/link";

export default async function PDP({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    
    // Fetch individual product via Shopify
    let product;
    try {
        product = await getProduct(id);
    } catch (e) {
        console.error("Failed to fetch product:", e);
    }
    
    if (!product) {
        return (
            <div className="container" style={{ padding: "6rem 2rem", textAlign: "center" }}>
                <h1>Produkt nicht gefunden</h1>
                <Link href="/products" style={{ color: "var(--text-secondary)" }}>← Zurück zum Shop</Link>
            </div>
        );
    }

    // Attempt to fetch some basic related/cross-sell products
    // (In a real store, you'd query by the same collection/tags)
    let allProducts = [];
    try {
        allProducts = await getProducts({ first: 10 } as any);
    } catch (e) {}
    
    // Filter out the current product
    const otherProducts = allProducts.filter(p => p.id !== product.id);
    const category = product.collections?.edges?.[0]?.node?.title || "";
    
    // Simple mock logic for related vs cross-sell based on collections
    const related = otherProducts.filter(p => p.collections?.edges?.some(e => e.node.title === category)).slice(0, 4);
    const crossSell = otherProducts.filter(p => !p.collections?.edges?.some(e => e.node.title === category)).sort(() => Math.random() - 0.5).slice(0, 4);

    return <ProductClient product={product} related={related} crossSell={crossSell} />;
}

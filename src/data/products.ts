export interface Product {
    id: string;
    name: string;
    price: number;
    comparePrice?: number;
    imageUrl: string;
    images: string[];
    category: "skincare" | "tools" | "grooming";
    collection: string[];
    description: string;
    details: string[];
    badge?: string;
}

export const PRODUCTS: Product[] = [
    {
        id: "eyelash-serum",
        name: "AESTHETIX Eyelash Performance Serum",
        price: 34.00,
        comparePrice: 44.00,
        imageUrl: "/products/eyelash-serum.png",
        images: ["/products/eyelash-serum.png"],
        category: "skincare",
        collection: ["skincare"],
        description: "Hochdosiertes Wimpernserum für sichtbar dichtere und längere Wimpern. Biotin-Peptid-Komplex stimuliert natürliches Wachstum in nur 4 Wochen. Klinisch getestet.",
        details: ["5ml Inhalt", "Biotin & Peptid Komplex", "Ergebnisse in 4 Wochen", "Klinisch getestet", "Made in Switzerland"],
        badge: "NEU",
    },
    {
        id: "sunscreen-stick",
        name: "AESTHETIX Getönter Sonnenschutz-Stick SPF50+",
        price: 24.99,
        imageUrl: "/products/sunscreen-stick.png",
        images: ["/products/sunscreen-stick.png"],
        category: "skincare",
        collection: ["skincare"],
        description: "Mineralischer Breitband-Sonnenschutz mit dezenter Tönung. Kaschiert Rötungen und Unebenheiten. Wasserfest, komedogen-frei und perfekt für den täglichen Einsatz.",
        details: ["SPF 50+ / PA++++", "Mineralischer UV-Filter", "Dezente Tönung", "Wasserfest", "Komedogen-frei"],
    },
    {
        id: "mineral-peeling",
        name: "AESTHETIX Icelandic Vulkan-Mineral-Peeling",
        price: 29.95,
        imageUrl: "/products/mineral-peeling.png",
        images: ["/products/mineral-peeling.png"],
        category: "skincare",
        collection: ["skincare"],
        description: "Tiefenreinigendes Peeling mit isländischen Vulkanmineralien und mikronisierten Bimsstein-Partikeln. Entfernt abgestorbene Hautzellen für ein klares, markantes Hautbild.",
        details: ["100ml Inhalt", "Vulkan-Mineralien aus Island", "Mikro-Bimsstein-Partikel", "Für alle Hauttypen", "Vegan & tierversuchsfrei"],
        badge: "NEU",
    },
    {
        id: "jawline-mask",
        name: "AESTHETIX V-Line Jawline Mask",
        price: 19.90,
        comparePrice: 29.90,
        imageUrl: "/products/jawline-mask.png",
        images: ["/products/jawline-mask.png"],
        category: "tools",
        collection: ["tools"],
        description: "Straffende V-Line Lifting-Maske für eine definierte Jawline. Reduziert Wassereinlagerungen und formt markantere Gesichtszüge. Set mit 5 Masken.",
        details: ["5 Masken pro Packung", "Lifting-Effekt", "Hyaluronsäure-Serum", "Kühlender Effekt", "30 Minuten Anwendung"],
        badge: "NEU",
    },
    {
        id: "dermaroller",
        name: "AESTHETIX Titan Derma Roller 0.5mm",
        price: 22.90,
        imageUrl: "/products/dermaroller.png",
        images: ["/products/dermaroller.png"],
        category: "tools",
        collection: ["tools"],
        description: "Professioneller Titan-Dermaroller mit 540 Nadeln (0.5mm). Stimuliert die Kollagenproduktion, verfeinert Poren und verbessert die Wirkstoff-Aufnahme deiner Skincare.",
        details: ["540 Titan-Nadeln", "0.5mm Nadellänge", "Sterilisierbar", "Mit Schutzkappe", "Inklusive Anleitung"],
    },
    {
        id: "guasha",
        name: "AESTHETIX Obsidian Gua Sha",
        price: 27.00,
        imageUrl: "/products/guasha.png",
        images: ["/products/guasha.png"],
        category: "tools",
        collection: ["tools"],
        description: "Handgeschliffener schwarzer Obsidian Gua Sha zur Gesichtsmassage. Fördert die Lymphdrainage, reduziert Schwellungen und definiert die Gesichtskonturen.",
        details: ["Echter schwarzer Obsidian", "Handgeschliffen & poliert", "Im Samtsäckchen", "Inklusive Massage-Anleitung", "Kühlstein-Effekt"],
    },
    {
        id: "collagen-cream",
        name: "AESTHETIX Collagen Boost Face Cream",
        price: 38.00,
        imageUrl: "/products/collagen-cream.png",
        images: ["/products/collagen-cream.png"],
        category: "skincare",
        collection: ["skincare"],
        description: "Anti-Aging Gesichtscreme mit marine Kollagen-Peptiden, Retinol und Hyaluronsäure. Strafft die Haut, reduziert Falten und sorgt für einen gesunden, jugendlichen Teint.",
        details: ["50ml Inhalt", "Marine Kollagen-Peptide", "Retinol 0.3%", "Hyaluronsäure", "Nachtcreme-Anwendung"],
        badge: "NEU",
    },
    {
        id: "vitamin-c-serum",
        name: "AESTHETIX 20% Vitamin C Brightening Serum",
        price: 32.00,
        imageUrl: "/products/vitamin-c-serum.png",
        images: ["/products/vitamin-c-serum.png"],
        category: "skincare",
        collection: ["skincare"],
        description: "Hochkonzentriertes 20% Vitamin C Serum mit Niacinamid und Ferulasäure. Hellt Hyperpigmentierungen auf, schützt vor freien Radikalen und verleiht einen strahlenden Glow.",
        details: ["30ml Inhalt", "20% L-Ascorbinsäure", "Niacinamid 5%", "Ferulasäure", "Morgens anwenden"],
    },
    {
        id: "eye-patches",
        name: "AESTHETIX Hydrogel Eye Patches",
        price: 18.90,
        imageUrl: "/products/eye-patches.png",
        images: ["/products/eye-patches.png"],
        category: "skincare",
        collection: ["skincare"],
        description: "Kühlende Hydrogel-Augenpads mit Koffein und Hyaluronsäure. Reduzieren Augenringe, Schwellungen und Müdigkeitserscheinungen sofort. 30 Paar pro Dose.",
        details: ["30 Paar (60 Pads)", "Koffein & Hyaluronsäure", "Sofort-Effekt", "Kühlende Wirkung", "15 Min Anwendung"],
    },
    {
        id: "hair-serum",
        name: "AESTHETIX Hair Growth Serum",
        price: 36.00,
        comparePrice: 45.00,
        imageUrl: "/products/hair-serum.png",
        images: ["/products/hair-serum.png"],
        category: "grooming",
        collection: ["grooming"],
        description: "Stimulierendes Haarwachstums-Serum mit Biotin, Koffein und Rosmarin-Extrakt. Stärkt die Haarwurzeln, fördert dichtes, gesundes Haar und reduziert Haarausfall.",
        details: ["50ml Inhalt", "Biotin & Koffein", "Rosmarin-Extrakt", "Minoxidil-frei", "Tägliche Kopfhautmassage"],
        badge: "NEU",
    },
    {
        id: "beard-oil",
        name: "AESTHETIX Premium Beard Oil",
        price: 24.00,
        imageUrl: "/products/beard-oil.png",
        images: ["/products/beard-oil.png"],
        category: "grooming",
        collection: ["grooming"],
        description: "Luxuriöses Bartöl mit Argan-, Jojoba- und Vitamin-E-Öl. Pflegt, glättet und definiert den Bart. Dezenter maskuliner Duft mit Zedernholz und Sandelholz.",
        details: ["30ml Inhalt", "Argan & Jojoba Öl", "Vitamin E angereichert", "Dezenter Holz-Duft", "Anti-Juckreiz"],
    },
];

export const COLLECTIONS = [
    { slug: "skincare", name: "Skincare", description: "Hochdosierte Formeln für ein markantes, gepflegtes Hautbild." },
    { slug: "tools", name: "Tools", description: "Professionelle Tools für maximale Ergebnisse bei deiner Skincare-Routine." },
    { slug: "grooming", name: "Grooming", description: "Premium Bart- und Haarpflege für den modernen Mann." },
];

export function getProduct(id: string): Product | undefined {
    return PRODUCTS.find(p => p.id === id);
}

export function getProductsByCollection(slug: string): Product[] {
    return PRODUCTS.filter(p => p.collection.includes(slug));
}

export function getProductsByCategory(cat: string): Product[] {
    if (cat === "all") return PRODUCTS;
    return PRODUCTS.filter(p => p.category === cat);
}

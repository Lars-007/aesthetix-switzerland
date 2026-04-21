const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!;
const apiVersion = process.env.NEXT_PUBLIC_SHOPIFY_GRAPHQL_API_VERSION || '2026-01';
const privateStorefrontToken = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN;
const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

type ShopifyResponse<T> = {
  data: T;
  errors?: { message: string }[];
};

async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (privateStorefrontToken) {
    headers['Shopify-Storefront-Private-Token'] = privateStorefrontToken;
  } else {
    headers['X-Shopify-Storefront-Access-Token'] = storefrontAccessToken;
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });

  const json: ShopifyResponse<T> = await res.json();

  if (json.errors) {
    throw new Error(json.errors.map(e => e.message).join(', '));
  }

  return json.data;
}

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ShopifyPrice {
  amount: string;
  currencyCode: string;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  tags: string[];
  priceRange: {
    minVariantPrice: ShopifyPrice;
    maxVariantPrice: ShopifyPrice;
  };
  compareAtPriceRange: {
    minVariantPrice: ShopifyPrice;
    maxVariantPrice: ShopifyPrice;
  };
  images: {
    edges: { node: ShopifyImage }[];
  };
  variants: {
    edges: {
      node: {
        id: string;
        title: string;
        availableForSale: boolean;
        price: ShopifyPrice;
        compareAtPrice: ShopifyPrice | null;
        image: ShopifyImage | null;
      };
    }[];
  };
}

const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    title
    handle
    description
    descriptionHtml
    availableForSale
    tags
    priceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    compareAtPriceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    images(first: 10) {
      edges {
        node { url altText width height }
      }
    }
    variants(first: 20) {
      edges {
        node {
          id
          title
          availableForSale
          price { amount currencyCode }
          compareAtPrice { amount currencyCode }
          image { url altText width height }
        }
      }
    }
  }
`;

export async function getProducts(first = 20): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{
    products: { edges: { node: ShopifyProduct }[] };
  }>(`
    ${PRODUCT_FRAGMENT}
    query Products($first: Int!) {
      products(first: $first, sortKey: BEST_SELLING) {
        edges {
          node { ...ProductFields }
        }
      }
    }
  `, { first });

  return data.products.edges.map(({ node }) => node);
}

export async function getProduct(handle: string): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<{
    productByHandle: ShopifyProduct | null;
  }>(`
    ${PRODUCT_FRAGMENT}
    query Product($handle: String!) {
      productByHandle(handle: $handle) {
        ...ProductFields
      }
    }
  `, { handle });

  return data.productByHandle;
}

export interface ShopifyPolicy {
  title: string;
  body: string;
}

export async function getShopPolicies(): Promise<{
  privacyPolicy: ShopifyPolicy | null;
  shippingPolicy: ShopifyPolicy | null;
  termsOfService: ShopifyPolicy | null;
  refundPolicy: ShopifyPolicy | null;
}> {
  const data = await shopifyFetch<{
    shop: {
      privacyPolicy: ShopifyPolicy | null;
      shippingPolicy: ShopifyPolicy | null;
      termsOfService: ShopifyPolicy | null;
      refundPolicy: ShopifyPolicy | null;
    }
  }>(`
    query {
      shop {
        privacyPolicy { title body }
        shippingPolicy { title body }
        termsOfService { title body }
        refundPolicy { title body }
      }
    }
  `);
  return data.shop;
}

export async function getShopPage(handle: string): Promise<ShopifyPolicy | null> {
  const data = await shopifyFetch<{
    page: ShopifyPolicy | null;
  }>(`
    query getPage($handle: String!) {
      page(handle: $handle) {
        title
        body
      }
    }
  `, { handle });
  return data.page;
}

export async function createCheckout(lineItems: { variantId: string; quantity: number }[]): Promise<string> {
  const data = await shopifyFetch<{
    cartCreate: {
      cart: { checkoutUrl: string };
      userErrors: { message: string }[];
    };
  }>(`
    mutation cartCreate($input: CartInput) {
      cartCreate(input: $input) {
        cart { checkoutUrl }
        userErrors { message }
      }
    }
  `, { 
    input: { 
      lines: lineItems.map(item => ({ merchandiseId: item.variantId, quantity: item.quantity })) 
    } 
  });

  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(data.cartCreate.userErrors.map(e => e.message).join(', '));
  }

  return data.cartCreate.cart.checkoutUrl;
}

export function formatPrice(amount: string, currency = 'CHF'): string {
  return `${currency} ${parseFloat(amount).toFixed(2)}`;
}

export const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
export const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
export const apiVersion = process.env.NEXT_PUBLIC_SHOPIFY_GRAPHQL_API_VERSION || '2024-04';

// Basic Shopify Types
export type ShopifyImage = {
  url: string;
  altText: string | null;
  width: number;
  height: number;
};

export type ShopifyMoneyV2 = {
  amount: string;
  currencyCode: string;
};

export type ShopifyProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyMoneyV2;
  compareAtPrice: ShopifyMoneyV2 | null;
  selectedOptions: {
    name: string;
    value: string;
  }[];
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  featuredImage: ShopifyImage | null;
  images: {
    edges: { node: ShopifyImage }[];
  };
  variants: {
    edges: { node: ShopifyProductVariant }[];
  };
  collections?: {
    edges: { node: { handle: string; title: string } }[];
  };
};

export async function shopifyFetch<T>({
  cache = 'force-cache',
  headers,
  query,
  tags,
  variables
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query: string;
  tags?: string[];
  variables?: any;
}): Promise<{ status: number; body: T } | never> {
  try {
    const result = await fetch(`https://${domain}/api/${apiVersion}/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken!,
        ...headers
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables })
      }),
      cache,
      ...(tags && { next: { tags } })
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body
    };
  } catch (e) {
    console.error('Error in shopifyFetch:', e);
    throw {
      error: e,
      query
    };
  }
}

// Utility to flatten edges
export const removeEdgesAndNodes = (array: any[]) => {
  return array.map((edge) => edge?.node);
};

// --- QUERIES ---

export async function getProducts({ sortKey = 'TITLE', reverse = false, query }: { sortKey?: string; reverse?: boolean; query?: string } = {}): Promise<ShopifyProduct[]> {
  const productsQuery = `
    query getProducts($sortKey: ProductSortKeys, $reverse: Boolean, $query: String) {
      products(sortKey: $sortKey, reverse: $reverse, query: $query, first: 100) {
        edges {
          node {
            id
            handle
            title
            description
            descriptionHtml
            availableForSale
            featuredImage {
              url
              altText
              width
              height
            }
            images(first: 10) {
              edges {
                node {
                  url
                  altText
                  width
                  height
                }
              }
            }
            variants(first: 100) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
            collections(first: 10) {
              edges {
                node {
                  handle
                  title
                }
              }
            }
          }
        }
      }
    }
  `;

  const res = await shopifyFetch<{ data: { products: { edges: { node: ShopifyProduct }[] } } }>({
    query: productsQuery,
    variables: {
      sortKey,
      reverse,
      query
    }
  });

  return removeEdgesAndNodes(res.body.data.products.edges);
}

export async function getProduct(handle: string): Promise<ShopifyProduct | undefined> {
  const productQuery = `
    query getProduct($handle: String!) {
      product(handle: $handle) {
        id
        handle
        title
        description
        descriptionHtml
        availableForSale
        featuredImage {
          url
          altText
          width
          height
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
              width
              height
            }
          }
        }
        variants(first: 100) {
          edges {
            node {
              id
              title
              availableForSale
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  `;

  const res = await shopifyFetch<{ data: { product: ShopifyProduct } }>({
    query: productQuery,
    variables: {
      handle
    }
  });

  return res.body.data.product || undefined;
}

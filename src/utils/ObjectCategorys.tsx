import { supabase } from '@/supabaseClient/supabaseClient.tsx';

export const OBJ_PRODUCTS: Record<string, number> = {
  beauty: 0,
  fragrances: 0,
  laptops: 0,
  'mens-shirts': 0,
  'mens-shoes': 0,
  'mens-watches': 0,
  'mobile-accessories': 10,
  smartphones: 10,
  sunglasses: 0,
  tablets: 0,
  tops: 0,
  'womens-bags': 0,
  'womens-dresses': 0,
  'womens-jewellery': 0,
  'womens-shoes': 0,
  'womens-watches': 0
};

export const getCategoryProductCount = async (category: string): Promise<number> => {
  const { data, error } = await supabase.from('products').select('id', { count: 'exact' }).eq('category', category);

  if (error) {
    console.error('Error fetching category count:', error);
    return 0;
  }

  return data.length;
};

export const updateProductCounts = async () => {
  const updatedProducts: Record<string, number> = { ...OBJ_PRODUCTS };

  for (const category of Object.keys(updatedProducts)) {
    updatedProducts[category] = await getCategoryProductCount(category);
  }

  return updatedProducts;
};

export const stateProductsPagination = (category: string): number => {
  const valueAmount = Number(OBJ_PRODUCTS[category]);

  const resultFloat = valueAmount / 12;
  const result = Math.ceil(resultFloat);
  if (resultFloat < result) {
    return result;
  }

  return 0;
};

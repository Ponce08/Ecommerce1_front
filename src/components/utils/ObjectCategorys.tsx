const OBJ_PRODUCTS: Record<string, number> = {
  beauty: 15,
  fragrances: 42,
  laptops: 55,
  'mens-shirts': 55,
  'mens-shoes': 55,
  'mens-watches': 66,
  'mobile-accessories': 154,
  smartphones: 176,
  sunglasses: 55,
  tablets: 33,
  tops: 55,
  'womens-bags': 55,
  'womens-dresses': 55,
  'womens-jewellery': 33,
  'womens-shoes': 55,
  'womens-watches': 55
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

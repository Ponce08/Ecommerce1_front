const OBJ_PRODUCTS: Record<string, number> = {
  Beauty: 15,
  Fragrances: 42,
  Laptops: 55,
  Mens_shirts: 55,
  Mens_shoes: 55,
  Mens_watches: 66,
  Mobile_accessories: 154,
  Smartphones: 176,
  Sunglasses: 55,
  Tablets: 33,
  Tops: 55,
  Womens_bags: 55,
  Womens_dresses: 55,
  Womens_jewellery: 33,
  Womens_shoes: 55,
  Womens_watches: 55
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

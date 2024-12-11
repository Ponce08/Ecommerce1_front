export type productsState = {
  products: { id: number; title: string; images: [string] }[];
};

export type productsAction = { type: 'GET_PRODUCTS'; payload: { id: number; title: string; images: [string] }[] };

export const initialState: productsState = {
  products: []
};

export function productsReducer(state: productsState, action: productsAction): productsState {
  switch (action.type) {
    case 'GET_PRODUCTS':
      return {
        ...state,
        products: action.payload
      };

    default:
      return state;
  }
}

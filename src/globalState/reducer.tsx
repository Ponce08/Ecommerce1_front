export type UserLogin = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar_url?: string;
};

export type State = {
  isTrue: boolean;
  isTrue_filters: boolean;
  page: number;
  currentPage: number;
  firstPage: number;
  finalPage: number;
  category: string | null;
  priceMin: number | null;
  priceMax: number | null;
  ratingOrder: 'upward' | 'falling' | string;
};

export const initialState: State = {
  isTrue: false,
  isTrue_filters: false,
  page: 1,
  currentPage: 0,
  firstPage: 1,
  finalPage: 85,
  category: null,
  priceMin: null,
  priceMax: null,
  ratingOrder: ''
};

export type Action =
  | { type: 'SET_TRUE' }
  | { type: 'SET_FALSE' }
  | { type: 'SET_TRUE_FILTERS' }
  | { type: 'SET_FALSE_FILTERS' }
  | { type: 'INCREMENT_PAGE' }
  | { type: 'DECREMENT_PAGE' }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SET_CURRENTPAGE'; payload: number }
  | { type: 'SET_FIRSTPAGE'; payload: number }
  | { type: 'SET_FINALPAGE'; payload: number }
  | { type: 'SET_CATEGORY'; payload: string | null }
  | { type: 'SET_MINPRICE'; payload: number | null }
  | { type: 'SET_MAXPRICE'; payload: number | null }
  | { type: 'SET_RATING_ORDER'; payload: 'upward' | 'falling' | string };

// Reducer para manejar el estado
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_TRUE':
      return { ...state, isTrue: true };
    case 'SET_FALSE':
      return { ...state, isTrue: false };
    case 'SET_TRUE_FILTERS':
      return { ...state, isTrue_filters: true };
    case 'SET_FALSE_FILTERS':
      return { ...state, isTrue_filters: false };
    case 'INCREMENT_PAGE':
      return { ...state, page: state.page + 1 };
    case 'DECREMENT_PAGE':
      return { ...state, page: Math.max(1, state.page - 1) };
    case 'SET_PAGE':
      return { ...state, page: action.payload };
    case 'SET_CURRENTPAGE':
      return { ...state, currentPage: action.payload };
    case 'SET_FIRSTPAGE':
      return { ...state, firstPage: action.payload };
    case 'SET_FINALPAGE':
      return { ...state, finalPage: action.payload };
    case 'SET_CATEGORY':
      return { ...state, category: action.payload };
    case 'SET_MINPRICE':
      return { ...state, priceMin: action.payload };
    case 'SET_MAXPRICE':
      return { ...state, priceMax: action.payload };
    case 'SET_RATING_ORDER':
      return { ...state, ratingOrder: action.payload };
    default:
      return state;
  }
};

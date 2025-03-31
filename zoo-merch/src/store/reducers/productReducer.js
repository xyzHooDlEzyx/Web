const initialState = {
  products: [],
  isLoading: false,
  error: null,
  filters: {
    searchQuery: "",
    sortOption: "",
    filterOption: "",
  },
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_PRODUCTS_SUCCESS":
      return { ...state, products: action.payload, isLoading: false };
    case "LOAD_PRODUCTS_ERROR":
      return { ...state, error: action.payload, isLoading: false };
    case "LOAD_PRODUCTS_REQUEST":
      return { ...state, isLoading: true };
    default:
      return state;
  }
};

export default productReducer;

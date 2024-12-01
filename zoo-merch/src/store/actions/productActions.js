import { fetchProducts } from "../../../api/productsApi";

export const loadProducts =
  (searchQuery = "", sortOption = "", filterOption = "") =>
  async (dispatch) => {
    try {
      const products = await fetchProducts(
        searchQuery,
        sortOption,
        filterOption
      );
      dispatch({ type: "LOAD_PRODUCTS_SUCCESS", payload: products });
    } catch (error) {
      dispatch({ type: "LOAD_PRODUCTS_ERROR", payload: error.message });
    }
  };

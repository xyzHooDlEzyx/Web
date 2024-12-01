import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productReducer";
import cartReducer from "./reducers/cartReducer";
import filtersReducer from "./reducers/filtersReducer";

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    filters: filtersReducer,
  },
});

export default store;

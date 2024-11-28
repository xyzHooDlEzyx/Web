const initialState = {
  items: JSON.parse(localStorage.getItem("cart")) || [],
};

const cartReducer = (state = initialState, action) => {
  let updatedItems;

  switch (action.type) {
    case "ADD_TO_CART":
      updatedItems = [...state.items, action.payload];
      localStorage.setItem("cart", JSON.stringify(updatedItems));
      return { ...state, items: updatedItems };

    case "UPDATE_ITEM_QUANTITY":
      updatedItems = state.items.map((item) =>
        item.id === action.payload.id && item.size === action.payload.size
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedItems));
      return { ...state, items: updatedItems };

    case "REMOVE_FROM_CART":
      updatedItems = state.items.filter(
        (item) =>
          !(item.id === action.payload.id && item.size === action.payload.size)
      );
      localStorage.setItem("cart", JSON.stringify(updatedItems));
      return { ...state, items: updatedItems };

    case "CLEAR_CART":
      localStorage.removeItem("cart");
      return { ...state, items: [] };

    default:
      return state;
  }
};

export default cartReducer;

const initialState = {
  items:
    JSON.parse(
      localStorage.getItem(`cart_${localStorage.getItem("userId")}`)
    ) || [],
};

const cartReducer = (state = initialState, action) => {
  let updatedItems;
  const userId = localStorage.getItem("userId");

  switch (action.type) {
    case "ADD_TO_CART":
      updatedItems = [...state.items, action.payload];
      localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedItems));
      return { ...state, items: updatedItems };

    case "UPDATE_ITEM_QUANTITY":
      updatedItems = state.items.map((item) =>
        item.id === action.payload.id && item.size === action.payload.size
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedItems));
      return { ...state, items: updatedItems };

    case "REMOVE_FROM_CART":
      updatedItems = state.items.filter(
        (item) =>
          !(item.id === action.payload.id && item.size === action.payload.size)
      );
      localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedItems));
      return { ...state, items: updatedItems };

    case "CLEAR_CART":
      localStorage.removeItem(`cart_${userId}`);
      return { ...state, items: [] };

    default:
      return state;
  }
};

export default cartReducer;

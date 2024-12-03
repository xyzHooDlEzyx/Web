import { getTokenPayload, getUserIdFromToken } from "../actions/cartActions";

const initialState = {
  items: [],
};

const cartReducer = (state = initialState, action) => {
  let updatedItems;
  const userId = getUserIdFromToken();
  const encodedPayload = getTokenPayload();

  if (!encodedPayload || !userId) return state;

  const cartKey = `cart_${encodedPayload}`;

  const storedCart = localStorage.getItem(cartKey);
  if (storedCart) {
    state.items = JSON.parse(storedCart);
  }

  switch (action.type) {
    case "ADD_TO_CART":
      updatedItems = [...state.items, action.payload];
      localStorage.setItem(cartKey, JSON.stringify(updatedItems));
      return { ...state, items: updatedItems };

    case "UPDATE_ITEM_QUANTITY":
      updatedItems = state.items.map((item) =>
        item.id === action.payload.id && item.size === action.payload.size
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      localStorage.setItem(cartKey, JSON.stringify(updatedItems));
      return { ...state, items: updatedItems };

    case "REMOVE_FROM_CART":
      updatedItems = state.items.filter(
        (item) =>
          !(item.id === action.payload.id && item.size === action.payload.size)
      );
      localStorage.setItem(cartKey, JSON.stringify(updatedItems));
      return { ...state, items: updatedItems };

    case "CLEAR_CART":
      localStorage.removeItem(cartKey);
      return { ...state, items: [] };

    default:
      return state;
  }
};

export default cartReducer;

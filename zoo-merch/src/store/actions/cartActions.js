export const addToCart = (item, quantity) => (dispatch, getState) => {
  const userId = localStorage.getItem("userId");
  const existingItem = getState().cart.items.find(
    (cartItem) => cartItem.id === item.id && cartItem.size === item.size
  );

  if (existingItem) {
    dispatch({
      type: "UPDATE_ITEM_QUANTITY",
      payload: {
        id: item.id,
        size: item.size,
        quantity: existingItem.quantity + quantity,
      },
    });
  } else {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...item, quantity, size: item.size },
    });
  }
};

export const removeFromCart = (id, size) => {
  const userId = localStorage.getItem("userId");
  return {
    type: "REMOVE_FROM_CART",
    payload: { id, size },
  };
};

export const clearCart = () => {
  const userId = localStorage.getItem("userId");
  return {
    type: "CLEAR_CART",
  };
};

export const updateItemQuantity =
  (id, size, quantity) => (dispatch, getState) => {
    dispatch({
      type: "UPDATE_ITEM_QUANTITY",
      payload: { id, size, quantity },
    });
  };

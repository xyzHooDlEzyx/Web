export const addToCart = (item, quantity) => (dispatch, getState) => {
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

export const removeFromCart = (id, size) => ({
  type: "REMOVE_FROM_CART",
  payload: { id, size },
});

export const clearCart = () => ({
  type: "CLEAR_CART",
});

export const updateItemQuantity =
  (id, size, quantity) => (dispatch, getState) => {
    const existingItem = getState().cart.items.find(
      (cartItem) => cartItem.id === id && cartItem.size === size
    );

    if (existingItem) {
      dispatch({
        type: "UPDATE_ITEM_QUANTITY",
        payload: { id, size, quantity },
      });
    }
  };

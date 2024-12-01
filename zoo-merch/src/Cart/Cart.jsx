import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  clearCart,
  updateItemQuantity,
} from "../store/actions/cartActions";
import { useNavigate } from "react-router-dom";
import Button from "../button/button";
import "./cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);

  useEffect(() => {
    const reload = () => {
      window.location.reload();
    };

    return () => {
      reload;
    };
  }, []);

  const handleRemove = (id, size) => {
    dispatch(removeFromCart(id, size));
  };

  const handleIncrement = (id, size, quantity) => {
    dispatch(updateItemQuantity(id, size, quantity + 1));
  };

  const handleDecrement = (id, size, quantity) => {
    if (quantity > 1) {
      dispatch(updateItemQuantity(id, size, quantity - 1));
    } else {
      handleRemove(id, size);
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleProceedToCheckout = () => {
    navigate("/checkout");
  };

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <section className="cart-page">
      <h2>Your Cart</h2>
      {items.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty</p>
      ) : (
        <ul className="cart-list">
          {items.map((item) => (
            <li key={item.id + item.size} className="cart-item">
              <img
                src={item.imgSrc}
                alt={item.title}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <span className="cart-item-title">{item.title}</span>
                <span className="cart-item-size">({item.size})</span>
                <span className="cart-item-price"> {item.price}$</span>

                <div className="cart-item-quantity">
                  <Button
                    type="outline"
                    onClick={() =>
                      handleDecrement(item.id, item.size, item.quantity)
                    }
                    color="decrement"
                  >
                    -
                  </Button>
                  <span> {item.quantity} </span>
                  <Button
                    type="outline"
                    onClick={() =>
                      handleIncrement(item.id, item.size, item.quantity)
                    }
                    color="increment"
                  >
                    +
                  </Button>
                </div>

                <span className="cart-item-total">
                  {parseFloat(item.price * item.quantity).toFixed(2)}$
                </span>
              </div>
              <Button
                type="outline"
                onClick={() => handleRemove(item.id, item.size)}
                color="remove"
              >
                Remove
              </Button>
            </li>
          ))}
        </ul>
      )}

      {items.length > 0 && (
        <div className="cart-summary">
          <div className="total-price">
            <span>Total Price: </span>
            <span className="total-price-amount">${totalPrice.toFixed(2)}</span>
          </div>
          <div className="comp">
            <Button type="outline" onClick={handleClearCart} color="clear">
              Clear Cart
            </Button>

            <Button type="solid" onClick={handleProceedToCheckout}>
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;

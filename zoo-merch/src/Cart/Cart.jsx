import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, clearCart } from "../store/actions/cartActions";
import Button from "../button/button";
import "./cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  const checkIfItemExists = (item, selectedSize) => {
    return items.find(
      (cartItem) => cartItem.id === item.id && cartItem.size === selectedSize
    );
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity, // Обчислюємо суму для кожного товару
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
            <li key={item.id} className="cart-item">
              <img
                src={item.imgSrc}
                alt={item.title}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <span className="cart-item-title">{item.title}</span>
                <span className="cart-item-size">({item.size})</span>
                <span className="cart-item-price">
                  {item.price}$ {/* Ціна одинична */}
                </span>
                <span className="cart-item-quantity"> x {item.quantity}</span>
                <span className="cart-item-total">
                  {parseFloat(item.price * item.quantity).toFixed(2)}$
                </span>
              </div>
              <Button
                type="outline"
                onClick={() => handleRemove(item.id)}
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
          <Button type="outline" onClick={handleClearCart} color="clear">
            Clear Cart
          </Button>
        </div>
      )}
    </section>
  );
};

export default Cart;

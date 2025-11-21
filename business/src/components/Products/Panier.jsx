// src/Panier/Panier.js
import React, { useState, useEffect } from "react";
import "./Panier.css";
import { FaTrashAlt, FaEdit, FaPlus, FaMinus } from "react-icons/fa";

const Panier = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = sessionStorage.getItem("cart");
    if (storedCart) {
      const parsed = JSON.parse(storedCart);
      // Ajouter quantity si pas présente (rétrocompatibilité)
      const updated = parsed.map(item => ({ ...item, quantity: item.quantity || 1 }));
      setCart(updated);
      sessionStorage.setItem("cart", JSON.stringify(updated));
    }
  }, []);

  // Mettre à jour sessionStorage à chaque changement
  useEffect(() => {
    if (cart.length > 0) {
      sessionStorage.setItem("cart", JSON.stringify(cart));
      sessionStorage.setItem("cartCount", cart.reduce((acc, item) => acc + item.quantity, 0));
    } else {
      sessionStorage.removeItem("cart");
      sessionStorage.setItem("cartCount", "0");
    }
  }, [cart]);

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    const updated = [...cart];
    updated[index].quantity = newQuantity;
    setCart(updated);
  };

  const removeFromCart = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalPrice = cart.reduce((acc, item) => acc + (parseFloat(item.price) || 0) * item.quantity, 0).toFixed(2);

  if (cart.length === 0) {
    return (
      <div className="panier-page empty">
        <div className="empty-cart">
          <i className="fas fa-shopping-cart fa-5x text-muted mb-4"></i>
          <h3>Votre panier est vide</h3>
          <p>Ajoutez des produits pour commencer vos achats !</p>
        </div>
      </div>
    );
  }

  return (
    <div className="panier-page">
      <div className="panier-container">
        <h2 className="panier-title">
          <i className="fas fa-shopping-cart me-3"></i>
          Mon Panier ({cart.reduce((acc, item) => acc + item.quantity, 0)} articles)
        </h2>

        <ul className="cart-list">
          {cart.map((item, index) => (
            <li key={index} className="cart-item">
              <img src={item.image || "/placeholder.jpg"} alt={item.name} className="item-image" />

              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="item-price">{item.price} €</p>
              </div>

              {/* Quantité */}
              <div className="quantity-controls">
                <button onClick={() => updateQuantity(index, item.quantity - 1)} className="qty-btn">
                  <FaMinus />
                </button>
                <span className="quantity">{item.quantity}</span>
                <button onClick={() => updateQuantity(index, item.quantity + 1)} className="qty-btn">
                  <FaPlus />
                </button>
              </div>

              {/* Actions */}
              <div className="item-actions">
                <button
                  onClick={() => removeFromCart(index)}
                  className="action-btn delete-btn"
                  title="Supprimer"
                >
                  <FaTrashAlt />
                </button>
              </div>

              <div className="item-total">
                {(parseFloat(item.price) * item.quantity).toFixed(2)} €
              </div>
            </li>
          ))}
        </ul>

        <div className="cart-summary">
          <div className="total-section">
            <span>Total :</span>
            <strong>{totalPrice} €</strong>
          </div>

          <div className="cart-actions">
            <button className="clear-cart-btn" onClick={clearCart}>
              <FaTrashAlt className="me-2" />
              Vider le panier
            </button>
            <button className="checkout-btn">
              Valider la commande
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panier;
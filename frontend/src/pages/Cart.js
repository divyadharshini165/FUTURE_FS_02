import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Cart() {
  const {
    cartItems,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart
  } = useCart();

  const { user } = useAuth();
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const proceedToPayment = () => {
    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    const newOrder = {
      id: Date.now(),
      items: cartItems,
      total: Math.round(total * 80),
      date: new Date().toLocaleString()
    };

    const existingOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    localStorage.setItem(
      "orders",
      JSON.stringify([newOrder, ...existingOrders])
    );

    alert("✅ Payment Successful!");
    clearCart();
    navigate("/orders");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ textAlign: "center" }}>🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p style={{ textAlign: "center" }}>Cart is empty</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: "1px solid #ddd",
                padding: "15px",
                margin: "15px 0",
                borderRadius: "8px"
              }}
            >
              <img src={item.image} alt="" width="80" />

              <div style={{ flex: 1, marginLeft: "15px" }}>
                <h4>{item.title}</h4>
                <p>₹{Math.round(item.price * 80)}</p>

                <div>
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span style={{ margin: "0 10px" }}>{item.qty}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  background: "red",
                  color: "#fff",
                  border: "none",
                  padding: "8px 12px",
                  cursor: "pointer"
                }}
              >
                Remove
              </button>
            </div>
          ))}

          <h3 style={{ textAlign: "right" }}>
            Total: ₹{Math.round(total * 80)}
          </h3>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button
              onClick={proceedToPayment}
              style={{
                padding: "12px 25px",
                fontSize: "16px",
                background: "green",
                color: "#fff",
                border: "none",
                cursor: "pointer"
              }}
            >
              Proceed to Payment
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;

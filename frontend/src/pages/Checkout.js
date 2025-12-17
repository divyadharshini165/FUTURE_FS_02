import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./context/CartContext";
import { useAuth } from "./context/AuthContext";

function Checkout() {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const placeOrder = () => {
    const orders =
      JSON.parse(localStorage.getItem("orders")) || [];

    orders.push({
      user: user.email,
      items: cartItems,
      date: new Date().toLocaleString()
    });

    localStorage.setItem("orders", JSON.stringify(orders));

    clearCart(); // ✅ CORRECT
    navigate("/orders");
  };

  if (!user) return null;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">
        Confirm Order
      </h2>

      <button
        onClick={placeOrder}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        Place Order
      </button>
    </div>
  );
}

export default Checkout;

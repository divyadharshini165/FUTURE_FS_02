import React, { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ textAlign: "center" }}>📦 My Orders</h2>

      {orders.length === 0 ? (
        <p style={{ textAlign: "center" }}>No orders yet</p>
      ) : (
        orders.map(order => (
          <div
            key={order.id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              margin: "20px 0",
              borderRadius: "8px"
            }}
          >
            <p><strong>Order Date:</strong> {order.date}</p>
            <p><strong>Total:</strong> ₹{order.total}</p>

            <hr />

            {order.items.map(item => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px"
                }}
              >
                <img src={item.image} alt="" width="60" />

                <div style={{ marginLeft: "15px" }}>
                  <h4>{item.title}</h4>
                  <p>
                    Qty: {item.qty} | Price: ₹
                    {Math.round(item.price * 80)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;

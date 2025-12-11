 import React, { useState, useEffect } from "react";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:8082/api/orders"); // ✅ Correct port
        if (!res.ok) throw new Error("Failed to fetch orders");

        const data = await res.json();

        // Make sure items is always an array and total is a number
        const formatted = data.map((order) => ({
          ...order,
          items: Array.isArray(order.items) ? order.items : [],
          total: Number(order.total || 0),
        }));

        setOrders(formatted);
      } catch (err) {
        console.error("API Error:", err);
        setError("Error fetching order history");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="orders-grid">
      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order.id}>
            <h3>Order #{order.id}</h3>
            <p><strong>Name:</strong> {order.customer_name}</p>
            <p><strong>Total:</strong> ₱{order.total.toFixed(2)}</p>
            <p><strong>Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
            <h4>Items:</h4>
            <ul>
              {order.items.length === 0 ? (
                <li>No items</li>
              ) : (
                order.items.map((item, index) => (
                  <li key={index}>
                    {item.name || item.title || "Unnamed Product"} - ₱{Number(item.price || item.total || 0).toFixed(2)}
                  </li>
                ))
              )}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
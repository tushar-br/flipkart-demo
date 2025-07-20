import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3000/api/order/admin")
      .then(res => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch orders", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="container mt-5">Loading orders...</div>;

  const handleStatusChange = (orderId, newStatus) => {
    axios.put(`http://localhost:3000/api/order/${orderId}/status`, { status: newStatus })
      .then(res => {
        // Update the order list locally
        setOrders(prev =>
          prev.map(order =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      })
      .catch(err => {
        console.error("Failed to update order status", err);
      });
  };

  return (
    <div className="container mt-5">
      <h2>All Orders (Admin View)</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map(order => (
          <div key={order._id} className="card mb-4 p-3">
            <h5>Order #{order._id.slice(-5)}</h5>
            <p><strong>User:</strong> {order.userId?.name || "N/A"} ({order.userId?.email || "N/A"})</p>
            <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
            <p><strong>Status:</strong>
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                className="form-select d-inline w-auto ms-2"
              >
                <option>Pending</option>
                <option>Processing</option>
                <option>Shipped</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
            </p>

            <p><strong>Paid:</strong> {order.isPaid ? "Yes" : "No"}</p>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            <div>
              <strong>Items:</strong>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.productId?.name} × {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminOrder;

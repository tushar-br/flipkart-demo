import { useEffect, useState } from "react";
import axios from "axios";

function OrderPage() {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
  axios.get(`http://localhost:3000/api/order/user/${userId}`)
    .then(res => setOrders(res.data))
    .catch(err => console.error(err));
}, []);


  console.log("orders =====> ",orders);
  
  return (
    <div className="container">
      <h2>Your Orders</h2>
    {orders.length === 0 ? (
  <p>No orders found.</p>
) : (
  orders.map(order => (
    <div key={order._id} className="order card p-3 mb-3">
      <h5>Order #{order._id.slice(-5)} - ₹{order.totalAmount} - {order.status}</h5>
      <ul>
        {order.items.map(item => (
          <li key={item._id}>
            {item.productId?.name} × {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  ))
)}

    </div>
  );
}

export default OrderPage;

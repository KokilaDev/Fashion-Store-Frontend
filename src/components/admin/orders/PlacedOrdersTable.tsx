import { useEffect, useState } from "react";
import "../../../styles/order.css";
import { getAllOrdersApi } from "../../../api/orderApi";
import "../../../styles/order.css";
import { useNavigate } from "react-router-dom";

const PlacedOrdersTable = () => {

    const navigate = useNavigate();

    const [orders, setOrders] = useState<any[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getAllOrdersApi();

                const placedOrders = response.orders.filter(
                    (order: any) => order.status !== "Delivered"
                );

                setOrders(placedOrders);

            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="orders-table-container">
            <h2 className="orders-title">Placed Orders</h2>

            <div className="orders-content">
                <table className="order-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer Name</th>
                            <th>Order Date</th>
                            <th>Items Count</th>
                            <th>Total Amount</th>
                            <th>Payment Method</th>
                            <th>Order Status</th>
                            <th>Shipping Address</th>
                            <th>Contact Number</th>
                            <th>View</th>
                            <th>Update Status</th>
                        </tr>
                    </thead>
                    <tbody className="placed-orders-tbody">
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order.orderId}</td>
                                <td>{order.billingDetails.fullName}</td>
                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td>{order.items.length}</td>
                                <td>Rs. {order.total}</td>
                                <td>{order.paymentMethod}</td>
                                <td>
                                    {order.status === "Paid" 
                                        ? "Paid" 
                                        : "Pending"}
                                </td>
                                <td>
                                    {order.shippingDetails.address}
                                </td>
                                <td>{order.billingDetails.phone}</td>
                                <td>
                                    <button 
                                        className="view-btn"
                                        onClick={() => navigate(`/orders/${order._id}`)}
                                    >
                                        View
                                    </button>
                                </td>
                                <td>
                                    <button className="update-status-btn">Update Status</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PlacedOrdersTable;
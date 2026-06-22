import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../../components/layouts/BackButton";
// import { getOrderByIdApi } from "../../api/orderApi";

const ViewOrderDetails = () => {
    const { id } = useParams();

    const [order, setOrder] = useState<any>(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                setOrder({
                    _id: id,
                    customerName: "Kokila Dewmini",
                    createdAt: "2026-06-21",
                    paymentMethod: "Credit Card",
                    total: 2500,
                    items: [
                        {
                            productName: "Product 1",
                            size: "Medium",
                            quantity: 2,
                            price: 100,
                        },
                        {
                            productName: "Product 2",
                            size: "Large",
                            quantity: 1,
                            price: 200,
                        },
                    ],
                });
            } catch (error) {
                console.error("Error loading order:", error);
            }
        };

        fetchOrder();
    }, [id]);

    if (!order) {
        return <h3>Loading...</h3>;
    }

    return (
        <div className="view-order-container">
            <div className="view-order-header">
                <BackButton />
                <h2 className="view-order-title">Order Details</h2>
            </div>

            <div className="view-order-content">
                <p>
                    <strong>Order ID:</strong> {order._id}
                </p>

                <p>
                    <strong>Customer:</strong> {order.customerName}
                </p>

                <p>
                    <strong>Date:</strong>{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                </p>

                <div>
                    <strong>Item Details:</strong>

                    <table className="item-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Size</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>

                        <tbody>
                            {order.items.map((item: any, index: number) => (
                                <tr key={index}>
                                    <td>{item.productName}</td>
                                    <td>{item.size}</td>
                                    <td>{item.quantity}</td>
                                    <td>${item.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <p>
                    <strong>Payment Method:</strong>{" "}
                    {order.paymentMethod}
                </p>

                <p>
                    <strong>Total:</strong> ${order.total}
                </p>
            </div>
        </div>
    );
};

export default ViewOrderDetails;
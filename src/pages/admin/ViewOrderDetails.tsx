import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../../components/layouts/BackButton";
import { getOrderByIdApi } from "../../api/orderApi";

const ViewOrderDetails = () => {
    const { id } = useParams();

    const [order, setOrder] = useState<any>(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await getOrderByIdApi(id!);
                setOrder(response);
            } catch (error) {
                console.error("Error loading order:", error);
            }
        };

        fetchOrder();
    }, [id]);

    if (!order) {
        return <h3>Loading...</h3>;
    }

    console.log("Order Details:", order);

    return (
        <div className="box-container">
            <div className="view-order-container">
                <div className="view-order-header">
                    <BackButton />
                    <h2 className="view-order-title">Order Details</h2>
                </div>

                <div className="view-order-content">
                    <div className="order-content">
                        <div className="order-information">
                            <div className="order-info">
                                <h6>Order ID: </h6>
                                <p>{order.orderId}</p>
                            </div>
                            
                            <div className="order-info">
                                <h6>Order Date: </h6>
                                <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>

                        <div className="order-information">
                            <div className="order-info">
                                <h6>Customer Name: </h6>
                                <p>{order.billingDetails.fullName}</p>
                            </div>

                            <div className="order-info">
                                <h6>Contact Number: </h6>
                                <p>{order.billingDetails.phone}</p>
                            </div>
                        </div>

                        <div className="order-information">
                            <div className="order-info">
                                <h6>Total Amount: </h6>
                                <p>Rs. {order.total}</p>
                            </div>

                            <div className="order-info">
                                <h6>Payment Method: </h6>
                                <p>{order.paymentMethod}</p>
                            </div>
                        </div>

                        <div className="shipping-information">
                            <div className="order-info">
                                <h6>Shipping Address: </h6>
                                <p>{order.shippingDetails.address}</p>
                            </div>

                            <div className="shipping-info">
                                <div className="order-info">
                                    <h6>District: </h6>
                                    <p>{order.shippingDetails.district}</p>
                                </div>

                                <div className="order-info">
                                    <h6>Postal Code: </h6>
                                    <p>{order.shippingDetails.postalCode}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="order-content">
                        <h4 className="order-detail-table">Item Details:</h4>
                        <table className="item-table">
                            <thead>
                                <tr>
                                    <th>Product ID</th>
                                    <th>Size</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.items.map((item: any, index: number) => (
                                    <tr key={index}>
                                        <td>{item.productId}</td>
                                        <td>{item.size}</td>
                                        <td>{item.qty}</td>
                                        <td>Rs. {item.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewOrderDetails;
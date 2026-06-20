import { useNavigate } from "react-router-dom";

type Props = {
    orderId: string;
    total: number;
}

const OrderConfirmation = ({ orderId, total }: Props) => {

    const navigate = useNavigate();

    return (
        <div className="order-confirmation">

            <div className="confimation-icon">
                <i className="fa-solid fa-circle-check"></i>
            </div>

            <h2>Order Confirmed!</h2>

            <p>Thank you for your purchase!</p>

            <div className="order-details">
                <p><strong>Order ID:</strong> {orderId}</p>
                <p><strong>Total Amount:</strong> Rs. {total}</p>
            </div>

            <div className="confirmation-actions">
                <button 
                    className="continue-shopping-btn"
                    onClick={() => navigate("/products")}
                >
                    Continue Shopping
                </button>
                <button 
                    className="view-orders-btn"
                    onClick={() => navigate("/orders")}
                >
                    View Orders
                </button>
            </div>

        </div>
    )

}

export default OrderConfirmation;
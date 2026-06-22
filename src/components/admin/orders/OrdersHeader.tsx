import BackButton from "../../layouts/BackButton";
import "../../../styles/order.css";

const OrdersHeader = () => {
    return (
        <div className="orders-header">
            <BackButton />

            <h1 className="order-title">Manage Orders</h1>
        </div>
    );
};

export default OrdersHeader;
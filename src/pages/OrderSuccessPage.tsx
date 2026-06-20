import { useLocation } from "react-router-dom";
import OrderConfirmation from "../components/checkout/OrderConfirmation";

const OrderSuccessPage = () => {
    const { state } = useLocation();

    return (
        <OrderConfirmation 
            orderId={state.orderId}
            total={state.total}
        />
    )
}

export default OrderSuccessPage;
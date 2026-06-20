import { useLocation } from "react-router-dom";
import CheckoutForm from "../components/checkout/CheckoutForm";
import OrderSummary from "../components/checkout/OrderSummary";
import BackButton from "../components/layouts/BackButton";
import "../styles/checkout.css";    

const Checkout = () => {
    const { state } = useLocation();
    
    return (
        <div className="box-container">

            <div className="checkout-container">

                <div className="checkout-header">
                    <BackButton />
                    <h1>Checkout</h1>
                </div>

                <div className="checkout-page">

                    <CheckoutForm 
                        userId={state.userId}
                    />

                    <OrderSummary 
                        items={state.items}
                        total={state.total}
                    />

                </div>

                <div className="checkout-actions">
                    <button className="place-order-btn">
                        Place Order
                    </button>
                    <button className="cancel-order-btn">
                        Cancel
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Checkout;
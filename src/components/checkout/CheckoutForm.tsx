import BillingDetails from "./BillingDetails"
import PaymentMethod from "./PaymentMethod"
import ShippingDetails from "./ShippingDetails"
import "../../styles/checkout.css"

const CheckoutForm = ({ userId }: any) => {

    console.log("CheckoutForm userId:", userId);
    
    return (
        <div className="checkout-form">

            <BillingDetails />

            <ShippingDetails />

            <PaymentMethod />

        </div>
    )
}

export default CheckoutForm
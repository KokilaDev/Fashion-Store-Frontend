import BillingDetails from "./BillingDetails"
import PaymentMethod from "./PaymentMethod"
import ShippingDetails from "./ShippingDetails"
import "../../styles/checkout.css"

const CheckoutForm = ({ userId, checkoutData, setCheckoutData }: any) => {

    console.log("CheckoutForm userId:", userId);
    
    return (
        <div className="checkout-form">

            <BillingDetails 
                checkoutData={checkoutData}
                setCheckoutData={setCheckoutData}
            />

            <ShippingDetails 
                checkoutData={checkoutData}
                setCheckoutData={setCheckoutData}
            />

            <PaymentMethod 
                checkoutData={checkoutData}
                setCheckoutData={setCheckoutData}
            />

        </div>
    )
}

export default CheckoutForm
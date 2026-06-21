import { useLocation } from "react-router-dom";
import CheckoutForm from "../components/checkout/CheckoutForm";
import OrderSummary from "../components/checkout/OrderSummary";
import BackButton from "../components/layouts/BackButton";
import "../styles/checkout.css";    
import { useState } from "react";
import { placeOrderApi } from "../api/orderApi";

const Checkout = () => {
    const { state } = useLocation();

    const [checkoutData, setCheckoutData] = useState({
        billingDetails: {
            fullName: "",
            email: "",
            phone: "",
        },
        shippingDetails: {
            address: "",
            district: "",
            postalCode: "",
        },
        paymentMethod: "COD",
        coupon: null as null | {
            code: string;
            discount: number;
        },
    });

    console.log("Location State:", state);

    const discountAmount = checkoutData.coupon
        ? (state.total * checkoutData.coupon.discount) / 100
        : 0;

    const finalTotal = state.total - discountAmount;

    const handlePlaceOrder = async () => {
        try {
            const orderData = {    
                userId: state.userId,

                billingDetails: checkoutData.billingDetails,

                shippingDetails: checkoutData.shippingDetails,

                paymentMethod: checkoutData.paymentMethod,

                coupon: checkoutData.coupon,

                items: state.items,

                subtotal: state.total,

                discountAmount: 
                    checkoutData.coupon
                        ? (state.total * 
                            checkoutData.coupon.discount) /
                        100
                        : 0,

                total:
                    checkoutData.coupon
                        ? state.total - 
                        (state.total * 
                            checkoutData.coupon.discount) / 
                            100
                        : state.total,

                status: "Pending",
            };

            if (!checkoutData.billingDetails.fullName) {
                return alert("Full Name Required");
            }

            if (!checkoutData.shippingDetails.address) {
                return alert("Address Required");
            }

            const response = await placeOrderApi(orderData);
            console.log("Order placed successfully:", response);

        } catch (error) {
            console.error("Error placing order:", error);
        }
    }
    
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
                        checkoutData={checkoutData}
                        setCheckoutData={setCheckoutData}
                    />

                    <OrderSummary 
                        items={state.items}
                        total={state.total}
                        coupon={checkoutData.coupon}
                        discount={discountAmount}
                        finalTotal={finalTotal}
                    />

                </div>

                <div className="checkout-actions">
                    <button className="place-order-btn" onClick={handlePlaceOrder}>
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
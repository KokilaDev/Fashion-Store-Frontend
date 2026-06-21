import PaymentForm from "./PaymentForm";

const PaymentMethod = ({
    checkoutData,
    setCheckoutData,
}: any) => {

    return (
        <div className="payment-method">
            <h3>Payment Method</h3>

            <div className="payment-info">
                <label className="payment-option">
                    <input 
                        type="radio"
                        checked={checkoutData.paymentMethod === "COD"} 
                        onChange={() => 
                            setCheckoutData({
                                ...checkoutData,
                                paymentMethod: "COD",
                            })
                        } 
                    />
                    Cash on Delivery
                </label>

                <label className="payment-option">
                    <input 
                        type="radio" 
                        checked={checkoutData.paymentMethod === "CARD"} 
                        onChange={() => 
                            setCheckoutData({
                                ...checkoutData,
                                paymentMethod: "CARD",
                            })
                        } 
                    />
                    Card Payment
                </label>
            </div>

            <div className="payment-description">
                {checkoutData.paymentMethod === "CARD" && (
                    <PaymentForm />
                )}
            </div>
            
        </div>
    )
}

export default PaymentMethod;
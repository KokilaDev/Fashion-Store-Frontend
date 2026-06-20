import { useState } from "react";
import PaymentForm from "./PaymentForm";

const PaymentMethod = () => {
    const [method, setMethod] = useState("COD");

    return (
        <div className="payment-method">
            <h3>Payment Method</h3>

            <div className="payment-info">
                <label className="payment-option">
                    <input 
                        type="radio"
                        checked={method === "COD"} 
                        onChange={() => setMethod("COD")} 
                    />
                    Cash on Delivery
                </label>

                <label className="payment-option">
                    <input 
                        type="radio" 
                        checked={method === "CARD"} 
                        onChange={() => setMethod("CARD")} 
                    />
                    Card Payment
                </label>
            </div>

            <div className="payment-description">
                {method === "CARD" && <PaymentForm />}
            </div>
            
        </div>
    )
}

export default PaymentMethod;
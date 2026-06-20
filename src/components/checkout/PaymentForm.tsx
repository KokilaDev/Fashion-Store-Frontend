import "../../styles/checkout.css";
import { useRef } from "react";

const PaymentForm = () => {
    const input1Ref = useRef<HTMLInputElement>(null);
    const input2Ref = useRef<HTMLInputElement>(null);
    const input3Ref = useRef<HTMLInputElement>(null);
    const input4Ref = useRef<HTMLInputElement>(null);

    const handleCardInput = (
        e: React.ChangeEvent<HTMLInputElement>,
        nextRef?: React.RefObject<HTMLInputElement | null>
    ) => {

        if (e.target.value.length === 4) {
            nextRef?.current?.focus();
        }

    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        prevRef?: React.RefObject<HTMLInputElement | null>
    ) => {

        if (
            e.key === "Backspace" &&
            e.currentTarget.value === ""
        ) {
            prevRef?.current?.focus();
        }

    };

    return (
        <div className="payment-form">
            <div className="card-preview">

                <div className="card-top">
                    <input 
                        type="text" 
                        placeholder="Visa" 
                        className="payment-form-control card-type" 
                    />
                    <input 
                        type="text" 
                        placeholder="Bank Name" 
                        className="payment-form-control bank-name" 
                    />
                </div>

                <div className="card-row">
                    <div className="card-chip"></div>
                </div>

                <div className="card-number">
                    <input
                        ref={input1Ref}
                        type="text"
                        maxLength={4}
                        placeholder="****"
                        className="payment-form-control card-box"
                        onChange={(e) => handleCardInput(e, input2Ref)}
                    />

                    <input
                        ref={input2Ref}
                        type="text"
                        maxLength={4}
                        placeholder="****"
                        className="payment-form-control card-box"
                        onChange={(e) => handleCardInput(e, input3Ref)}
                        onKeyDown={(e) => handleKeyDown(e, input1Ref)}
                    />

                    <input
                        ref={input3Ref}
                        type="text"
                        maxLength={4}
                        placeholder="****"
                        className="payment-form-control card-box"
                        onChange={(e) => handleCardInput(e, input4Ref)}
                        onKeyDown={(e) => handleKeyDown(e, input2Ref)}
                    />
                    
                    <input
                        ref={input4Ref}
                        type="text"
                        maxLength={4}
                        placeholder="****"
                        className="payment-form-control card-box"
                        onKeyDown={(e) => handleKeyDown(e, input3Ref)}
                    /> 
                </div>

                <div className="card-bottom">
                    <div className="card-holder">
                        <input 
                            type="text" 
                            placeholder="Cardholder Name" 
                            className="payment-form-control" 
                        />
                    </div>

                    <div className="right-side">
                        <div className="card-expiry">
                            <input 
                                type="text" 
                                placeholder="(MM/YY)" 
                                className="payment-form-control" 
                            />
                        </div>

                        <div className="cvv-input">
                            <input 
                                type="text" 
                                placeholder="CVV" 
                                className="payment-form-control" 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentForm;
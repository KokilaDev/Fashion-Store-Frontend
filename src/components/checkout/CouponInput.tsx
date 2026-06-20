import { useState } from "react";

const CouponInput = () => {
    const [coupon, setCoupon] = useState("");

    return (
        <div className="coupon-input">
            
            <div className="coupon-control">
                Coupon Code
                <input 
                    type="text" 
                    placeholder="ex: FASHION10"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="coupon-form-control" 
                />
            </div>

            <button className="apply-coupon-btn">
                Apply
            </button>

        </div>
    )
}

export default CouponInput
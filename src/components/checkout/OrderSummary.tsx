import CouponCard from "./CouponCard"
import CouponInput from "./CouponInput"

const OrderSummary = ({ items, total }: any) => {
    const appliedCoupon = {
        code: "FASHION10",
        discount: 10
    }

    return (
        <div className="order-summary">

            <h2>Order Summary</h2>

            {
                items.map((item: any) => (
                    <div key={item._id} className="order-item">
                        <span className="item-name">{item.name}</span>
                        <span className="item-qty">Qty: {item.qty}</span>
                        <span className="item-price">Rs. {item.price * item.qty}</span>
                    </div>
                ))
            }

            <CouponInput />

            {appliedCoupon && (
                <CouponCard
                    code={appliedCoupon.code}
                    discount={appliedCoupon.discount}
                />
            )}

            <div className="order-total">
                <span>Total:</span>
                <span>Rs. {total}</span>
            </div>

        </div>
    )
}

export default OrderSummary
import CouponCard from "./CouponCard"

const OrderSummary = ({ items, total, coupon, discount, finalTotal }: any) => {

    const formatPrice = (value: number) => {
        return new Intl.NumberFormat("en-LK", {
            style: "currency",
            currency: "LKR",
        }).format(value);
    }
    
    return (
        <div className="order-summary">

            <h2>Order Summary</h2>

            {
                items?.map((item: any) => (
                    <div key={item._id} className="order-item">
                        <span className="item-name">{item.name}</span>
                        <span className="item-qty">Qty: {item.qty}</span>
                        <span className="item-price">
                            {formatPrice(item.price * item.qty)}
                        </span>
                    </div>
                ))
            }

            {coupon && (
                <CouponCard
                    code={coupon.code}
                    discount={coupon.discount}
                />
            )}

            <div className="order-total">
                <span>Subtotal:</span>
                <span>{formatPrice(total)}</span>
            </div>

            <div className="order-total">
                <span>Discount:</span>
                <span>- {formatPrice(discount || 0)}</span>
            </div>

            <div className="order-total final">
                <span>Total:</span>
                <span>{formatPrice(finalTotal)}</span>
            </div>

            <div className="savings">
                You saved: {formatPrice(discount || 0)}
            </div>

        </div>
    )
}

export default OrderSummary
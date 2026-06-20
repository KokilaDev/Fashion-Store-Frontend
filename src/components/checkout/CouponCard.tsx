type Props = {
    code: string;
    discount: number;
    onRemove?: () => void;
};

const CouponCard = ({ code, discount, onRemove }: Props) => {
    return (
        <div className="coupon-card">

            <div className="coupon-info">
                <h4>{code}</h4>
                <p>{discount}% OFF Applied</p>
            </div>

            {onRemove && (
                <button 
                    className="remove-coupon-btn" 
                    onClick={onRemove}
                >
                    Remove
                </button>
            )}

        </div>
    )
}

export default CouponCard;
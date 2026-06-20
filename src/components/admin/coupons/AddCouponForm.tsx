import "../../../styles/coupon.css";

const AddCouponForm = ({
    form,
    handleChange,
    handleSubmit,
    isEdit
}: any) => {
    return (
        <div className="coupon-form-container">

            <form onSubmit={handleSubmit} className="add-coupon-form">

                <div className="coupon-section-row">
                    <div className="coupon-form-group">
                        Coupon Code
                        <input
                            name="code"
                            placeholder="Coupon Code"
                            value={form.code}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="coupon-form-group">
                        Discount
                        <input
                            name="discount"
                            type="number"
                            placeholder="Discount"
                            value={form.discount}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="coupon-form-group">
                        Type
                        <select name="type" value={form.type} onChange={handleChange}>
                            <option value="percentage">Percentage</option>
                            <option value="fixed">Fixed</option>
                        </select>
                    </div>

                    <div className="coupon-form-group">
                        Expiry Date
                        <input
                            name="expiryDate"
                            type="date"
                            value={form.expiryDate}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="coupon-form-group">
                        Min Order Amount
                        <input
                            name="minOrderAmount"
                            type="number"
                            placeholder="Min Order Amount"
                            value={form.minOrderAmount}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="coupon-buttons">
                        <button className="submit-btn" type="submit">
                            {isEdit ? "Update Coupon" : "Create Coupon"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddCouponForm;
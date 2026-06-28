import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiCalendar } from "react-icons/fi";
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
                <div className="coupon-section-column">

                    <div className="section-column">
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
                            Title
                            <input
                                name="title"
                                placeholder="Coupon Title"
                                value={form.title}
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
                            Event
                            <select name="event" value={form.event} onChange={handleChange}>
                                <option value="order-value">Order Value</option>
                                <option value="new-year">New Year</option>
                                <option value="valentine">Valentine</option>
                                <option value="christmas">Christmas</option>
                                <option value="december-31">December 31</option>
                                <option value="birthday-month">Birthday Month</option>
                            </select>
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
                    </div>

                    <div className="section-column">
                        <div className="coupon-form-date">
                            <div className="coupon-form-group">
                                Start Date
                                <div className="date-input-wrapper">
                                    <DatePicker
                                        selected={
                                            form.startDate
                                            ? new Date(form.startDate)
                                            : null
                                        }
                                        onChange={(date: Date | null) =>
                                            handleChange({
                                            target: {
                                                name: "startDate",
                                                value: date
                                                ? date.toISOString().split("T")[0]
                                                : "",
                                            },
                                            })
                                        }
                                        dateFormat="yyyy-MM-dd"
                                        placeholderText="yyyy-mm-dd"
                                        className="custom-datepicker"
                                    />

                                    <FiCalendar className="calendar-icon" />
                                </div>
                            </div>
                            
                            <div className="coupon-form-group">
                                Expiry Date
                                <div className="date-input-wrapper">
                                    <DatePicker
                                        selected={
                                            form.expiryDate
                                            ? new Date(form.expiryDate)
                                            : null
                                        }
                                        onChange={(date: Date | null) =>
                                            handleChange({
                                            target: {
                                                name: "expiryDate",
                                                value: date
                                                ? date.toISOString().split("T")[0]
                                                : "",
                                            },
                                            })
                                        }
                                        dateFormat="yyyy-MM-dd"
                                        placeholderText="yyyy-mm-dd"
                                        className="custom-datepicker"
                                    />

                                    <FiCalendar className="calendar-icon" />
                                </div>
                            </div>
                        </div>

                        <div className="coupon-form-group">
                            Description
                            <textarea
                                name="description"
                                placeholder="Coupon Description"
                                value={form.description}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="coupon-form-group checkbox-group">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="isBirthdayMonthOffer"
                                    checked={form.isBirthdayMonthOffer}
                                    onChange={(e) =>
                                    handleChange({
                                        target: {
                                        name: "isBirthdayMonthOffer",
                                        value: e.target.checked
                                        }
                                    })
                                    }
                                />

                                <span className="custom-checkbox"></span>

                                Birthday Month Offer
                            </label>
                        </div>
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
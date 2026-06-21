const ShippingDetails = ({
    checkoutData,
    setCheckoutData,
}: any) => {
    const districts = [
        "Colombo", "Kalutara", "Gampaha", "Galle", "Matara", "Hambantota",
        "Kandy", "Nuwara Eliya", "Badulla", "Monaragala", "Matale", "Trincomalee", "Batticaloa",
        "Ampara", "Polonnaruwa", "Anuradhapura", "Puttalam", "Kurunegala", "Jaffna",
        "Kilinochchi", "Mannar", "Mullaitivu", "Vavuniya", "Kegalle", "Ratnapura"
    ];
    return (
        <div className="shipping-details">
            <h3>Shipping Details</h3>

            <div className="shipping-form-group">
                Delivery Address
                <input 
                    type="text" 
                    className="shipping-form-control" 
                    value={checkoutData.shippingDetails.address}
                    onChange={(e) => 
                        setCheckoutData({
                            ...checkoutData,
                            shippingDetails: {
                                ...checkoutData.shippingDetails,
                                address: e.target.value,
                            },
                        })
                    }
                />
            </div>

            <div className="section-row">
                <div className="shipping-form-group">
                    District
                    <select 
                        className="shipping-form-control"
                        value={checkoutData.shippingDetails.district}
                        onChange={(e) => 
                            setCheckoutData({
                                ...checkoutData,
                                shippingDetails: {
                                    ...checkoutData.shippingDetails,
                                    district: e.target.value,
                                },
                            })
                        }
                    >
                        <option value="" disabled>Select District</option>

                        {districts.map((district) => (
                            <option key={district} value={district}>
                                {district}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="shipping-form-group">
                    Postal Code
                    <input 
                        type="text" 
                        placeholder="ex: 10100" 
                        className="shipping-form-control" 
                        value={checkoutData.shippingDetails.postalCode}
                        onChange={(e) => 
                            setCheckoutData({
                                ...checkoutData,
                                shippingDetails: {
                                    ...checkoutData.shippingDetails,
                                    postalCode: e.target.value,
                                },
                            })
                        }
                    />
                </div>
            </div>
        </div>
    )
}

export default ShippingDetails;
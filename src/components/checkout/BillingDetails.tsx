const BillingDetails = ({
    checkoutData,
    setCheckoutData,
}: any) => {
    return (
        <div className="billing-details">
            <h3>Billing Details</h3>

            <div className="billing-form-group">
                Full Name
                <input 
                    type="text" 
                    placeholder="Full Name" 
                    className="billing-form-control" 
                    value={checkoutData.billingDetails.fullName}
                    onChange={(e) => 
                        setCheckoutData({
                            ...checkoutData,
                            billingDetails: {
                                ...checkoutData.billingDetails,
                                fullName: e.target.value,
                            },
                        })
                    }
                />
            </div>

            <div className="section-row">
                <div className="billing-form-group">
                    Email Address
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        className="billing-form-control" 
                        value={checkoutData.billingDetails.email}
                        onChange={(e) => 
                            setCheckoutData({
                                ...checkoutData,
                                billingDetails: {
                                    ...checkoutData.billingDetails,
                                    email: e.target.value,
                                },
                            })
                        }
                    />
                </div>

                <div className="billing-form-group">
                    Phone Number
                    <input 
                        type="text" 
                        placeholder="Phone Number" 
                        className="billing-form-control" 
                        value={checkoutData.billingDetails.phone}
                        onChange={(e) => 
                            setCheckoutData({
                                ...checkoutData,
                                billingDetails: {
                                    ...checkoutData.billingDetails,
                                    phone: e.target.value,
                                },
                            })
                        }
                    />
                </div>
            </div>

        </div>
    )
}

export default BillingDetails;
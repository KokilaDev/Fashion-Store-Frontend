const BillingDetails = () => {
    return (
        <div className="billing-details">
            <h3>Billing Details</h3>

            <div className="billing-form-group">
                Full Name
                <input 
                    type="text" 
                    placeholder="Full Name" 
                    className="billing-form-control" 
                />
            </div>

            <div className="section-row">
                <div className="billing-form-group">
                    Email Address
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        className="billing-form-control" 
                    />
                </div>

                <div className="billing-form-group">
                    Phone Number
                    <input 
                        type="text" 
                        placeholder="Phone Number" 
                        className="billing-form-control" 
                    />
                </div>
            </div>

        </div>
    )
}

export default BillingDetails;
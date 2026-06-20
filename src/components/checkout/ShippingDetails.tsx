const ShippingDetails = () => {
    return (
        <div className="shipping-details">
            <h3>Shipping Details</h3>

            <div className="shipping-form-group">
                Delivery Address
                <input 
                    type="text" 
                    className="shipping-form-control" 
                />
            </div>

            <div className="section-row">
                <div className="shipping-form-group">
                    District
                    <select 
                        className="shipping-form-control"
                    >
                        <option value="" disabled selected hidden>Select District</option>
                        <option value="colombo">Colombo</option>
                        <option value="kalutara">Kalutara</option>
                        <option value="gampaha">Gampaha</option>
                        <option value="galle">Galle</option>
                        <option value="matara">Matara</option>
                        <option value="hambantota">Hambantota</option>
                        <option value="kandy">Kandy</option>
                        <option value="nuwara-eliya">Nuwara Eliya</option>
                        <option value="badulla">Badulla</option>
                        <option value="matale">Matale</option>
                        <option value="trincomalee">Trincomalee</option>
                        <option value="batticaloa">Batticaloa</option>
                        <option value="ampara">Ampara</option>
                        <option value="polonnaruwa">Polonnaruwa</option>
                        <option value="anuradhapura">Anuradhapura</option>
                        <option value="puttalam">Puttalam</option>
                        <option value="kurunegala">Kurunegala</option>
                        <option value="jaffna">Jaffna</option>
                        <option value="kilinochchi">Kilinochchi</option>
                        <option value="mannar">Mannar</option>
                        <option value="mullaitivu">Mullaitivu</option>
                        <option value="vavuniya">Vavuniya</option>
                        <option value="kegalle">Kegalle</option>
                        <option value="ratnapura">Ratnapura</option>
                    </select>
                </div>

                <div className="shipping-form-group">
                    Postal Code
                    <input 
                        type="text" 
                        placeholder="ex: 10100" 
                        className="shipping-form-control" 
                    />
                </div>
            </div>
        </div>
    )
}

export default ShippingDetails;
import { useNavigate } from "react-router-dom";
import "../../styles/product.css"

const ProductHeader = () => {

    const navigate = useNavigate();

    return (
        <div className="product-header">

            <button
                className="back-btn"
                onClick={() => navigate("/")}
            >
                <i className="fa-solid fa-arrow-left"></i>
                Back to Home
            </button>

            <h1 className="product-title">
                Products
            </h1>

        </div>
    );
};

export default ProductHeader;
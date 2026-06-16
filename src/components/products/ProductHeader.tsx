import "../../styles/product.css"
import BackButton from "../layouts/BackButton";

const ProductHeader = () => {
    return (
        <div className="product-header">

            <BackButton />

            <h1 className="product-title">
                Products
            </h1>

        </div>
    );
};

export default ProductHeader;
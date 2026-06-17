import "../../styles/product.css";

type Props = {
    onClick: () => void;
};

const AddToCartBtn = ({ onClick }: Props) => {
    return (
        <button
            className="add-to-cart-btn"
            onClick={onClick}
        >
            Add to Cart
        </button>
    );
};

export default AddToCartBtn;
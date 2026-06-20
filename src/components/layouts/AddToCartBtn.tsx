import "../../styles/product.css";

type Props = {
    onClick: () => void;
    disabled?: boolean;
};

const AddToCartBtn = ({ onClick, disabled }: Props) => {
    const handleClick = () => {
        console.log("AddToCartBtn clicked");
        onClick();
    };

    return (
        <button
            className="add-to-cart-btn"
            onClick={handleClick}
            disabled={disabled}
        >
            Add to Cart
        </button>
    );
};

export default AddToCartBtn;
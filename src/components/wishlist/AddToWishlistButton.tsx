import "../../styles/product.css";

type Props = {
  isFavorite: boolean;
  onClick: () => void;
};

const AddToWishlistButton = ({ isFavorite, onClick }: Props) => {
  return (
    <i
      className={`bi heart-icon ${
        isFavorite ? "bi-heart-fill text-danger" : "bi-heart"
      }`}
      onClick={onClick}
    />
  );
};

export default AddToWishlistButton;
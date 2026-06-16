import "../../styles/product.css"

type Props = {
    isFavorite: boolean;
    onClick: () => void;
};

const FavoriteButton = ({ isFavorite, onClick }: Props) => {
    return (
        <i
            className={`icon-anim heart-icon bi ${
                isFavorite ? "bi-heart-fill" : "bi-heart"
            }`}
            onClick={onClick}
        ></i>
    );
};

export default FavoriteButton;
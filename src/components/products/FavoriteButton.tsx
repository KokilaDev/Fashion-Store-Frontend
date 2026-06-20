import "../../styles/product.css"

type Props = {
    isFavorite: boolean;
    onClick: () => void;
};

const FavoriteButton = ({ isFavorite, onClick }: Props) => {
    const handleClick = () => {
        console.log("FavoriteButton clicked");
        onClick();
    };

    return (
        <i
            className={`icon-anim heart-icon bi ${
                isFavorite ? "bi-heart-fill" : "bi-heart"
            }`}
            onClick={handleClick}
        ></i>
    );
};

export default FavoriteButton;
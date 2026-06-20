import "../../styles/wishlist.css";

const EmptyList = ({ isCart }: { isCart?: boolean }) => {
  const isCartView = isCart;

  return (
    <div className="empty-list">
      <i
        className={
          isCartView
            ? "fa-solid fa-cart-shopping empty-icon"
            : "fa-regular fa-heart empty-icon"
        }
      />

      <h2>{isCartView ? "No Cart Items" : "No Wishlist Items"}</h2>

      <p>
        {isCartView
          ? "You haven't added any products to your cart yet."
          : "You haven't added any products to your wishlist yet."}
      </p>
    </div>
  );
};

export default EmptyList;
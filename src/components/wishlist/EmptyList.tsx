import "../../styles/wishlist.css";

const EmptyList = () => {
  return (
    <div className="empty-list">
      <i className="fa-regular fa-heart empty-icon"></i>

      <h2>No Wishlist Items</h2>

      <p>
        You haven't added any products to your wishlist yet.
      </p>
    </div>
  );
};

export default EmptyList;
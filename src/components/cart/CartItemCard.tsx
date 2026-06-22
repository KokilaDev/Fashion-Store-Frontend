import { updateQty, removeItem } from "../../api/cartApi";
import "../../styles/cart.css";

const CartItemCard = ({ item, refresh, userId }: any) => {

    const imgUrl = item.image
        ? `http://localhost:5000/uploads/${item.image}`
        : "/placeholder.png";

    const handleQtyChange = async (qty: number) => {
        await updateQty({
            userId,
            productId: item.productId,
            qty,
        });

        refresh();
    };

    const handleRemove = async () => {
        console.log("RemoveButton clicked");
        await removeItem({
            userId,
            productId: item.productId,
            size: item.size,
        });

        refresh();
    };

    // const handleSizeChange = async (size: string) => {
    //     await updateQty({
    //         userId,
    //         productId: item.productId,
    //         qty: item.qty,
    //         size: item.size,
    //     });

    //     refresh();
    // };

    return (
        <div className="cart-item-card">
            <img
                src={imgUrl}
                alt={item.name || "Product Image"}
            />

            <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>Rs. {item.price}</p>

                <div className="size-box">
                    {Object.entries(item.availableSizes || {})
                        .filter(([, qty]) => Number(qty) > 0)
                        .map(([size]) => (
                        <button
                            key={size}
                            className={`size-btn ${item.size === size ? "active" : ""}`}
                            // onClick={() => handleSizeChange(size)}
                        >
                            {size}
                        </button>
                    ))}
                </div>

                <div className="qty-controls">
                    <button onClick={() => handleQtyChange(item.qty - 1)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => handleQtyChange(item.qty + 1)}>+</button>
                </div>

                <button className="remove-button" onClick={handleRemove}>
                    Remove
                </button>
            </div>
        </div>
    );
};

export default CartItemCard;
const CartSummary = ({ items }: any) => {

    const total = items.reduce(
        (acc: number, item: any) => acc + item.price * item.qty,
        0
    );

    return (
        <div className="cart-summary">
            <h2>Summary</h2>
            <p>Total: Rs. {total}</p>

            <button className="checkout-btn">
                Checkout
            </button>
        </div>
    );
};

export default CartSummary;
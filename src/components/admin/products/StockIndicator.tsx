import "../../../styles/product.css"

type Props = {
  stock: number;
};

const StockIndicator = ({ stock }: Props) => {
  return (
    <span
      className={
        stock <= 20
          ? "low-stock"
          : stock <= 50
          ? "medium-stock"
          : "high-stock"
      }
    >
      {stock <= 20 ? "Low Stock" : stock <= 50 ? "Medium" : "In Stock"}
    </span>
  );
};

export default StockIndicator;
import "../../../styles/product.css"

type Props = {
  stock: number;
};

const StockIndicator = ({ stock }: Props) => {
  return (
    <span
      className={
        stock <= 5
          ? "low-stock"
          : stock <= 20
          ? "medium-stock"
          : "high-stock"
      }
    >
      {stock <= 5 ? "Low Stock" : stock <= 20 ? "Medium" : "In Stock"}
    </span>
  );
};

export default StockIndicator;
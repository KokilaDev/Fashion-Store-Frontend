import StockIndicator from "./StockIndicator";
import "../../styles/product.css"

type Product = {
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  image: File | null;
};

type Props = {
  products: Product[];
};

const ProductInventory = ({ products }: Props) => {
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Status</th>
          <th>Image</th>
        </tr>
      </thead>

      <tbody>
        {products.map((p, index) => (
          <tr key={index}>
            <td>{p.name}</td>
            <td>{p.category}</td>
            <td>{p.price}</td>
            <td>{p.stock}</td>

            <td>
              <StockIndicator stock={Number(p.stock)} />
            </td>

            <td>
              {p.image && (
                <img
                  src={`http://localhost:5000/uploads/${p.image}`}
                  width="50"
                  alt={p.name}
                />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductInventory;
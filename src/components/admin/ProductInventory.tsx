import StockIndicator from "./StockIndicator";
import "../../styles/product.css"
import type { AdminProduct } from "../../types/Product";

// type AdminProduct = {
//   _id: string;
//   name: string;
//   category: string;
//   price: number;
//   stock: number;
//   description: string;
//   image: File | null;
// };

type Props = {
  products: AdminProduct[];
  setProduct: (p: AdminProduct) => void;
  setIsEdit: (v: boolean) => void;
};

const ProductInventory = ({ products, setProduct, setIsEdit }: Props) => {
  const openEdit = (product: AdminProduct) => {
    console.log("Editing Product:", product);
    setProduct(product)
    setIsEdit(true)
  }

  return (
    <div>
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
                {products.map((p) => (
                <tr key={p._id}>
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
                    <td>
                        <button onClick={() => openEdit(p)}>
                            Edit
                        </button>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
};

export default ProductInventory;
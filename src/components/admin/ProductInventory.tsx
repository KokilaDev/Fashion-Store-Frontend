import StockIndicator from "./StockIndicator";
import "../../styles/product.css"
import type { AdminProduct } from "../../types/Product";

type Props = {
  products: AdminProduct[];
  setProduct: (p: AdminProduct) => void;
  setIsEdit: (v: boolean) => void;
  setDeleteId: (id: string) => void;
  setShowDeleteModal: (v: boolean) => void;
};

const ProductInventory = ({ products, setProduct, setIsEdit, setDeleteId, setShowDeleteModal }: Props) => {
  const openEdit = (product: AdminProduct) => {
    console.log("Editing Product:", product);
    setProduct(product)
    setIsEdit(true)
  }

  return (
    <div className="inventory-container">
        <table className="product-table">
            <thead>
                <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Image</th>
                <th></th>
                <th></th>
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
                        <button 
                            className="btnEdit" 
                            onClick={() => openEdit(p)}
                        >
                            Edit
                        </button>
                    </td>
                    <td>
                        <button 
                            className="btnDelete" 
                            onClick={() => {
                                setDeleteId(p._id);
                                setShowDeleteModal(true);
                            }}
                        >
                            Delete
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
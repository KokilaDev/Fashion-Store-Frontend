import StockIndicator from "../products/StockIndicator";
import "../../../styles/product.css";
import type { AdminProduct } from "../../../types/Product";

type Props = {
  products: AdminProduct[];
  setProduct: React.Dispatch<React.SetStateAction<AdminProduct>>;
  setIsEdit: (v: boolean) => void;
  setDeleteId: (id: string) => void;
  setShowDeleteModal: (v: boolean) => void;
};

const ProductInventory = ({ products, setProduct, setIsEdit, setDeleteId, setShowDeleteModal }: Props) => {
  const openEdit = (product: AdminProduct) => {
    console.log("OPEN EDIT:", product);

    setProduct({
        ...product,
        sizes: {
            XS: product.sizes?.XS ?? 0,
            S: product.sizes?.S ?? 0,
            M: product.sizes?.M ?? 0,
            L: product.sizes?.L ?? 0,
            XL: product.sizes?.XL ?? 0,
        },
    });

    setIsEdit(true);
  };

  const getTotalStock = (sizes: any) => {
    return Object.values(sizes).reduce(
        (total: number, qty: any) => total + Number(qty),
        0
    );
  };

  return (
    <div className="inventory-container">
        <table className="product-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Sizes</th>
                    <th>Total Stock</th>
                    <th>Status</th>
                    <th>Image</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
            {products.map((p) => {
                const totalStock = getTotalStock(p.sizes);

                return (
                    <tr key={p._id}>
                        <td>{p.name}</td>
                        <td>{p.category}</td>
                        <td>{p.price}</td>

                        <td>
                        <div className="size-stock-view">
                            {Object.entries(p.sizes)
                                .filter(([, qty]) => Number(qty) > 0)
                                .map(([size]) => size)
                                .join("   ")}
                        </div>
                        </td>

                        <td>{totalStock}</td>

                        <td>
                        <StockIndicator stock={totalStock} />
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
                );
            })}
            </tbody>
        </table>
    </div>
  );
};

export default ProductInventory;
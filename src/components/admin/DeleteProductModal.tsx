import "../../styles/product.css"

type Props = {
  onDelete: () => void;
  onClose: () => void;
};

const DeleteProductModal = ({
  onDelete,
  onClose,
}: Props) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Delete Product?</h3>

        <button onClick={onDelete}>
          Yes
        </button>

        <button onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteProductModal;
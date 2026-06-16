import "../../styles/product.css"

type Props = {
  image: File | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ProductImageUploader = ({ image, onImageChange }: Props) => {
  return (
    <div className="form-group">
      Product Image

      <input
        type="file"
        accept="image/*"
        onChange={onImageChange}
        className="file-input"
      />

      {image && (
        <img
          src={URL.createObjectURL(image)}
          alt="preview"
          width="120"
        />
      )}
    </div>
  );
};

export default ProductImageUploader;
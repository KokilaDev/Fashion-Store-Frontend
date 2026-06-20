interface AddressFormProps {
  address: string;
  onChange: (value: string) => void;
}

const AddressForm = ({
  address,
  onChange,
}: AddressFormProps) => {
  return (
    <div className="content profile-field full-width-field">
      <label>Shipping Address</label>

      <textarea
        rows={3}
        className="profile-editable-input profile-textarea"
        value={address}
        onChange={(e) =>
          onChange(e.target.value)
        }
      />
    </div>
  );
};

export default AddressForm;
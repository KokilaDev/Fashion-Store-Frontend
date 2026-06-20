interface AddressCardProps {
  address: string;
}

const AddressCard = ({
  address,
}: AddressCardProps) => {
  return (
    <div className="content profile-field full-width-field">
      <label>Shipping Address</label>
      <h2>
        {address || "No Address Found"}
      </h2>
    </div>
  );
};

export default AddressCard;
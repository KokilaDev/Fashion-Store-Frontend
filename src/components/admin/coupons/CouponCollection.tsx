import "../../../styles/coupon.css";

type Coupon = {
  _id: string;
  code: string;
  discount: number;
  type: string;
  expiryDate: string;
  minOrderAmount: number;
  isActive?: boolean;
};

type Props = {
  coupons: Coupon[];
  onEdit: (coupon: Coupon) => void;
  onDelete: (id: string) => void;
};

const CouponCollection = ({
  coupons,
  onEdit,
  onDelete,
}: Props) => {

  return (
    <div className="coupon-table-container">
      <table className="coupon-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Discount</th>
            <th>Type</th>
            <th>Min Order</th>
            <th>Expiry Date</th>
            <th>Status</th>
            <th></th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {coupons.map((coupon) => (
            <tr key={coupon._id}>
              <td>{coupon.code}</td>

              <td>
                {coupon.type === "percentage"
                  ? `${coupon.discount}%`
                  : `Rs. ${coupon.discount}`}
              </td>

              <td>{coupon.type}</td>

              <td>Rs. {coupon.minOrderAmount}</td>

              <td>
                {new Date(coupon.expiryDate).toLocaleDateString()}
              </td>

              <td>
                {new Date(coupon.expiryDate) > new Date()
                  ? "Active"
                  : "Expired"}
              </td>

              <td>
                <button
                  className="coupon-edit-btn"
                  onClick={() => onEdit(coupon)}
                >
                  Edit
                </button>
              </td>

              <td>
                <button
                  className="coupon-delete-btn"
                  onClick={() => onDelete(coupon._id!)}
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

export default CouponCollection;
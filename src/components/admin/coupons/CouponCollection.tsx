import "../../../styles/coupon.css";
import type { Coupon } from "../../../types/Coupon";

type Props = {
  coupons: Coupon[];
  onEdit: (coupon: Coupon) => void;
  onDelete: (_id: string) => void;
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
            <th>Title</th>
            <th>Discount</th>
            <th>Type</th>
            <th>Event</th>
            <th>Min Order</th>
            <th>Expiry Date</th>
            <th>Status</th>
            <th>Birthday Month Offer</th>
            <th></th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {coupons.map((coupon) => (
            <tr key={coupon._id}>

              <td>{coupon.code}</td>

              <td>{coupon.title}</td>

              <td>
                {coupon.type === "percentage"
                  ? `${coupon.discount}%`
                  : `Rs. ${coupon.discount}`}
              </td>

              <td>{coupon.type}</td>

              <td>{coupon.event || "-"}</td>

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
                {coupon.isBirthdayMonthOffer ? "Yes" : "No"}
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
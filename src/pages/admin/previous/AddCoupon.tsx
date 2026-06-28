import { useEffect, useState } from "react";
import {
  getCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
} from "../../../api/couponApi";
import AddCouponForm from "../../../components/admin/coupons/AddCouponForm";
import CouponCollection from "../../../components/admin/coupons/CouponCollection";
import type { Coupon, CouponForm } from "../../../types/Coupon";
import "../../styles/coupon.css";
import BackButton from "../../../components/layouts/BackButton";

const AddCoupon = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState<CouponForm | Coupon>({
    code: "",
    title: "",
    description: "",
    discount: 0,
    event: "",
    isBirthdayMonthOffer: false,
    isActive: true,
    type: "percentage",
    startDate: "",
    expiryDate: "",
    minOrderAmount: 0,
  });

  const loadCoupons = async () => {
    try {
      const data = await getCoupons();
      setCoupons(data);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const data = await getCoupons();
        setCoupons(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCoupons();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const couponData = {
        ...form,
        discount: Number(form.discount),
        minOrderAmount: Number(form.minOrderAmount),
      };

      console.log("Sending:", couponData);

      if (editingId) {
        await updateCoupon(editingId, couponData);
      } else {
        await createCoupon(couponData);
      }

      setForm({
        code: "",
        title: "",
        description: "",
        discount: 0,
        event: "",
        isBirthdayMonthOffer: false,
        isActive: true,
        type: "percentage",
        startDate: "",
        expiryDate: "",
        minOrderAmount: 0,
      });

      setEditingId(null);

      await loadCoupons();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (coupon: Coupon) => {
    console.log("Editing coupon:", coupon);

    setForm({
      _id: coupon._id,
      code: coupon.code || "",
      title: coupon.title || "",
      description: coupon.description || "",
      discount: coupon.discount || 0,
      type: coupon.type || "percentage",
      startDate: coupon.startDate || "",
      expiryDate: coupon.expiryDate
        ? coupon.expiryDate.split("T")[0]
        : "",
      minOrderAmount: coupon.minOrderAmount || 0,
      event: coupon.event || "",
      isBirthdayMonthOffer: coupon.isBirthdayMonthOffer || false,
      isActive: coupon.isActive ?? true,
    });

    setEditingId(coupon._id ?? null);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this coupon?")) return;

    try {
      await deleteCoupon(id);
      await loadCoupons();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="box-container">
      <div className="add-coupon-container">
        <div className="add-coupon-header">
          <BackButton />
          <h1>
            {editingId ? "Edit Coupon" : "Add Coupon"}
          </h1>
        </div>

        <AddCouponForm
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isEdit={!!editingId}
        />

        <CouponCollection
          coupons={coupons}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default AddCoupon;
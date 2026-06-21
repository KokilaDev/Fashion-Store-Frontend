import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const OrderSuccessPage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!state) {
            navigate("/");
            return;
        }

        Swal.fire({
            icon: "success",
            title: "Order Confirmed!",
            html: `
                <p>Thank you for your purchase</p>
                <p><b>Order ID:</b> ${state.orderId}</p>
                <p><b>Total:</b> Rs. ${state.total}</p>
            `,
        }).then(() => {
            navigate("/products");
        });

    }, [state, navigate]);

    return null;
};

export default OrderSuccessPage;
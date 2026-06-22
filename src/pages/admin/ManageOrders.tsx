import OrdersHeader from "../../components/admin/orders/OrdersHeader";
import OrdersTable from "../../components/admin/orders/OrdersTable";
import "../../styles/order.css";

const ManageOrders = () => {
    const pendingOrders = [
        {
            id: "ORD001",
            customer: "Kokila Dewmini",
            date: "2026-06-21",
            items: 3,
            total: 2500,
        },
    ];

    const deliveredOrders = [
        {
            id: "ORD002",
            customer: "Nimal Perera",
            date: "2026-06-20",
            total: 1800,
            status: "Delivered",
        },
    ];

    return (
        <div className="box-container">
            <div className="orders-container">
                <OrdersHeader />

                <OrdersTable
                    title="Pending Orders"
                    type="pending"
                    orders={pendingOrders}
                />

                <OrdersTable
                    title="Delivered Orders"
                    type="delivered"
                    orders={deliveredOrders}
                />
            </div>
        </div>
    );
};

export default ManageOrders;
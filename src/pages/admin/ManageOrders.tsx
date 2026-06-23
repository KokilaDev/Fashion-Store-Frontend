import DeliveredOrdersTable from "../../components/admin/orders/DeliveredOrdersTable";
import OrdersHeader from "../../components/admin/orders/OrdersHeader";
import PlacedOrdersTable from "../../components/admin/orders/PlacedOrdersTable";
import "../../styles/order.css";

const ManageOrders = () => {

    return (
        <div className="box-container">
            <div className="orders-container">
                <OrdersHeader />

                <PlacedOrdersTable />

                <DeliveredOrdersTable />
                
            </div>
        </div>
    );
};

export default ManageOrders;
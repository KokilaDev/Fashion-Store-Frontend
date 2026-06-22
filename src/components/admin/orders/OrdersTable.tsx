import OrderRow from "./OrderRow";
import "../../../styles/order.css";

type Order = {
    id: string;
    customer: string;
    date: string;
    items?: number;
    total: number;
    status?: string;
};

type Props = {
    title: string;
    type: "pending" | "delivered";
    orders: Order[];
};

const OrdersTable = ({ title, type, orders }: Props) => {
    return (
        <div className="orders-content">
            <h2 className="table-title">{title}</h2>

            <table className="order-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Date</th>

                        {type === "pending" && <th>Items</th>}

                        <th>Total</th>

                        {type === "delivered" && <th>Status</th>}

                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map((order) => (
                        <OrderRow
                            key={order.id}
                            order={order}
                            type={type}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersTable;
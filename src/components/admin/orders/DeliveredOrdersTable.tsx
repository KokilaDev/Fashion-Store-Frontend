import "../../../styles/order.css";

const DeliveredOrdersTable = () => {    
    return (
        <div className="orders-table-container">
            <h2 className="orders-title">Delivered Orders</h2>

            <div className="orders-content">
                <table className="order-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer Name</th>
                            <th>Order Date</th>
                            <th>Delivered Date</th>
                            <th>Items Count</th>
                            <th>Total Amount</th>
                            <th>Payment Status</th>
                            <th>Delivery Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="delivered-orders-tbody"></tbody>
                </table>
            </div>
        </div>
    )
};

export default DeliveredOrdersTable;
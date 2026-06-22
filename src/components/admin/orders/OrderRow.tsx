import { useNavigate } from "react-router-dom";
import "../../../styles/order.css";

type Props = {
    order: {
        id: string;
        customer: string;
        date: string;
        items?: number;
        total: number;
        status?: string;
    };
    type: "pending" | "delivered";
};

const OrderRow = ({ order, type }: Props) => {
    const navigate = useNavigate();
    
    return (
        <tr>
            <td>{order.id}</td>
            <td>{order.customer}</td>
            <td>{order.date}</td>

            {type === "pending" && <td>{order.items}</td>}

            <td>{order.total}</td>

            {type === "delivered" && <td>{order.status}</td>}

            <td>
                <button 
                    className="action-btn"
                    onClick={() => navigate(`/orders/${order.id}`)}
                >
                    View
                </button>
            </td>
        </tr>
    );
};

export default OrderRow;
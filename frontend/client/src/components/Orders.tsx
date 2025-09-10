import { useQuery } from "@tanstack/react-query";
import type { Order } from "@shared/schema";

function Orders() {
  const { data: orders = [], isLoading, error } = useQuery<Order[]>({
    queryKey: ["/api/orders"]
  });

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return { color: "#f59e0b", fontWeight: "bold" };
      case "in transit":
        return { color: "#3b82f6", fontWeight: "bold" };
      case "delivered":
        return { color: "#22c55e", fontWeight: "bold" };
      case "cancelled":
        return { color: "#ef4444", fontWeight: "bold" };
      default:
        return { color: "#6b7280", fontWeight: "bold" };
    }
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toISOString().split('T')[0];
  };

  const getStatusCounts = () => {
    const counts = {
      total: orders.length,
      pending: orders.filter(o => o.status.toLowerCase() === "pending").length,
      inTransit: orders.filter(o => o.status.toLowerCase() === "in transit").length,
      delivered: orders.filter(o => o.status.toLowerCase() === "delivered").length,
      cancelled: orders.filter(o => o.status.toLowerCase() === "cancelled").length,
    };
    return counts;
  };

  if (error) {
    return (
      <div style={{ 
        background: "white", 
        padding: "20px", 
        borderRadius: "8px", 
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)" 
      }}>
        <h2>All Orders</h2>
        <div style={{ color: "#ef4444", padding: "20px" }}>
          Failed to load orders. Please try again later.
        </div>
      </div>
    );
  }

  const statusCounts = getStatusCounts();

  return (
    <div style={{ 
      background: "white", 
      padding: "20px", 
      borderRadius: "8px", 
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)" 
    }}>
      <h2 style={{ marginBottom: "20px", fontSize: "20px" }}>All Orders</h2>
      
      {isLoading ? (
        <div style={{ color: "#6b7280", fontStyle: "italic" }} data-testid="loading-orders">
          Loading orders...
        </div>
      ) : (
        <>
          <table 
            style={{ borderCollapse: "collapse", width: "100%", background: "white" }}
            data-testid="orders-table"
          >
            <thead style={{ backgroundColor: "#f9fafb" }}>
              <tr>
                <th style={{ 
                  textAlign: "left", 
                  backgroundColor: "#f9fafb", 
                  border: "1px solid #e8e8e8", 
                  padding: "12px" 
                }}>
                  Order ID
                </th>
                <th style={{ 
                  textAlign: "left", 
                  backgroundColor: "#f9fafb", 
                  border: "1px solid #e8e8e8", 
                  padding: "12px" 
                }}>
                  Pickup
                </th>
                <th style={{ 
                  textAlign: "left", 
                  backgroundColor: "#f9fafb", 
                  border: "1px solid #e8e8e8", 
                  padding: "12px" 
                }}>
                  Dropoff
                </th>
                <th style={{ 
                  textAlign: "left", 
                  backgroundColor: "#f9fafb", 
                  border: "1px solid #e8e8e8", 
                  padding: "12px" 
                }}>
                  Customer
                </th>
                <th style={{ 
                  textAlign: "left", 
                  backgroundColor: "#f9fafb", 
                  border: "1px solid #e8e8e8", 
                  padding: "12px" 
                }}>
                  Status
                </th>
                <th style={{ 
                  textAlign: "left", 
                  backgroundColor: "#f9fafb", 
                  border: "1px solid #e8e8e8", 
                  padding: "12px" 
                }}>
                  Created
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td 
                    colSpan={6} 
                    style={{ 
                      border: "1px solid #e8e8e8", 
                      padding: "20px", 
                      textAlign: "center",
                      color: "#6b7280",
                      fontStyle: "italic"
                    }}
                    data-testid="no-orders"
                  >
                    No orders found. Create your first order above.
                  </td>
                </tr>
              ) : (
                orders.map((order, index) => (
                  <tr key={order.id} data-testid={`order-row-${index}`}>
                    <td style={{ border: "1px solid #e8e8e8", padding: "12px" }}>
                      #{order.id.slice(-3).toUpperCase()}
                    </td>
                    <td style={{ border: "1px solid #e8e8e8", padding: "12px" }}>
                      {order.pickup}
                    </td>
                    <td style={{ border: "1px solid #e8e8e8", padding: "12px" }}>
                      {order.dropoff}
                    </td>
                    <td style={{ border: "1px solid #e8e8e8", padding: "12px" }}>
                      {order.customer}
                    </td>
                    <td style={{ border: "1px solid #e8e8e8", padding: "12px" }}>
                      <span style={getStatusStyle(order.status)}>
                        {order.status}
                      </span>
                    </td>
                    <td style={{ border: "1px solid #e8e8e8", padding: "12px" }}>
                      {formatDate(order.createdAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#f9fafb",
            borderRadius: "4px",
            borderLeft: "4px solid #eb1a4e"
          }}>
            <strong>Total Orders:</strong> <span data-testid="total-orders">{statusCounts.total}</span> | 
            <strong> In Transit:</strong> <span data-testid="in-transit-orders">{statusCounts.inTransit}</span> | 
            <strong> Delivered:</strong> <span data-testid="delivered-orders">{statusCounts.delivered}</span> | 
            <strong> Pending:</strong> <span data-testid="pending-orders">{statusCounts.pending}</span>
          </div>
        </>
      )}
    </div>
  );
}

export default Orders;

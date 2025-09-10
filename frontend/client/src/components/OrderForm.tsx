import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

function OrderForm() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [customer, setCustomer] = useState("");
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createOrderMutation = useMutation({
    mutationFn: async (orderData: { pickup: string; dropoff: string; customer: string }) => {
      const response = await apiRequest("POST", "/api/orders", orderData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "✅ Order created!",
        description: "The new order has been successfully created.",
      });
      setPickup("");
      setDropoff("");
      setCustomer("");
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
    },
    onError: (error) => {
      toast({
        title: "❌ Failed to create order",
        description: error.message || "An error occurred while creating the order.",
        variant: "destructive",
      });
      console.error(error);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    createOrderMutation.mutate({ pickup, dropoff, customer });
  };

  return (
    <div style={{ 
      background: "white", 
      padding: "20px", 
      borderRadius: "8px", 
      marginBottom: "20px", 
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)" 
    }}>
      <h2 style={{ marginBottom: "20px", fontSize: "20px" }}>Create New Order</h2>
      <form onSubmit={handleSubmit} style={{ 
        display: "flex", 
        flexWrap: "wrap", 
        gap: "10px", 
        alignItems: "end" 
      }}>
        <input
          type="text"
          placeholder="Pickup Location"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          required
          style={{
            padding: "8px",
            border: "1px solid #e8e8e8",
            borderRadius: "4px",
            fontFamily: "Arial, sans-serif",
            flex: "1",
            minWidth: "200px"
          }}
          data-testid="input-pickup"
        />
        <input
          type="text"
          placeholder="Dropoff Location"
          value={dropoff}
          onChange={(e) => setDropoff(e.target.value)}
          required
          style={{
            padding: "8px",
            border: "1px solid #e8e8e8",
            borderRadius: "4px",
            fontFamily: "Arial, sans-serif",
            flex: "1",
            minWidth: "200px"
          }}
          data-testid="input-dropoff"
        />
        <input
          type="text"
          placeholder="Customer Name"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
          required
          style={{
            padding: "8px",
            border: "1px solid #e8e8e8",
            borderRadius: "4px",
            fontFamily: "Arial, sans-serif",
            flex: "1",
            minWidth: "200px"
          }}
          data-testid="input-customer"
        />
        <button
          type="submit"
          disabled={createOrderMutation.isPending}
          style={{
            padding: "8px 16px",
            backgroundColor: "#eb1a4e",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: createOrderMutation.isPending ? "not-allowed" : "pointer",
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
            opacity: createOrderMutation.isPending ? 0.7 : 1
          }}
          data-testid="button-add-order"
        >
          {createOrderMutation.isPending ? "Adding..." : "Add Order"}
        </button>
      </form>
    </div>
  );
}

export default OrderForm;

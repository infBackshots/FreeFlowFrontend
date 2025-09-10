import Orders from "./components/Orders";
import OrderForm from "./components/OrderForm";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h1>🚚 Trucking Dashboard</h1>
        <OrderForm />
        <hr />
        <Orders />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;

/********************************Import Components and Packages*************************************/
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import AppRoute from "./routes/appRoute";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <AppRoute />
            <Toaster />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;

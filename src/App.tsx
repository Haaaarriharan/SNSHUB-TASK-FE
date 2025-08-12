/********************************Import Components and Packages*************************************/
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import AppRoute from "./routes/appRoute";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "sonner";

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
            <Toaster richColors position="top-right" />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;

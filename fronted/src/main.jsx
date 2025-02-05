import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import "./css/style.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./Components/Layout";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./Redux/Store";

const queryclient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryclient}>
          <Layout />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);

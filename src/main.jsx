import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/cart";
import "./index.css";
import "./i18n";
import { AuthProvider } from "./auth/context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </React.StrictMode>
      <ToastContainer position="bottom-right" autoClose={1200} />
    </PersistGate>
  </Provider>,
);

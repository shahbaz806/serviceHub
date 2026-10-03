import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: "#13231d",
              color: "#f8f8f5",
              borderRadius: "14px",
              fontSize: "13px",
              fontWeight: 600,
              boxShadow: "0 10px 30px rgba(19, 35, 29, 0.25)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              padding: "12px 18px",
            },
            success: {
              iconTheme: {
                primary: "#17734a",
                secondary: "#f8f8f5",
              },
            },
            error: {
              iconTheme: {
                primary: "#e11d48",
                secondary: "#f8f8f5",
              },
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,

        style: {
          background: "#0f172a",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "16px",
          padding: "14px 18px",
          fontSize: "15px",
          fontWeight: "600",
          backdropFilter: "blur(10px)",
        },

        success: {
          iconTheme: {
            primary: "#22c55e",
            secondary: "#ffffff",
          },
        },

        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#ffffff",
          },
        },
      }}
    />

    <App />

  </React.StrictMode>
);
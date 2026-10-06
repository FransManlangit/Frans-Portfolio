import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HeroUIProvider } from "@heroui/react";
import App from "./App";
import "./index.css";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <HeroUIProvider>
        <Toaster />
        <App />
      </HeroUIProvider>
    </BrowserRouter>
  </React.StrictMode>
);
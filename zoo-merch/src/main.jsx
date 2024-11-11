import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ProductProvider } from "./Context/ProductContext";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <ProductProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </ProductProvider>
);

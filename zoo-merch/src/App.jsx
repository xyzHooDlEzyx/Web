import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./navbar/navbar";
import Home from "./Home/home";
import Catalog from "./Catalog/catalog";
import Cart from "./Cart/Cart";
import Footer from "./footer/footer";
import Item from "./Item/item";
import { ProductProvider } from "./Context/ProductContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <ProductProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/item/:id" element={<Item />} />
        </Routes>
        <Footer />
      </Router>
    </ProductProvider>
  );
}

export default App;

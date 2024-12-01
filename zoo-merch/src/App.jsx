import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./navbar/navbar";
import Home from "./home/home";
import Catalog from "./Catalog/Catalog";
import Cart from "./Cart/Cart";
import Footer from "./footer/footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

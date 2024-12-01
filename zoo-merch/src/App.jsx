import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./navbar/navbar";
import Home from "./Home/home";
import Catalog from "./Catalog/catalog";
import Cart from "./Cart/Cart";
import Footer from "./footer/footer";
import Item from "./Item/item";
import store from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;

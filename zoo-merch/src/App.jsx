import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar/navbar";
import LoginPage from "./LoginPage/LoginPage";
import RegisterPage from "./RegistrationPage/RegistrationPage";
import Home from "./Home/home";
import Catalog from "./Catalog/catalog";
import Cart from "./Cart/Cart";
import Footer from "./footer/footer";
import Item from "./Item/item";
import store from "./store/store";
import CheckoutPage from "./CheckoutPage/CheckoutPage";
import SuccessPage from "./SuccessPage/SuccessPage";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./ProtecredRoute";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProtectedRoute element={<Home />} />} />
          <Route
            path="/catalog"
            element={<ProtectedRoute element={<Catalog />} />}
          />
          <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
          <Route
            path="/item/:id"
            element={<ProtectedRoute element={<Item />} />}
          />
          <Route
            path="/checkout"
            element={<ProtectedRoute element={<CheckoutPage />} />}
          />
          <Route
            path="/success"
            element={<ProtectedRoute element={<SuccessPage />} />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;

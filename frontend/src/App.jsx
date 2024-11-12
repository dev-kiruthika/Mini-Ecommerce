import "./App.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetail from "./Pages/ProductDetail";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./Pages/Cart";

function App() {
  const [cartItems, setCartItems] = useState([]);
  return (
    <>
      <Router>
        <ToastContainer theme="dark" />
        <Header cartItems={cartItems} />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/search" element={<Home />}></Route>
          <Route
            path="/product/:id"
            element={
              <ProductDetail
                cartItems={cartItems}
                setCartItems={setCartItems}
              />
            }
          ></Route>
          <Route
            path="/cart"
            element={<Cart cartItems={cartItems} setCartItems={setCartItems} />}
          ></Route>
        </Routes>
      </Router>

      <Footer />
    </>
  );
}

export default App;

import "./App.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetail from "./Pages/ProductDetail";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/search" element={<Home />}></Route>
          <Route path="/product/:id" element={<ProductDetail />}></Route>
        </Routes>
      </Router>

      <Footer />
    </>
  );
}

export default App;

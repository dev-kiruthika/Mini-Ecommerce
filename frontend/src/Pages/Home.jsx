import React, { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import { useSearchParams } from "react-router-dom";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [SearchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/products?" + SearchParams)
      .then((res) => res.json())
      .then((res) => setProducts(res.products));
  }, [SearchParams]);
  return (
    <>
      <h1 id="products_heading">Latest Products</h1>

      <section id="products" className="container mt-5">
        <div className="row">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;

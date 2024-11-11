import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ImageData from "../Source.json";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const ProductDetail = () => {
  const mainPath = ImageData.mainPath;
  const [product, setProducts] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/products/" + id)
      .then((res) => res.json())
      .then((res) => setProducts(res.product))
      .catch((error) => console.error("Error fetching product data:", error));
  }, [id]); // Added `id` as a dependency

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<FaStar key={i} color="#FFD700" />); // Full star
      } else if (i - rating < 1) {
        stars.push(<FaStarHalfAlt key={i} color="#FFD700" />); // Half star
      } else {
        stars.push(<FaRegStar key={i} color="#FFD700" />); // Empty star
      }
    }
    return stars;
  };

  return (
    product && (
      <div className="container container-fluid">
        <div className="row f-flex justify-content-around">
          <div className="col-12 col-lg-5 img-fluid" id="product_image">
            {product.images && product.images.length > 0 ? (
              <img
                src={mainPath + product.images[0].image}
                alt={product.name || "Product Image"}
                height="500"
                width="500"
              />
            ) : (
              <p>No image available</p>
            )}
          </div>

          <div className="col-12 col-lg-5 mt-5">
            <h3>{product.name}</h3>
            <p id="product_id">#{product._id}</p>
            <hr />
            <div className="rating-outer">{renderStars(product.ratings)}</div>
            <hr />
            <p id="product_price">${product.price}</p>{" "}
            {/* Add currency symbol */}
            <div className="stockCounter d-inline">
              <span className="btn btn-danger minus">-</span>
              <input
                type="number"
                className="form-control count d-inline"
                value="1"
                readOnly
              />
              <span className="btn btn-primary plus">+</span>
            </div>
            <button
              type="button"
              id="cart_btn"
              className="btn btn-primary d-inline ml-4"
            >
              Add to Cart
            </button>
            <hr />
            <p>
              Status:{" "}
              <span
                id="stock_status"
                className={product.stock > 0 ? "text-success" : "text-danger"}
              >
                {product.stock > 0 ? "In stock" : "Out of Stock"}
              </span>
            </p>
            <hr />
            <h4 className="mt-2">Description:</h4>
            <p>{product.description || "No description available."}</p>
            <hr />
            <p id="product_seller" className="mb-3">
              Sold by: <strong>{product.seller || "Unknown Seller"}</strong>
            </p>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductDetail;

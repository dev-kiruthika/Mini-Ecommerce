import React from "react";
import ImageData from "../Source.json";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const ProductCard = (product) => {
  // Access mainPath from the product's ImageData object
  const mainPath = ImageData.mainPath;
  const imagePath = product.product.images[0].image;
  const imageUrl = mainPath + imagePath;
  // Function to generate star icons based on rating
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
    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
      <div className="card p-3 rounded">
        <img className="card-img-top mx-auto" src={imageUrl} />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <a href="">{product.product.name}</a>
          </h5>
          <div className="ratings mt-auto">
            <div
              className="rating-outer"
              style={{ width: `${(product.product.ratings / 5) * 100}%` }}
            >
              {renderStars(product.product.ratings)}
            </div>
          </div>
          <p className="card-text">${product.product.price}</p>
          <a href="#" id="view_btn" className="btn btn-block">
            View Details
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

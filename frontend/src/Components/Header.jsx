import React from "react";
import { FaSearch } from "react-icons/fa";
import ImageData from "../Source.json";

const Header = () => {
  return (
    <>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <img width="150px" src={ImageData.logoImage} />
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <div className="input-group">
            <input
              type="text"
              id="search_field"
              className="form-control"
              placeholder="Enter Product Name ..."
            />
            <div className="input-group-append">
              <button id="search_btn" className="btn">
                <FaSearch aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <span id="cart" className="ml-3">
            Cart
          </span>
          <span className="ms-1" id="cart_count">
            2
          </span>
        </div>
      </nav>
    </>
  );
};

export default Header;

import React, { Fragment, useState } from "react";
import ImageData from "../Source.json";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const Cart = ({ cartItems, setCartItems }) => {
  const mainPath = ImageData.mainPath;
  const [complete, setComplete] = useState(false);
  function increaseQty(item) {
    if (item.product.stock == item.qty) {
      return;
    }
    const updateItems = cartItems.map((i) => {
      if (i.product._id == item.product._id) {
        i.qty++;
      }
      return i;
    });
    setCartItems(updateItems);
  }

  function decreaseQty(item) {
    if (item.qty > 1) {
      const updateItems = cartItems.map((i) => {
        if (i.product._id == item.product._id) {
          i.qty--;
        }
        return i;
      });
      setCartItems(updateItems);
    }
  }

  function removeItem(item) {
    const updateItems = cartItems.filter((i) => {
      if (i.product._id !== item.product._id) {
        return true;
      }
    });
    setCartItems(updateItems);
  }
  function placeHandler() {
    fetch(import.meta.env.VITE_API_URL + "/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cartItems),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to place order");
        }
        return response.json();
      })
      .then(() => {
        setCartItems([]);
        setComplete(true);
        toast.success("Order Success");
      })
      .catch((error) => {
        toast.error("Order failed: " + error.message);
      });
  }

  return cartItems.length > 0 ? (
    <Fragment>
      <div className="container container-fluid">
        <h2 className="mt-5">
          Your Cart: <b>{cartItems.length} Items</b>
        </h2>

        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8">
            {cartItems.map((item, index) => (
              <Fragment key={index}>
                <hr />
                <div class="cart-item">
                  <div class="row">
                    <div class="col-4 col-lg-3">
                      <img
                        src={mainPath + item.product.images[0].image}
                        alt={item.product.name}
                        height="90"
                        width="115"
                      />
                    </div>

                    <div class="col-5 col-lg-3">
                      <Link to={"/product/" + item.product._id}>
                        {item.product.name}
                      </Link>
                    </div>

                    <div class="col-4 col-lg-2 mt-4 mt-lg-0">
                      <p id="card_item_price">{item.product.price}</p>
                    </div>

                    <div class="col-4 col-lg-3 mt-4 mt-lg-0">
                      <div class="stockCounter d-inline">
                        <span
                          class="btn btn-danger minus"
                          onClick={() => {
                            decreaseQty(item);
                          }}
                        >
                          -
                        </span>
                        <input
                          type="number"
                          class="form-control count d-inline"
                          value={item.qty}
                          readOnly
                        />

                        <span
                          class="btn btn-primary plus"
                          onClick={() => {
                            increaseQty(item);
                          }}
                        >
                          +
                        </span>
                      </div>
                    </div>

                    <div class="col-4 col-lg-1 mt-4 mt-lg-0">
                      <FaTrash
                        className="text-danger"
                        onClick={() => {
                          removeItem(item);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
          <div className="col-12 col-lg-3 my-4">
            <div id="order_summary">
              <h4>Order Summary</h4>
              <hr />
              <p>
                Subtotal:
                <span className="order-summary-values">
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)} (Units)
                </span>
              </p>

              <p>
                Est. total:
                <span className="order-summary-values">
                  ${" "}
                  {cartItems.reduce(
                    (acc, item) => acc + item.product.price * item.qty,
                    0
                  )}
                </span>
              </p>

              <hr />
              <button
                id="checkout_btn"
                className="btn btn-primary btn-block"
                onClick={placeHandler}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  ) : !complete ? (
    <h2 className="mt-5 text-center">Your Cart is Empty!</h2>
  ) : (
    <Fragment>
      <h2 className="mt-5 text-center">Order Completed!</h2>
      <p className="text-center"> Your order has been placed successfully</p>
    </Fragment>
  );
};

export default Cart;

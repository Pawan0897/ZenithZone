import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AddToCart, AddWishList, ViewProductdetail } from "../Request/https";
import Swal from "sweetalert2";
import useToken from "../Hooks/useToken";
import { useState } from "react";

export default function ProductDetails() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const token = useToken();
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["productdetail"],
    queryFn: async () => {
      const res = await ViewProductdetail(id);
      return res.data;
    },
  });
  /*********** add to cart  */
  const AddtoCart = useMutation({
    mutationKey: ["addtocart"],
    mutationFn: (body) => AddToCart(body),
    onSuccess: (res) => {
      if (res?.data?.statuscode == 200) {
        console.log(res, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>....");
        queryClient.invalidateQueries({ queryKey: ["addtocart"] }),
          queryClient.invalidateQueries({ queryKey: ["countcart"] });
        Swal.fire({
          title: `${res?.data?.message}`,
          text: "Your cart addedd successfully !!!!",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: `${res?.data?.message}`,
          icon: "info",
        });
      }
    },
  });

  /********************** wishlist */
  const addwishsList = useMutation({
    mutationFn: ({ token, item }) => AddWishList(token, item),
    onSuccess: (res) => {
      if (res?.data?.statuscode == 200) {
        queryClient.invalidateQueries({ queryKey: ["countwishlist"] });
        queryClient.invalidateQueries({ queryKey: ["productdetail"] });
        Swal.fire({
          title: `${res?.data?.message}`,
          icon: "success",
        });
      }
    },
    onError: (error) => {
      console.error("Error >>>", error);
    },
  });

  console.log(
    data?.data?.map((item) => {
      return item;
    })
  );
  const [quantity, setquantity] = useState(1);
  return (
    <>
      <Header />
      <div className="container mt-5">
        {data?.data?.map((item) => {
          const totalprice = quantity * item?.price;
          return (
            <>
              <div className="row">
                <div className="col-md-6">
                  <img
                    src={`http://localhost:3000/api/${item?.image}`}
                    alt="Product Image"
                    className="product-img"
                  />
                  <div className="product-colors">
                    <span className="product-color-option active"></span>
                    <span className="product-color-option"></span>
                    <span className="product-color-option"></span>
                  </div>
                </div>
                <div className="col-md-6">
                  {/* <h2 className="product-title">{data?.data?.data?.name}</h2> */}
                  <div className="product-rating">
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star"></span>
                    <span className="text-muted">(154 orders)</span>
                    <span className="text-success">In stock</span>
                  </div>
                  <div className="cart-item">
                    <div className="row ">
                      <div className="col-md-9  d-flex flex-wrap align-items-center">
                        {/* ************* Product name */}
                        <h2 className="text-capitalize"> {item?.name}</h2>
                        {/* ************* Quantity button  */}
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 d-flex">
                    <div className="input-group">
                      {/* ********* Decrease quantity...... */}
                      <button
                        className="btn btn-secondary decrease-btn"
                        onClick={() => setquantity(Math.max(1, quantity - 1))}

                        /***********I add quantity */
                      >
                        -
                      </button>
                      {/* ********** quantity value */}
                      <span
                        id="quantity"
                        className="p-2 d-flex justify-content-center align-items-center"
                      >
                        {quantity}
                      </span>
                      {/* ************* Add Quantity......... */}
                      <button
                        type="button"
                        className="btn btn-secondary increase-btn"
                        onClick={() => setquantity(quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <div className="product-price">${totalprice}.00</div>
                  </div>
                  <p className="text-capitalize">{item?.description}</p>
                  <table className="table">
                    <tbody>
                      <tr>
                        <th>Type:</th>
                        <td>Regular</td>
                      </tr>
                      <tr>
                        <th>Color:</th>
                        <td>Brown</td>
                      </tr>
                      <tr>
                        <th>Material:</th>
                        <td>Cotton, Jeans</td>
                      </tr>
                      <tr>
                        <th>Brand:</th>
                        <td className="text-capitalize">{item?.brand}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="product-sizes">
                    <span className="product-size-option active">Small</span>
                    <span className="product-size-option">Medium</span>
                    <span className="product-size-option">Large</span>
                  </div>
                  <div className="product-buttons">
                    <button
                      className="btn btn-success"
                      onClick={() =>
                        navigate("/user/checkout", {
                          state: {
                            data: [item],
                            total: totalprice,
                            quantity: quantity,
                          },
                        })
                      }
                    >
                      Buy Now
                    </button>
                    <button
                      className="btn btn-danger ms-3 me-3"
                      onClick={() => {
                        let body = {
                          token: token,
                          productid: item?._id,
                        };
                        AddtoCart.mutate(body);
                      }}
                    >
                      Add to Cart
                    </button>
                    {/* Cart ********************************* */}

                    {item?.Iswishlist ? (
                      <>
                        <label className="container-check d-inline">
                          <input
                            type="checkbox"
                            onClick={() =>
                              addwishsList.mutate({ token, item: item })
                            }
                          />
                          <div className="checkmark">
                            <svg viewBox="0 0 306 306">
                              <rect fill="none" height="206" width="206"></rect>
                              <path
                                d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z"
                                strokeWidth="20px"
                                stroke="#FFF"
                                fill="red"
                              ></path>
                            </svg>
                          </div>
                        </label>
                      </>
                    ) : (
                      <label className="container-check d-inline">
                        <input
                          type="checkbox"
                          onClick={() =>
                            addwishsList.mutate({ token, item: item })
                          }
                        />
                        <div className="checkmark">
                          <svg viewBox="0 0 306 306">
                            <rect fill="none" height="206" width="206"></rect>
                            <path
                              d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z"
                              strokeWidth="20px"
                              stroke="#FFF"
                              fill="grey"
                            ></path>
                          </svg>
                        </div>
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

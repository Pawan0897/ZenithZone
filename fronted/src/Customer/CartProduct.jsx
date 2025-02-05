import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Header from "./Header";
import useToken from "../Hooks/useToken";
import { cartRemove, FetchCart, UpdateQuantity } from "../Request/https";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// script.js
export default function CartProduct() {
  const navigate = useNavigate();
  const token = useToken();
  const queryClient = useQueryClient();
  const [activeItemId, setActiveItemId] = useState(null);
  queryClient.invalidateQueries({ queryKey: ["removecart"] });
  /***************** view all products */
  const { data } = useQuery({
    queryKey: ["cartproducts"],
    queryFn: () => FetchCart(token),
    onSuccess: (res) => {
      if (res?.data?.statuscode == 200) {
        queryClient.invalidateQueries({ queryKey: ["removecart"] });
      }
    },
  });
  console.log(data);

  /************** Quantity update */
  const QuantityUpdate = useMutation({
    mutationKey: ["quantity", activeItemId],
    mutationFn: (body) => UpdateQuantity(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartproducts"] });
    },
  });

  /*********************** Remove cart products */
  const RemoveCart = useMutation({
    mutationKey: ["removecart"],
    mutationFn: ({ token, id }) => cartRemove(token, id),
    onSuccess: (res) => {
      if (res?.data?.statuscode == 200) {
        queryClient.invalidateQueries({ queryKey: ["removecart"] });
      }
    },
  });

  /*************** use navigatiom */
  const locationdata = data?.data?.data?.map((item) => {
    return item;
  });

  /********** calculation of total */
  const newSubtotal = data?.data?.data?.reduce(
    (acc, item) => acc + item?.quantity * item?.addtocart?.price,
    0
  );

  /*************************** checkout mutation */
  // const checkout = useMutation({
  //   mutationKey: ["checkout"],
  //   mutationFn: (productid) => CheckOutProduct(productid),
  //   onSuccess: (response) => {
  //     console.log("Checkout successful:", response);
  //     navigate("/user/checkout",{state:{cartproduct:true}})
  //   },
  // });

  // const check = data?.data?.data?.map((item) => item?.productid)
  // const fulldata = data?.data?.data?.map((item) => item?.addtocart)

  // console.log(fulldata,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

  return (
    <>
      <Header />
      <div className="container  p-4 rounded-5 mb-5 mt-5">
        <h2 className="tittle-text">Shopping Cart</h2>
        <div className="row cart position-relative  rounded-5 mb-5 mt-5">
          {/* ******************* cart product start  */}
          {data?.data?.data?.map((item) => {
            return (
              <>
                <div className="col-md-8 p-4">
                  <div className="cart-item">
                    <div className="row ">
                      <div className="col-md-3">
                        <img
                          src={`http://localhost:3000/api/${item?.addtocart?.image}`}
                          alt="Product 2"
                          width="100%"
                        />
                      </div>
                      <div className="col-md-9  d-flex flex-wrap align-items-center">
                        {/* ************* Product name */}
                        <div className="">
                          {" "}
                          <h6>{item?.addtocart?.name}</h6>
                          {/* <p>{item?.name}</p> */}
                          <p>
                            Price :
                            <span className="text-danger">
                              ${item?.addtocart?.price}.00
                            </span>
                          </p>
                        </div>
                        {/* ************* Quantity button  */}
                        <div className="ms-5">
                          <div className="input-group">
                            {/* ********* Decrease quantity...... */}
                            <button
                              className="btn btn-secondary decrease-btn"
                              onClick={() => {
                                setActiveItemId(item?._id);
                                QuantityUpdate.mutate({
                                  token: token,
                                  productid: item?.productid,
                                  quantity: Math.max(
                                    1,
                                    (item?.quantity || 1) - 1
                                  ),
                                });
                                /***********I add quantity */
                                const total =
                                  item?.quantity * item?.addtocart?.price;
                                settotal(total);
                              }}
                            >
                              -
                            </button>
                            {/* ********** quantity value */}
                            <span
                              id="quantity"
                              className="p-2 d-flex justify-content-center align-items-center"
                            >
                              {item?.quantity}
                            </span>
                            {/* ************* Add Quantity......... */}
                            <button
                              type="button"
                              className="btn btn-secondary increase-btn"
                              onClick={() => {
                                let body = {
                                  token: token,
                                  productid: item?.productid,
                                  quantity: item?.quantity + 1,
                                };
                                setActiveItemId(item?._id);
                                QuantityUpdate.mutate(body);
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        {/* ************* Remove button  */}
                        <div className="ms-5">
                          <button
                            className="btn btn-danger"
                            type="button"
                            onClick={() =>
                              RemoveCart.mutate({ token, id: item._id })
                            }
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
          {/* **************************  */}
          <div className="col-md-4 bg-light p-3 position-absolute top-0 end-0">
            <h3>Summary</h3>
            <ul className="list-group">
              <li className="list-group-item">
                Items : {data?.data?.data?.length}
              </li>
              <li className="list-group-item">Shipping: €5.00</li>
              <li className="list-group-item">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your code"
                  />
                  <button className="btn btn-primary">Apply</button>
                </div>
              </li>
              <li className="list-group-item">
                <strong>Total:₹ {newSubtotal}</strong>
              </li>
            </ul>
            <button
              type="button"
              onClick={() =>{
                
                navigate("/user/checkout", {state: {data:locationdata,check:true,total:newSubtotal}})}
              }
              className="btn btn-primary btn-block bg-danger text-light mt-3"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

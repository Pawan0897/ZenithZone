import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Header from "./Header";
import { AddToCart, AddWishList, ShowProduct } from "../Request/https";
// import { CiHeart } from "react-icons/ci";
import useToken from "../Hooks/useToken";
import Search from "./Search";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, useNavigate } from "react-router-dom";
// import imges from "./Index/image/page1.jpg"
export default function Products() {
  const token = useToken();
  const navigate = useNavigate();
  const search = useSelector((state) => state.user.search);
  const queryClient = useQueryClient();
  /*********** Show all products */
  const { data } = useQuery({
    queryKey: ["Searchproduct", search],
    queryFn: () => ShowProduct(token, search),
  });
  /*********** Wishlist Of Product  */
  const wishsList = useMutation({
    mutationFn: ({ token, item }) => AddWishList(token, item),
    onSuccess: (res) => {
      if (res?.data?.statuscode == 200) {
        queryClient.invalidateQueries({ queryKey: ["countwishlist"] });
        queryClient.invalidateQueries({ queryKey: ["Searchproduct", search] });
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
  /******************* Add to CART */

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

  /************************** get paginate the products  */
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const offset = currentPage * itemsPerPage;
  const currentItems = data?.data?.data.slice(offset, offset + itemsPerPage);
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  // console.log(checkWishlist?.data?.data?,"{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{");
  /********************** mutation of checkout */

  return (
    <>
      <Header />
      <div className="container-fluid p-0">
        <div className="page12">
          {/* <img src={imges} alt="" width={"100%"} height={"300px"}/> */}
        </div>
      </div>

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <h1 className="tittle-text">Products</h1>
          </div>
          <div className="col-md-6 position-relative">
            <div className="search">
              <Search />
            </div>
          </div>
          {/* /************* Products */}
          {currentItems?.map((item) => {
            return (
              <>
                <div className="col-md-3 mt-5 p-4">
                  <div className="card ">
                    <Link to={`/user/productdetails/${item?._id}`}>
                      <div className="card-img">
                        <img
                          src={`http://localhost:3000/api/${item?.image}`}
                          className="card-img-top"
                          alt="..."
                          width={100}
                        />
                        <div className="cart-box"></div>
                      </div>
                    </Link>
                    {/* ******** card body */}
                    <div className="card-body">
                      <p className="text-center text-capitalize ">
                        {item?.name}
                      </p>
                      {/* *********** price & Wishlist */}
                      <div className="price-det d-flex product-content  align-items-center">
                        <h6 className="price2">
                          <span className="text-danger">${item?.price}.00</span>
                        </h6>

                        <h6 className="wishlist">
                          {/* ***************** wishlist */}
                          {item?.Iswishlist ? (
                            <>
                              <label className="container-check">
                                <input
                                  type="checkbox"
                                  onClick={() =>
                                    wishsList.mutate({ token, item })
                                  }
                                />
                                <div className="checkmark">
                                  <svg viewBox="0 0 306 306">
                                    <rect
                                      fill="none"
                                      height="206"
                                      width="206"
                                    ></rect>
                                    <path
                                      d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z"
                                      strokeWidth="20px"
                                      // stroke="#450e13"
                                      fill="red"
                                    ></path>
                                  </svg>
                                </div>
                              </label>
                            </>
                          ) : (
                            <>
                              <label className="container-check">
                                <input
                                  type="checkbox"
                                  onClick={() =>
                                    wishsList.mutate({ token, item })
                                  }
                                />
                                <div className="checkmark">
                                  <svg viewBox="0 0 306 306">
                                    <rect
                                      fill="none"
                                      height="206"
                                      width="206"
                                    ></rect>
                                    <path
                                      d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z"
                                      strokeWidth="20px"
                                      // stroke="#450e13"
                                      fill="#fff"
                                    ></path>
                                  </svg>
                                </div>
                              </label>
                            </>
                          )}

                          {/* ********************** wsihlist */}
                        </h6>
                      </div>
                      <div className=" text-center ">
                        {/* ****************** add to cart button  */}
                        <div className="addtocart   mt-3">
                          <button
                            className="btn  button-animi me-0 text-end f-end bg-red   text-light"
                            type="button"
                            onClick={() => {
                              let body = {
                                token: token,
                                productid: item?._id,
                              };
                              AddtoCart.mutate(body);
                            }}
                          >
                            AddToCart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>

      {/* ******************** Pagination */}
      {data?.data?.data.length >= 4 ? (
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(data?.data?.data.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
          previousClassName={"previous"}
          nextClassName={"next"}
          pageClassName={"page"}
          pageLinkClassName={"page-link"}
        />
      ) : (
        ""
      )}
    </>
  );
}

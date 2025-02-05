// import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AddWishList, CategoryProduct } from "../Request/https";
import Header from "./Header";

// import { useQuery } from "@tanstack/react-query";
// import { CategoryProduct } from "../Request/https";
import { useParams } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import useToken from "../Hooks/useToken";
import Swal from "sweetalert2";

export default function Category() {
  // const id = useSelector((state) => state.user.cat_id);

  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data } = useQuery(
    {
      queryKey: ["category", id],
      queryFn: () => CategoryProduct(id),
      enabled: !!id,
    },
    [id]
  );

  console.log(data?.data?.data, "..........................................");
  /*********** Wishlist Of Product  */
  const token = useToken();
  const wishsList = useMutation({
    mutationFn: ({ token, el }) => AddWishList(token, el),
    onSuccess: (res) => {
      console.log(res, ":::::::::::::::::::::::::::::::::::>>");

      if (res?.data?.statuscode == 200) {
        queryClient.invalidateQueries({ queryKey: ["countwishlist"] });
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
  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="row d-flex">
          <div className="col-md-6">
            <h1>Category</h1>
          </div>
          <div className="col-md-6 position-relative">
            <div className="search">{/* <Search /> */}</div>
          </div>
          {/* **************** Products On category */}

          {data?.data?.data?.map((item) => {
            return (
              <>
                <p></p>
                {item?.category?.map((el) => {
                  return (
                    <>
                      <div className="col-md-3">
                        <div className="card">
                          <div className="card-img">
                            <img
                              src={`http://localhost:3000/api/${el?.image}`}
                              className="card-img-top"
                              alt="..."
                              width={100}
                            />
                            <div className="cart-box"></div>
                          </div>
                          {/* ******** card body */}
                          <div className="card-body">
                            <h4 className="text-center text-capitalize ">
                              {el?.name}
                            </h4>
                            {/* *********** price & Wishlist */}
                            <div className="price-det d-flex  align-items-center">
                              <h6>
                                Price :{" "}
                                <span className="text-danger">
                                  ${el?.price}.00
                                </span>
                              </h6>

                              <h6 className="wishlist">
                                <CiHeart
                                  onClick={
                                    () => wishsList.mutate({ token, el })
                                    //   wishsList.mutate({ token, body: item })
                                  }
                                />
                                {/* ********************** wsihlist */}
                                <label className="container-check">
                                  <input
                                    type="checkbox"
                                    // checked={isChecked}
                                    // onChange={handleCheckboxChange}
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
                                        stroke="#FFF"
                                        fill="#b9b9b9c4"
                                      ></path>
                                    </svg>
                                  </div>
                                </label>
                              </h6>
                            </div>
                            {/* ****************** add to cart button  */}
                            <div className="addtocart text-center mt-3">
                              <button
                                className="btn button  bg-warning"
                                type="button"
                              >
                                AddToCart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

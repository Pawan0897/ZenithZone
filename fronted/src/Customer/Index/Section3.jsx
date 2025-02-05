import React from "react";
import { Link } from "react-router-dom";
import imge from "../Index/image/09--298x387.jpg";
import { useQuery } from "@tanstack/react-query";
import { ShowProduct } from "../../Request/https";
import useToken from "../../Hooks/useToken";
import { useSelector } from "react-redux";

export default function Section3() {
  const token = useToken();
  const search = useSelector((state) => state.user.search);
  const { data } = useQuery({
    queryKey: ["Searchproduct", search],
    queryFn: () => ShowProduct(token, search),
  });
  console.log(data, ".......................");
  const products = data?.data?.data;
  return (
    <>
      <div className="container">
        <h1 className="text-center tittle-text mb-5 mt-5">Products</h1>
        <div className="row mb-4">
          {products?.map((item) => {
            return (
              <>
                <div className="col-md-3">
                  <div className="card-product pb-3 ">
                    <Link to={`/user/productdetails/${item?._id}`}>
                      <div className="product-img mb-2">
                        <img
                          src={`http://localhost:3000/api/${item?.image}`}
                          alt=""
                        />
                      </div>
                    </Link>
                    {/* ************** content */}
                    <div className="product-content pb-3">
                      <Link>{item?.categoryitem?.name}</Link>
                      <h3>{item?.name}</h3>
                      {/* ******************* */}
                      <span className="price">
                        <ins>
                          <span className="woocommerce-Price-amount amount">
                            <bdi>
                              <span className="woocommerce-Price-currencySymbol">
                                $
                              </span>
                              {item?.price}.99
                            </bdi>
                          </span>
                        </ins>
                        <del aria-hidden="true">
                          <span className="woocommerce-Price-amount amount">
                            <bdi>
                              <span className="woocommerce-Price-currencySymbol">
                                $
                              </span>
                              289.99
                            </bdi>
                          </span>
                        </del>{" "}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

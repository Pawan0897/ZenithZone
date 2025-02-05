import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Logout from "../Components/Logout";
import "./style.css";
import "../Components/dropdown.scss";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";
import useToken from "../Hooks/useToken";
import { useQuery } from "@tanstack/react-query";
import { cartProduct, CountWishList, ShowCategory } from "../Request/https";
import { cat_id } from "../Redux/Reducers";

// import { useRef, useState } from "react";
// import Search from "./Search";
// import { useState } from "react";
export default function Header() {
  const status = useSelector((state) => state.user.details);
  const token = useToken();
  //  const [search,setsearch] = useState("");
  const { data } = useQuery({
    queryKey: ["countwishlist"],
    queryFn: () => CountWishList(token),
  });
  //    console.log("data===============",data?.data?.data);
  const category = useQuery({
    queryKey: ["dropdown-category"],
    queryFn: () => ShowCategory(),
  });
  // *************************** click on category
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const category_id = (id) => {
    dispatch(() => cat_id(id));
    navigate(`/user/category/${id}`);
  };

  /*********************** count produccts  */
  const { data: countcart_pro } = useQuery({
    queryKey: ["countcart"],
    queryFn: () => cartProduct(token),
  });

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-red z-1 bgback text-light">
        <div className="container-fluid">
          <a className="navbar-brand text-light" href="#">
            ZenithZone
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse pe-5 justify-content-end"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav  mb-2 mb-lg-0 justify-content-center align-items-center d-flex  pe-5 text-end float-end me-5 text-light">
              <li className="nav-item">
                <Link
                  to={"/home"}
                  className="nav-link text-light active"
                  aria-current="page"
                  href="#"
                >
                  Home
                </Link>
              </li>
              {/* ******************** Product LI list */}

              <li className="nav-item">
                <Link
                  to={"/user/product"}
                  className={`${
                    location.pathname == "/user/product" ? "text-ch" : ""
                  }  nav-link text-light`}
                  href="#"
                >
                  Product
                </Link>
              </li>
              <li>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Category
                  </button>
                  <ul className="dropdown-menu">
                    {category?.data?.data?.data?.map((item) => {
                      return (
                        <>
                          <li
                            className="text-start"
                            type="text"
                            value={item?._id}
                            onClick={() => category_id(item?._id)}
                          >
                            👉🏼 {item?.name}
                          </li>
                        </>
                      );
                    })}
                  </ul>
                </div>
              </li>
              {/* ********************* dropdown category list*/}

              {/* **************************** Add to cart Icon */}

              <li className="nav-item cart-nav">
                <Link to={"/user/cartproduct"}>
                  <div className="cart ms-3">
                    <PiShoppingCartSimpleLight className="text-light" />{" "}
                    <span className="bg-light text-light">
                      {countcart_pro?.data?.data}
                    </span>
                  </div>
                </Link>
              </li>

              {/* ********************************** heart wishlist icon */}
              <li className="nav-item cart-nav">
                <Link to={"/user/wishlist"}>
                  <div className="cart ms-3">
                    <CiHeart className="text-light" />
                    <span className="bg-light text-light">
                      {data?.data?.data ? data?.data?.data : 0}
                    </span>
                  </div>
                </Link>
              </li>

              {/* ********************* end  */}
              {/* ******************* Logout button  */}

              {status?.status == "active" ? (
                <li className="nav-item ms-4">
                  <Logout />
                </li>
              ) : (
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link text-light ms-4" href="#">
                    Login
                  </Link>
                </li>
              )}
              {/* 
              <li className="nav-item">
               <Link>
              <Search />
               </Link>
              </li> */}
            </ul>

            {/* <div className="search-wrapper">
                <div className="input-holder">
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Type to search"
                  />
                  <button
                    className="search-icon"
                    onClick={SearchToggle(this, event)}
                  >
                    <span></span>
                  </button>
                </div>
                <span
                  className="close"
                  onClick={SearchToggle(this, event)}
                ></span>
              </div> */}
            {/* <input
                className="form-control me-2"
                type="search"
                onChange={(e) => setsearch(e.target.value)}
                placeholder="Search"
                aria-label="Search"
              /> */}
          </div>
        </div>
      </nav>
    </>
  );
}

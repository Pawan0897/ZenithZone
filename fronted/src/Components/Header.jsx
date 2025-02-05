import { Link } from "react-router-dom";
// import "./style.css";


import "./dropdown.scss";

export default function Header() {


  return (
    <>
      <nav className="navbar navbar-expand-lg bgback bg-red text-light">
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
            <ul className="navbar-nav  mb-2 mb-lg-0  pe-5 text-end float-end me-5 text-light">
              <li className="nav-item">
                <Link
                  to={"/"}
                  className="nav-link text-light active"
                  aria-current="page"
                  href="#"
                >
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/login"} className="nav-link text-light" href="#">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/signup"} className="nav-link text-light" href="#">
                  Signup
                </Link>
              </li>

            </ul>
            {/* <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form> */}
          </div>
        </div>
      </nav>
    </>
  );
}

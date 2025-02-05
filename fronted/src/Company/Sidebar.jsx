import { Link } from "react-router-dom";
import Logout from "../Components/Logout";

export default function Sidebar() {
  return (
    <>
     <div className="sidebar">
              <div className="sidebar-header">
                <h2>ZenithZone</h2>
                <p>Company</p>
              </div>
              <ul className="sidebar-menu">
                <li className="sidebar-item">
                  <Link to={"/company/dashboard"} className="sidebar-link">
                    <i className="bx bxs-dashboard"></i>
                    <span className="link-text">Dashboard</span>
                  </Link>
                </li>
                {/* <li className="sidebar-item">
                  <Link to={"/company/user"} className="sidebar-link">
                    <i className="bx bxs-user"></i>
                    <span className="link-text">Users</span>
                  </Link>
                </li> */}
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link">
                    <i className="bx bxs-cog"></i>
                    <span className="link-text">Settings</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <Link to={"/company/addbrand"} className="sidebar-link">
                    <i className="bx bxs-chart"></i>
                    <span className="link-text">Add Brand</span>
                  </Link>
                </li>
                <li className="sidebar-item">
                  <Link to={"/company/order"} className="sidebar-link">
                    <i className="bx bxs-chart"></i>
                    <span className="link-text">Orders</span>
                  </Link>
                </li>
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link">
                    <i className="bx bxs-message"></i>
                    <span className="link-text">Messages</span>
                  </a>
                </li>

                <li className="ms-3">
                  <a>
                    <Logout />
                  </a>
                </li>
              </ul>
            </div>
      
    </>
  )
}

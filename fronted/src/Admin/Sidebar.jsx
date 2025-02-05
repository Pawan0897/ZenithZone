import { Link } from "react-router-dom"
import Logout from "../Components/Logout"
import "./style.css"
export default function Sidebar() {
    return (
      <>
       <div className="sidebar">
                <div className="sidebar-header">
                <h2>ZenithZone</h2>
                <p>Admin</p>
                </div>
                <ul className="sidebar-menu">
                  <li className="sidebar-item">
                    <Link to={"/admin/dashboard"} className="sidebar-link">
                      <i className="bx bxs-dashboard"></i>
                      <span className="link-text">Dashboard</span>
                    </Link>
                  </li>
                  <li className="sidebar-item">
                    <Link to={"/admin/addreason"} className="sidebar-link">
                      <i className="bx bxs-user"></i>
                      <span className="link-text">Add Reason </span>
                    </Link>
                  </li>
                  <li className="sidebar-item">
                    <Link to={"/admin/addcategory"} className="sidebar-link">
                      <i className="bx bxs-user"></i>
                      <span className="link-text">Add Category </span>
                    </Link>
                  </li>
                  <li className="sidebar-item">
                    <Link to={"/admin/viewuser"} className="sidebar-link">
                      <i className="bx bxs-user"></i>
                      <span className="link-text">View User</span>
                    </Link>
                  </li>
                  <li className="sidebar-item">
                    <a href="#" className="sidebar-link">
                      <i className="bx bxs-cog"></i>
                      <span className="link-text">Settings</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <Link to={"/admin/order"} className="sidebar-link">
                      <i className="bx bxs-dashboard"></i>
                      <span className="link-text">Orders</span>
                    </Link>
                  </li>
                  <li className="sidebar-item">
                    <Link to={"/admin/orderdetail"} className="sidebar-link">
                      <i className="bx bxs-dashboard"></i>
                      <span className="link-text">Order Details</span>
                    </Link>
                  </li>
                  <li className="sidebar-item">
                    <a href="#" className="sidebar-link">
                      <i className="bx bxs-chart"></i>
                      <span className="link-text">Reports</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a href="#" className="sidebar-link">
                      <i className="bx bxs-message"></i>
                      <span className="link-text">Messages</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                  <a>
                  <Logout />
                  </a>
                  </li>
                </ul>
              </div>
        
      </>
    )
  }
  
import { useQuery } from "@tanstack/react-query";
import Sidebar from "./Sidebar";
import useToken from "../Hooks/useToken";
import { AdminOrder } from "../Request/https";
import { Link, useNavigate } from "react-router-dom";

export default function Orders() {
  const token = useToken();
  const { data } = useQuery({
    queryKey: ["adminorderlist"],
    queryFn: () => AdminOrder(token),
  });
  const navigate = useNavigate();
  const order = data?.data?.data;
  console.log(order, "............................");
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            <Sidebar />
          </div>
          {/* 
          <div className="col-md-8 ms-5">
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <div className="info-box">
                    <div className="icon">📦</div>
                    <div className="title">Total Orders</div>
                    <div className="number">150</div>
                    <div className="description">
                      Total number of orders placed this month.
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="info-box">
                    <div className="icon">💰</div>
                    <div className="title">Total Revenue</div>
                    <div className="number">$12,000</div>
                    <div className="description">
                      Total revenue generated from orders this month.
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="info-box">
                    <div className="icon">👥</div>
                    <div className="title">New Customers</div>
                    <div className="number">30</div>
                    <div className="description">
                      Number of new customers acquired this month.
                    </div>
                  </div>
                </div>
                <div className="infographic-container">
                  <div className="step-number">01</div>
                  <div className="step-content">
                    <h2 className="step-title">FIRST OPTION INFOGRAPHICS</h2>
                    <p className="step-description">
                      {" "}
                      This is a description of the first option infographic,
                      detailing its features and benefits.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-12 mt-5">
              <div className="mb-3 mt-5 card32 card12">
                <div className="no-gutters row">
                  <div className="col-sm-12">
                    <div className="card no-shadow rm-border bg-transparent widget-chart text-left">
                      <table className="table no-shadow bg-transparent table-bordered">
                        <thead>
                          <tr>
                            <th scope="col">Customer</th>
                            <th scope="col">Orders</th>
                            <th scope="col">Products</th>
                            <th scope="col">Total price</th>
                            <th scope="col">Payment Method</th>
                            <th scope="col"></th>
                            <th scope="col">Products</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="divider m-0 d-md-none d-sm-block"></div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          <div className="col-md-8">
            <h2 className="text-center mt-5">Table #06</h2>
            <h4 className="text-center">Table Accordion</h4>
            <table className="table table-bordered table-hover mt-4">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Customer</th>
                  <th scope="col">Products</th>
                  <th scope="col">Total</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {order?.map((item) => {
                  console.log(item, ".orers.../////////////////////");

                  return (
                    <>
                      <tr
                        onClick={() =>
                          navigate("/admin/orderdetail", {
                            state: { item },
                          })
                        }
                      >
                        <td>
                          {item?.user?.firstname} {item?.user?.lastname}
                        </td>
                        <td>{item?.product?.length}</td>
                        <td>${item?.totalprice}.00</td>
                        <td>📜</td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
            <div className="text-right mt-3">
              <button className="btn btn-primary">Checkout</button>
            </div>
          </div>
        </div>
      </div>

      {/* ************************ */}
    </>
  );
}

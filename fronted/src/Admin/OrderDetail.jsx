import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import moment from "moment";
export default function OrderDetail() {
  const location = useLocation();
  console.log(location, "...................................");

  const order_det = location?.state?.item;
  return (
    <>
      <div className="conatiner">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <div className="container">
              <div className="invoice-box">
                <div className="invoice-header">
                  <h1>INVOICE</h1>
                  <img
                    src="https://via.placeholder.com/50"
                    alt="Logo"
                    className="invoice-logo"
                  />
                </div>

                <div className="row mb-4">
                  <div className="col-md-6">
                    <p>
                      <strong>Customer ID:</strong> #{order_det?.user?._id}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {moment(order_det?.orderDate).format("llll")}
                    </p>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-md-6">
                    <h5>Order Customer:</h5>
                    <p>Name: {order_det?.address?.name}</p>
                    <p>
                      Address: {order_det?.address?.fulladdress},{" "}
                      {order_det?.address?.state} , {order_det?.address?.city},
                      (Pincode. {order_det?.address?.pincode})
                    </p>
                    <p>Phone No: {order_det?.address?.phone}</p>
                    <p>Email Address: {order_det?.user?.email}</p>
                  </div>
                  <div className="col-md-6 text-md-end">
                    <h5>Owner Details:</h5>
                    <p>
                      Name: {order_det?.company_det?.firstname}{" "}
                      {order_det?.company_det?.lastname}
                    </p>

                    <p>Phone No: {order_det?.company_det?.phone}</p>
                    <p>Email Address: {order_det?.company_det?.email}</p>
                  </div>
                </div>

                <table className="table table-bordered">
                  <thead className="table-light">
                    <tr>
                      <th>image</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Category</th>
                 
                      <th>Quantity</th>
                     
                    </tr>
                  </thead>
                  <tbody>
                    {order_det?.productDetails?.map((item) => {
                      return (
                        <>
                          <tr>
                            <td>
                              <img
                                src={`http://localhost:3000/api/${item?.image}`}
                                alt=""
                                width={"100"}
                              />
                            </td>
                            <td>{item?.name}</td>
                            <td>${item?.price}.00</td>
                            <td>{order_det?.categoryinfo?.name}</td>
                            <td>{item?.quantity}</td>
                           
                          </tr>
                        </>
                      );
                    })}
                    
                  </tbody>
                </table>

                <div className="row mb-4">
                  <div className="col-md-6">
                    <h6>Total Amount: ${order_det?.totalprice}.00</h6>
                  </div>
                  <div className="col-md-6 text-md-end">
                    <h6>Received From:</h6>
                    <p>{order_det?.MethodToUsePay}</p>
                    <p>If Check, mention check details.</p>
                  </div>
                </div>

                <div className="text-end">
                  <p>Signature of Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

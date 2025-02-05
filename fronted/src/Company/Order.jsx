import { useQuery } from "@tanstack/react-query";
import Sidebar from "./Sidebar";
import { companyOrder } from "../Request/https";
import useToken from "../Hooks/useToken";

function Order() {
  const token = useToken();
  const { data } = useQuery({
    queryKey: ["orderget"],
    queryFn: () => companyOrder(token),
  });
  console.log(
    data?.data?.data,
    ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>**********************************"
  );
  const orders = data?.data?.data;
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="offset-md-2 col-md-7">
            <h2>Orders</h2>
            <div className="order-table">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Phone no.</th>
                    <th scope="col">Order Date</th>
                    <th scope="col">Total Amount</th>
                    <th scope="col">Payment method</th>
                    <th scope="col">Shipping Address</th>
                    <th scope="col">Item orders</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((item) => {
                    return (
                      <>
                        <tr>
                          <td style={{ width: "150px" }}>
                            <img
                              src={`http://localhost:3000/api/${item?.orderproducts?.image}`}
                              width={"100%"}
                              alt=""
                            />
                          </td>
                          <td>{item?.address?.name}</td>
                          <td>{item?.address?.phone}</td>
                          <td>{item?.orderDate}</td>
                          <td>${item?.totalprice}.00</td>

                          <td>{item?.MethodToUsePay}</td>
                          <td>
                            {item?.address?.fulladdress},{item?.address?.state},
                            {item?.address?.city}
                          </td>
                          <td>
                            {item?.product?.quantity}{" "}
                            {item?.orderproducts?.name}
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Order;

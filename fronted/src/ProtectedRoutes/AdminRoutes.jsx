import { Route, Routes } from "react-router-dom";
import Dasboard from "../Admin/Dasboard";
import ViewUser from "../Admin/ViewUser";
import AddReason from "../Admin/AddReason";
import AddCategory from "../Admin/AddCategory";
import Orders from "../Admin/Orders";
import OrderDetail from "../Admin/OrderDetail";

export default function AdminRoutes() {
  return (
    <>
      {/************* Admin rotes */}
      <Routes>
        <Route path="/dashboard" element={<Dasboard />} />
        <Route path="/viewuser" element={<ViewUser />} />
        <Route path="/addreason" element={<AddReason />} />
        <Route path="/addcategory" element={<AddCategory />} />
        <Route path="/order" element={<Orders />} />
        <Route path="/orderdetail" element={<OrderDetail />} />
      </Routes>
    </>
  );
}

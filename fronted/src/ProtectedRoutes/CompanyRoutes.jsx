import { Route, Routes } from "react-router-dom";
import Dashboard from "../Company/Dashboard";
import User from "../Company/User";
import AddBrand from "../Company/AddBrand";
import Order from "../Company/Order";

export default function CompanyRoutes() {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user" element={<User />} />
        <Route path="/addbrand" element ={<AddBrand />}/>
        <Route path="/order" element ={<Order />}/>
      </Routes>
    </>
  );
}

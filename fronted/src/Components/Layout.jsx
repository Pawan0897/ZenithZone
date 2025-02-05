import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./Index";
import Login from "./Login";
import OtpVerify from "../Forget/OtpVerify";
import Signup from "./Signup";
import ConformPassword from "../Forget/ConformPassword";
import ForgetPassword from "../Forget/ForgetPassword";
import {
  ProtectedAdmin,
  ProtectCompany,
  ProtectCustomer,
  CustomerProtect,
} from "../ProtectedRoutes/ProtectedRoutes";
import AdminRoutes from "../ProtectedRoutes/AdminRoutes";
import CustomerRoutes from "../ProtectedRoutes/CustomerRoutes";
import CompanyRoutes from "../ProtectedRoutes/CompanyRoutes";
import VerifyUserOtp from "../VerifyUser/VerifyUserOtp";
import VerifyUser from "../VerifyUser/VerifyUser";

export default function Layout() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/*************** admin route */}
          <Route path="*" element={<ProtectedAdmin />}>
            <Route path="admin/*" element={<AdminRoutes />} />
          </Route>
          {/*********** user or customer */}
          <Route path="*" element={<ProtectCustomer />}>
            <Route path="user/*" element={<CustomerRoutes />} />
          </Route>

          {/******************** company routes */}
          <Route path="*" element={<ProtectCompany />}>
            <Route path="company/*" element={<CompanyRoutes />} />
          </Route>
          {/* *******************  usercurtomer */}
          <Route>
            <Route path="/" element={<CustomerProtect />} />
          </Route>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* /******************** forget password */}
          <Route path="/sendverifyotp" element={<OtpVerify />} />
          <Route path="/newpassword" element={<ConformPassword />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />

          {/* /***************  If user is not verified  */}
          <Route path="/verify" element={<VerifyUserOtp />} />
          <Route path="/senduserotp" element={<VerifyUser />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

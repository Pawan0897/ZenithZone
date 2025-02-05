import { Navigate, Outlet } from "react-router-dom";

import useRole from "../Hooks/useRole";
import { Roles } from "../Role/role";
import useToken from "../Hooks/useToken";

export const ProtectedAdmin = () => {
  const role = useRole();
  const token = useToken();

  if (token) {
    if (role == Roles?.COMPANY) {
      return <Navigate to={"/company/dashboard"} replace={true} />;
    } else if (role == Roles?.CUSTOMER) {
      return <Navigate to={"/user/home"} replace={true} />;
    } else {
      return <Outlet />;
    }
  } else {
    return <Navigate to={"/login"} replace={true} />;
  }
};

/****************** protect company */
export const ProtectCompany = () => {
  const role = useRole();
  const token = useToken();
  if (token) {
    if (role == Roles?.ADMIN) {
      return <Navigate to={"/admin/dashboard"} replace={true} />;
    } else if (role == Roles?.CUSTOMER) {
      return <Navigate to={"/user/home"} replace={true} />;
    } else {
      return <Outlet />;
    }
  } else {
    return <Navigate to={"/login"} replace={true} />;
  }
};

/************************* protect User */

export const ProtectCustomer = () => {
  const role = useRole();
  const token = useToken();

  if (token) {
    if (role == Roles?.ADMIN) {
      return <Navigate to={"/admin/dashboard"} replace={true} />;
    } else if (role == Roles?.COMPANY) {
      return <Navigate to={"/company/dashboard"} replace={true} />;
    } else {
      return <Outlet />;
    }
  } else {
    return <Navigate to={"/login"} replace={true} />;
  }
};

/*******************without or with login  Protect punblichk page */

export const CustomerProtect = () => {
  const role = useRole();
  const token = useToken();

  if (token) {
    if (role == Roles?.ADMIN) {
      return <Navigate to={"/admin/dashboard"} replace={true} />;
    } else if (role == Roles?.COMPANY) {
      return <Navigate to={"/company/dashboard"} replace={true} />;
    } else if (role == Roles?.CUSTOMER) {
      return <Navigate to={"/user/home"} replace={true} />;
    } else {
      return <Outlet />;
    }
  } else {
    return <Navigate to={"/login"} replace={true} />;
  }
};

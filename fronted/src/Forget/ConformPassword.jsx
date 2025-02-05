import { useFormik } from "formik";
import Header from "../Components/Header";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { NewPassword } from "../Request/https";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import useDetails from "../Hooks/useDetails";

/****** use email from reducer to change apassword  */
export default function ConformPassword() {
  // const email = useDetails();
  // console.log(email?.email);

  const email = useSelector((state) => state.user.changePassId);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      password: "",
      email: email,
      conformpassword: "",
    },
    validationSchema: yup.object({
      password: yup.string().required(),
      conformpassword: yup.string().required(),
    }),
    onSubmit: (values) => {
      if (values?.password === values?.conformpassword) {
        updatepassword.mutate(values);
      } else {
        console.log("not kok");
      }
    },
  });
  const updatepassword = useMutation({
    mutationFn: (values) => NewPassword(values),
    onSuccess: (res) => {
      console.log(res);

      if (res?.data?.statuscode == 200) {
        Swal.fire({
          title: `${res?.data?.message}`,
          icon: "success",
        });
        navigate("/login");
      }
    },
  });
  return (
    <>
      <Header />
      {/* /***************************** */}
      <div className="password-reset-container">
        <h3>Reset Your Password</h3>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              value={formik?.values?.password}
              onChange={formik?.handleChange}
              name="password"
              className="form-control"
              id="Password"
              placeholder="Enter your new password"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              name="conformpassword"
              value={formik?.values?.conformpassword}
              onChange={formik?.handleChange}
              className="form-control"
              id="confirmPassword"
              placeholder="Re-enter your new password"
            />
          </div>
          <button type="submit" className="btn btn-danger w-100">
            Update Password
          </button>
          <div className="form-footer mt-3">
            <p>
              Remembered your password?{" "}
              <a href="/login" className="text-danger fw-bold">
                Log in
              </a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

import { useFormik } from "formik";
import "../css/sidebar.css"; // Ensure this is the correct path to your CSS file
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { loginuser } from "../Request/https";
import Swal from "sweetalert2";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { Roles } from "../Role/role";
import { useDispatch } from "react-redux";
import { userInfo } from "../Redux/Reducers";
export default function Login() {
  /************************ using redux */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email().required(),
      password: yup.string().required(),
    }),
    onSubmit: (values) => userlogin.mutate(values),
  });
  const userlogin = useMutation({
    mutationFn: (values) => loginuser(values),
    onSuccess: (res) => {
      if (res?.data?.statuscode == 200) {
        Swal.fire({
          title: "successfully login !!!!",
          text: "You are login successfuly !!",
          icon: "success",
        });
        console.log(res?.data?.data);
        /************** store the data in redux */
        dispatch(userInfo(res?.data?.data));

        /************** Check the role of the lomgin  */
        if (res?.data?.data.role == Roles?.ADMIN) {
          navigate("/admin/dashboard");
        } else if (res?.data?.data?.role == Roles?.COMPANY) {
          navigate("/company/dashboard");
        } else if (res?.data?.data?.role == Roles?.CUSTOMER) {
          navigate("/user/home");
        }
      } else if (res?.data?.statuscode == 401 ) {
        /***************************  check the use is valid means it  verified  ??*/
        Swal.fire({
          title: `${res?.data?.message}`,
          icon: "error",
        });
        console.log(res?.data?.data?.isValid, "??????????????????????????/");
        navigate("/senduserotp");
      } else {
        console.log(res?.data);
        Swal.fire({
          title: `${res?.data?.message}`,
          icon: "error",
        });
        navigate("/login");
      }
    },
  });
  /************************** */
  const forget = () => {
    localStorage.setItem("email", formik?.values?.email);
    const pk = localStorage.getItem("email");
    console.log(pk);
    navigate("/forgetpassword");
  };

  return (
    <>
      <Header />

      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          {/* Main Content */}
          <div className="col-lg-4 col-md-5 m-auto pt-5 mt-5 text-light">
            <div className="wrapper p-5 text-light">
              <span className=" rotate-bg bg-red text-light "></span>
              <div className="form-box ">
                <h2 className="title text-light ">Login </h2>
                <form>
                  <div className="row">
                    {/******************* email name */}
                    <div className="col-md-12">
                      <div className="input-box mt-2 text-start text-light">
                        <label className="mb-2 text-light">email</label>
                        <input
                          type="text"
                          name="email"
                          value={formik?.values?.email}
                          onChange={formik?.handleChange}
                          className="border-0"
                        />
                        {formik?.errors?.email && (
                          <p className="text-dark">{formik?.errors?.email}</p>
                        )}
                      </div>
                    </div>
                    {/******************* password name */}
                    <div className="col-md-12">
                      <div className="input-box mt-2 text-start text-light">
                        <label className="mb-2 text-light">password</label>
                        <input
                          type="password"
                          name="password"
                          value={formik?.values?.password}
                          onChange={formik?.handleChange}
                          className="border-0"
                        />
                        {formik?.errors?.password && (
                          <p className="text-dark">
                            {formik?.errors?.password}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

        
                  <button
                    type="button"
                    className="btn text-light buttonSignup"
                    onClick={formik.handleSubmit}
                  >
                    Signin
                  </button>
                  {/* ******************** login button */}
                  <div className="linkTxt">
                    <p>
                      Don’t have an account?{" "}
                      <a
                        href="#"
                        className="register-link"
                        onClick={() => {
                          forget();
                        }}
                      >
                        forget password
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

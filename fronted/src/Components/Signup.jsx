import "bootstrap/dist/css/bootstrap.min.css";
import "../css/style.css";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as yup from "yup";
import { addusers } from "../Request/https";
import Swal from "sweetalert2";
import Header from "./Header";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Link, useNavigate } from "react-router-dom";
export default function Signup() {
  const navigate = useNavigate("");
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      password: "",
      role: "",
    },
    validationSchema: yup.object({
      firstname: yup.string().required("fill the firstname !!!"),
      lastname: yup.string().required("enter Your lastname !!!!"),
      email: yup.string().email().required("fill th email !!"),
      phone: yup.string().required(),
      password: yup.string().required("Fill the password !!"),
      role: yup.string().required(" Select your role !!"),
    }),
    onSubmit: (values) => {
      userSignup.mutate(values);
    },
  });
  /*********************** use mutation  */
  const userSignup = useMutation({
    mutationFn: (values) => addusers(values),
    onSuccess: (res) => {
      if (res?.data?.statuscode == 200) {
        formik.resetForm();
        Swal.fire({
          title: `${res?.data?.message} !!!!!`,
          text: "Please verify you are valid  !!!!!",
          icon: "success",
        });
        navigate("/verify");
      } else {
        console.log(res);
        Swal.fire({
          title: `${res?.data?.message}`,
          text: "Please try other email!",
          icon: "error",
        });
      }
    },
  });

  console.log(formik);

  return (
    <>
      <Header />

      <div className="container-fluid mb-5 pb-5">
        <div className="row">
          {/* Sidebar */}
          {/* Main Content */}
          <div
            className="col-lg-4 col-md-5 m-auto pt-5 mt-5
          "
          >
            <div className="wrapper p-5">
              <span className="rotate-bg"></span>
              <div className="form-box ">
                <h2 className="title text-light ">Signup</h2>
                <form>
                  <div className="row">
                    {/******************* first name */}
                    <div className="col-md-12">
                      <div className="input-box mt-3 text-start">
                        <label className=" text-light text-capitalize">
                          firstname
                        </label>
                        <input
                          type="text"
                          className="border-0"
                          name="firstname"
                          value={formik?.values?.firstname}
                          onChange={formik?.handleChange}
                        />
                        {formik?.errors?.firstname && (
                          <p className="text-dark">
                            {formik?.errors?.firstname}
                          </p>
                        )}
                      </div>
                    </div>
                    {/******************* last name */}
                    <div className="col-md-12">
                      <div className="input-box mt-2 text-start">
                        <label className="mb-2 text-light text-capitalize">
                          lastname
                        </label>
                        <input
                          type="text"
                          name="lastname"
                          value={formik?.values?.lastname}
                          onChange={formik?.handleChange}
                          className="border-0"
                        />
                        {formik?.errors?.lastname && (
                          <p className="text-dark">
                            {formik?.errors?.lastname}
                          </p>
                        )}
                      </div>
                    </div>
                    {/******************* email name */}
                    <div className="col-md-12">
                      <div className="input-box mt-2 text-start">
                        <label className="mb-2 text-light text-capitalize">
                          email
                        </label>
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
                    {/******************* Phone */}
                    <div className="col-md-12">
                      <div className="input-box mt-2 text-start">
                        <label className="mb-2 text-bg text-capitalize">
                          Phone no.
                        </label>
                        <PhoneInput
                          className="border-0 "
                          onChange={(phone) =>
                            formik?.setFieldValue("phone", phone)
                          }
                          value={formik?.values?.phone}
                          type="number"
                          country={"pk"}
                          inputProps={{
                            name: "phone",
                            Placeholder: "",
                          }}
                          //   value={formikin.values.phone}
                          inputStyle={{
                            width: "100%",
                            height: "11%",
                          }}
                        />
                      </div>
                    </div>
                    {/******************* password name */}
                    <div className="col-md-12">
                      <div className="input-box mt-2 text-start">
                        <label className="mb-2 text-bg text-capitalize">
                          password
                        </label>
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
                    {/******************* role */}
                    <div className="col-md-12">
                      <div className="input-box mt-2 text-start">
                        <label className="mb-2 text-bg text-capitalize">
                          role
                        </label>
                        <select
                          className="form-select form-control "
                          name="role"
                          value={formik?.values?.role}
                          onChange={formik?.handleChange}
                          aria-label="Default select example"
                        >
                          <option selected> select role</option>
                          <option value="user">User</option>
                          <option value="company">Company</option>
                        </select>
                        {formik?.errors?.role && (
                          <p className="text-dark">{formik?.errors?.role}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* ********************* Signup */}
                  <button
                    type="button"
                    className="btn  mt-5 text-light buttonSignup"
                    onClick={() => formik.handleSubmit()}
                  >
                    Singup
                  </button>
                  {/* <button
                    type="button"
                    className="btn bg-danger mt-5 text-light"
                    onClick={() => formik.handleSubmit()}
                  >
                    Signup
                  </button> */}
                  {/* ******************** login button */}
                  <div className="linkTxt">
                    <p>
                      Don’t have an account?{" "}
                      <Link href="#" to={"/login"} className="register-link">
                        login
                      </Link>
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

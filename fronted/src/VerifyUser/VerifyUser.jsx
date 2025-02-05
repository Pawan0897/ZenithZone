import { useState } from "react";
import Header from "../Components/Header";
import PhoneInput from "react-phone-input-2";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { UserOTP } from "../Request/https";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function VerifyUser() {
  const [show, setshow] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      phone: "",
    },
    validationSchema: yup.object({
      email: yup.string().email(),
      phone: yup.string(),
    }),
    onSubmit: (values) => OTPsend.mutate(values),
  });
  /********************* */
  const OTPsend = useMutation({
    mutationFn: (values) => UserOTP(values),
    onSuccess: (res) => {
      if (res?.data?.statuscode == 200) {
        Swal.fire({
          title: `${res?.data?.message}`,
          text: "please verify Now !!",
          icon: "success",
        });
        navigate("/verify");
      } else {
        Swal.fire({
          title: `${res?.data?.message}`,
          text: "Please Try Again !!",
        });
      }
    },
  });
  return (
    <>
      <Header />
      <div className="container-fluid bg-light  ">
        <div className="row mt-3  ">
          <div className="col-md-4 mt-4 m-auto">
            <div className="card shadow p-5 rounded-4">
              <div className="text-center">
                <img
                  src="https://via.placeholder.com/100"
                  alt="Logo"
                  className="mb-3 rounded-circle"
                />
                <h3 className="fw-bold mb-3">Verified</h3>
              </div>
              <div className="button text-center mb-3 b-flex">
                {!show ? (
                  <>
                    <button
                      className="btn bg-danger text-light "
                      type="button"
                      onClick={() => setshow(true)}
                    >
                      Via Mail
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn bg-danger text-light"
                      type="button"
                      onClick={() => setshow(false)}
                    >
                      Via SMS
                    </button>
                  </>
                )}
              </div>
              <form id="forgotPasswordForm">
                {/* /********************** Email */}
                {show ? (
                  <>
                    <div className="mb-3">
                      <label className="form-label">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Enter your email"
                        name="email"
                        value={formik?.values?.email}
                        onChange={formik?.handleChange}
                      />
                      <div id="emailFeedback" className="invalid-feedback">
                        {formik.errors?.email}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/********************** phone  */}
                    <div className="mb-3">
                      <label className="form-label">Phone no.</label>
                      <PhoneInput
                        className="border-0 "
                        type="number"
                        country={"pk"}
                        inputProps={{
                          name: "phone",
                          Placeholder: "",
                        }}
                        value={formik?.values?.phone}
                        onChange={(phone) =>
                          formik?.setFieldValue("phone", phone)
                        }
                        inputStyle={{
                          width: "100%",
                          height: "11%",
                        }}
                      />

                      {formik?.errors?.phone && <p>{formik?.errors?.phone}</p>}
                    </div>
                  </>
                )}

                {/* ***************************  Phone input */}

                {/* ************************** phone input */}
                <button
                  type="button"
                  className="btn bg-danger mt-3 text-light w-100"
                  onClick={formik?.handleSubmit}
                >
                  Send OTP
                </button>
              </form>
              <div className="text-center mt-4">
                <a
                  href="login.html"
                  className="text-decoration-none text-primary "
                >
                  Back to Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


import OtpInput from "react-otp-input";
import Header from "../Components/Header";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { optverify } from "../Request/https";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function VerifyUserOtp() {
    const navigate = useNavigate();
    const formik = useFormik({
      initialValues: {
        otp: "",
      },
      validationSchema: yup.object({
        otp: yup.string().required("Please fill OTP !!"),
      }),
      onSubmit: (values) => otpverification.mutate(values),
    });
  
    const otpverification = useMutation({
      mutationFn: (values) => optverify(values),
      onSuccess: (res) => {
        if (res?.data?.statuscode == 200) {
          Swal.fire({
            title: `${res?.data?.message}`,
            text: "you are varified successfully !!!!",
            icon: "success",
          });
         navigate("/login");
        } else {
          Swal.fire({
            title: `${res?.data?.message}`,
            text: "Please varified !!!!",
            icon: "error",
          });
        }
      },
    });
  return (
    <>
    <Header />
    <div className="container">
        <div className="row">
          <div className="col-md-4 text-center m-auto offset-md-4">
            <div className="otp text-center m-auto d-flex justify-content-center">
              <div className="otp-wrapper">
                <div className="otp-card">
                  {/* Logo/Header */}
                  <div className="otp-header">
                    <img
                      src="https://via.placeholder.com/50" // Replace with your logo
                      alt="Logo"
                      className="otp-logo"
                    />
                    <h1 className="otp-title">Enter Verification Code</h1>
                  </div>

                  {/* Instructions */}
                  <p className="otp-instructions">
                    A 4-digit code was sent to your registered email/phone.
                    Enter it below.
                  </p>

                  {/* OTP Input */}
                  <div className="otp-input-container">
                    <OtpInput
                      value={formik?.values?.otp}
                      onChange={(otp) => formik?.setFieldValue("otp", otp)}
                      numInputs={5}
                      name="otp"
                      inputType="text"
                      renderInput={(props) => (
                        <input
                          {...props}
                          type="text"
                          className="otp-input-field"
                          name="otp"
                        />
                      )}
                      inputStyle="otp-input-field"
                      containerStyle="otp-inputs"
                    />
                    {formik?.errors?.otp && (
                      <p className="text-danger">{formik?.errors?.otp}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    className="otp-submit-btn"
                    type="button"
                    disabled={formik?.values?.otp.length < 5}
                    onClick={() => formik?.handleSubmit()}
                  >
                    Verify Code
                  </button>

                  {/* Resend Code */}
                  <p className="otp-resend-text">
                    receive a code?{" "}
                    <a href="#" className="otp-resend-link">
                      Resend
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  )
}

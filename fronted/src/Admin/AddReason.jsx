
import { useFormik } from "formik";
import * as yup from "yup";
import useDetails from "../Hooks/useDetails";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Addreason } from "../Request/https";
import Sidebar from './Sidebar';
export default function AddReason() {
    const userId = useDetails();
    const _id = userId?._id;
    const formik = useFormik({
      initialValues: {
        createdBy: _id,
        reason: "",
      },
      validationSchema: yup.object({
        reason: yup.string().required(),
      }),
      onSubmit: (values) => AddReason.mutate(values),
    });
  
    const AddReason = useMutation({
      mutationFn: (values) => Addreason(values),
      onSuccess: (res) => {
        if (res?.data?.statuscode == 200) {
          Swal.fire({
            title: `${res?.data?.message}`,
            text: "Your Reason is add successfully !!",
            icon: "success",
          });
          formik.resetForm()
        } else {
          Swal.fire({
            title: `${res?.data?.message}`,
            text: "something erong !!",
            icon: "error",
          });
        }
      },
    });
  return (
    <>
    <div className="container">
        <div className="row">
            <div className="col-md-2">
                <Sidebar />

            </div>
            <div className="col-md-10">
            <div className="add-reason-container mt-5">
              <h2 className="form-heading text-danger">Add a New Reason</h2>

              <form>
                <div className="mb-3">
                  <label className="form-label">Reason Description</label>
                  <textarea
                    className="form-control"
                    id="reasonDescription"
                    name="reason"
                    onChange={formik?.handleChange}
                    value={formik?.values?.reason}
                    rows="4"
                    placeholder="Describe the reason"
                    required
                  ></textarea>
                  {formik?.errors?.reason && (
                    <p className="text-danger">{formik?.errors?.reason}</p>
                  )}
                </div>
                {/* <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select className="form-select" id="reasonCategory" required>
                    <option selected disabled value="">
                      Select a category
                    </option>
                    <option value="personal">Personal</option>
                    <option value="work">Work</option>
                    <option value="other">Other</option>
                  </select>
                </div> */}
                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => formik?.handleSubmit()}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
            </div>
        </div>
    </div>
      
    </>
  )
}

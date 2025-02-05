import { Button, Modal } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { useState } from "react";
import useToken from "../Hooks/useToken";
import { useFormik } from "formik";
import * as yup from "yup";
import { AddUserBrand, GetBrand } from "../Request/https";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Profile from "./Profile";
export default function AddBrand() {
  const token = useToken();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const queryclient = useQueryClient();
  /************************* Query */
  const { data } = useQuery({
    queryKey: ["getbrand"],
    queryFn: () => GetBrand(token),
  });
  /************************ formik */
  const formik = useFormik({
    initialValues: {
      name: "",
      createdBy: token,
    },
    validationSchema: yup.object({
      name: yup.string().required(),
    }),
    onSubmit: (value) => AddBrand.mutate({ value, token }),
  });

  /************************ mutation */
  const AddBrand = useMutation({
    mutationKey: ["addbrand"],
    mutationFn: ({ value, token }) => AddUserBrand(value, token),
    onSuccess: (res) => {
      Swal.fire({
        title: `${res.data.message}`,
        icon: "success",
      });
      queryclient.invalidateQueries({ queryKey: ["getbrand"] });
      formik.resetForm();
      setShow(false);
    },
  });
  return (
    <>
      <div className="continer">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          {/* <div className="col-md-8 text-center">
               <h2>
                Add  Brand
               </h2>

               <div className="container">
               <div className="profile-card">
            <div className="profile-header">
                <img src="profile-image.jpg" alt="Profile Image" className="profile-image" />
                <div className="profile-info">
                    <h2>User Name</h2>
                    <p>Email: user@example.com</p>
                </div>
            </div>
            <div className="profile-details">
                <div className="detail-item">
                    <strong>Brand Name:</strong>
                    <p>Brand XYZ</p>
                </div>
                <div className="detail-item">
                    <strong>Website:</strong>
                    <p>www.brandxyz.com</p>
                </div>
            </div>
            <div className="social-links">
                <a href="#" className="social-link"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
                <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
            </div>
            <form className="add-brand-form">
                <h3>Add New Brand</h3>
                <div className="form-group">
                    <label >Brand Name</label>
                    <input type="text" className="form-control" id="brandName" placeholder="Enter brand name" required />
                </div>
                <div className="form-group">
                    <label >Brand Website</label>
                    <input type="url" className="form-control" id="brandWebsite" placeholder="Enter brand website" required />
                </div>
                <button type="submit" className="btn btn-primary">Add Brand</button>
            </form>
        </div>
               </div>
            </div> */}

          <div className="col-md-6 mt-5 offset-md-2">
            <Profile/>
            <button
              className="btn text-light bg-danger mb-3"
              onClick={handleShow}
            >
              Add Brand
            </button>
            <table className="table table-bordered text-capitalize">
              <thead>
                <tr>
                  <th scope="col">Brand Name</th>
                  <th scope="col">Edit </th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.data?.map((item) => {
                  return (
                    <>
                      <tr>
                        <td>{item?.name}</td>
                        <td>
                          <button className="text-light btn bg-success ">
                            Edit
                          </button>
                        </td>
                        <td>
                          {" "}
                          <button className="text-light btn bg-danger ">
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* **************** Modal */}
      <Modal show={show} centered onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Brand</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">Brand Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={formik?.handleChange}
              value={formik?.values?.name}
              id="exampleFormControlInput1"
            />
            {formik?.errors?.name && (
              <p className="text-danger">{formik?.errors?.name}</p>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Close
          </Button>
          <Button
            type="button"
            variant="success"
            onClick={() => formik.handleSubmit()}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

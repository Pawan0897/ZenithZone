import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AddCateGory, cateGory, deleteCategory } from "../Request/https";
import { Button, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import useToken from "../Hooks/useToken";
import Swal from "sweetalert2";
export default function AddCategory() {
  const queryclient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["category"],
    queryFn: () => cateGory(),
  });
  const token = useToken();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  /************************ formik */
  const formik = useFormik({
    initialValues: {
      name: "",
      createBy: token,
    },
    validationSchema: yup.object({
      name: yup.string().required(),
    }),
    onSubmit: (value) => AddCAtegory.mutate({ value, token }),
  });

  const AddCAtegory = useMutation({
    mutationKey: ["adddcategory"],
    mutationFn: ({ value, token }) => AddCateGory(value, token),
    onSuccess: (res) => {
      if (res?.data?.statuscode == 200) {
        setShow(false);
        queryclient.invalidateQueries({ queryKey: ["category"] });
        Swal.fire({
          title: `${res?.data?.message}`,
          icon: "success",
        });
      } else {
        Swal.fire({
          title: `${res?.data?.message}`,
          icon: "info",
        });
      }
    },
  });
  /*************** delete */
  const CategoryDel = useMutation({
    mutationKey: ["catdelete"],
    mutationFn: (id) => deleteCategory(id),
    onSuccess: (res) => {
      if (res?.data?.statuscode == 200) {
        queryclient.invalidateQueries({ queryKey: ["category"] });
        Swal.fire({
          title: `${res?.data?.message}`,
          icon: "success",
        });
      } else {
        Swal.fire({
          title: `${res?.data?.message}`,
          icon: "info",
        });
      }
    },
  });
  const category = data?.data?.data;
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-7 mt-5">
            <button
              className="btn text-light bg-danger mb-3"
              onClick={() => setShow(true)}
            >
              Add Category
            </button>
            <table className="table table-bordered text-capitalize">
              <thead>
                <tr>
                  <th scope="col">Category Name</th>
                  <th scope="col">Edit </th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {category?.map((item) => {
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
                          <button
                            className="text-light btn bg-danger "
                            type="button"
                            onClick={() => CategoryDel.mutate(item?._id)}
                          >
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
        +
      </Modal>
    </>
  );
}

import { useQuery } from "@tanstack/react-query";
import Sidebar from "./Sidebar";
import { ViewUsers } from "../Request/https";
import { ImCross } from "react-icons/im";
import { FaRegEye } from "react-icons/fa";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup"
export default function ViewUser() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { data } = useQuery({
    queryFn: () => ViewUsers(),
  });
  // ********************** formik
  const formik = useFormik({
    initialValues:{
      name:"",
      email:"",
      phone:"",
      isValid:"",
      role:"",
    }
   
  })

  console.log(data?.data?.data);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <Sidebar />
          </div>
          <div className="col-md-6">
            <div className="container">
              <div className="card mt-5">
                <div className="card-header bg-danger ">Logged-In Users</div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Email</th>
                          <th>Status</th>
                          <th scope="col">Verified</th>
                          <th scope="col">View User</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.data?.data?.map((item) => {
                          return (
                            <>
                              <tr>
                                {/* ************** name */}
                                <td>{item?.firstname + item?.lastname}</td>
                                {/* ************** email */}
                                <td>{item?.email}</td>
                                {/* ************** Status */}
                                <td>
                                  <span className="badge bg-danger">
                                    {item?.status}
                                  </span>
                                </td>

                                {item?.isValid == true ? (
                                  <td>
                                    <div className="checkbox-wrapper">
                                      <label className="container">
                                        <input
                                          type="checkbox"
                                          checked="checked"
                                        />
                                        <div className="checkmark"></div>
                                      </label>
                                    </div>
                                  </td>
                                ) : (
                                  <td>
                                    <div className="cross">
                                      <ImCross />
                                    </div>
                                  </td>
                                )}

                                <td>
                                  <div
                                    className="viewUser"
                                    onClick={() => {setShow(true),formik.setValues({
                                      ...formik.values,
                                      name:item?.firstname + item?.lastname,
                                      email:item?.email
                                    })}
                                     

                                    }
                                  >
                                    <FaRegEye />
                                  </div>
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <div className="no-users d-none">
                    No logged-in users to display.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* /************************* MODAL Show  */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {formik?.values?.name}
          </p>
          <p>
            {
              formik?.values?.email
            }

          </p>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

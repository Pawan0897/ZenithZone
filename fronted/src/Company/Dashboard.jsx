import { Button, Modal, Offcanvas } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AccountIsDone,
  AccountLink,
  AddProducts,
  DeleteProduct,
  GetBrand,
  ShowCategory,
  UpdateProduct,
  ViewCompanyUser,
  ViewProduct,
} from "../Request/https";
import { useFormik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import useToken from "../Hooks/useToken";

export default function Dashboard() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /***************** update state values  */
  const [updateshow, Setupdateshow] = useState(false);

  const handleUpdateClose = () => Setupdateshow(false);
  // const handleUpdateShow = () => Setupdateshow(true);

  /**************** end state values */
  const UserId = useSelector((state) => state.user.details);
  const _id = UserId?._id;
  const queryClient = useQueryClient();
  const token = useToken();

  /***************** get product  */
  const { data } = useQuery({
    queryKey: ["product"],
    queryFn: () => ViewProduct(token),
  });

  /******************  formik */
  const formik = useFormik({
    initialValues: {
     
      name: "",
      price: "",
      brandId: "",
      image: "",
      description: "",
      createBy: _id,
      categoryId: "",
      isStock: "",
    },
    validationSchema: yup.object({
      name: yup.string().required(),
      price: yup.number().required(),
      brandId: yup.string().required(),
      isStock: yup.number().required(),
      description:yup.string().required(),
      image: yup
        .mixed()
        .required()
        .test(
          "type",
          "Only the following formats are accepted: .jpeg, .jpg, .png",
          (value) => {
            return (
              (value && value.type === "image/jpeg") ||
              value.type === "image/png"
            );
          }
        ),
    }),
    onSubmit: (values) => AddProduct.mutate(values),
  });
  /**************** Add Products */
  const AddProduct = useMutation({
    mutationFn: (values) => AddProducts(values),

    onSuccess: (res) => {
      if (res?.data?.statuscode == 200) {
        queryClient.invalidateQueries({ queryKey: ["product"] });
        setShow(false);
        formik.resetForm();
        Swal.fire({
          title: `${res?.data?.message}`,
          text: "you product Addedd successfully !!!",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: `${res?.data?.message}`,
          text: "Somethign was wrong !!!",
        });
      }
    },
  });

  // ************* update Products
  const updateProduct = useMutation({
    mutationFn: (id) => UpdateProduct(id, formik?.values),
    onSuccess: (res) => {
      if (res == 200) {
        queryClient.invalidateQueries({ queryKey: ["product"] });
        Swal.fire({
          title: `${res?.data?.message}`,
          text: "Somethign was wrong !!!",
        });
      }
    },
  });
  /******************** delete products */
  const ProDelete = useMutation({
    mutationKey: ["delproduct"],
    mutationFn: (id) => DeleteProduct(id),
    onSuccess: (res) => {
      if (res?.data?.statuscode == 200) {
        queryClient.invalidateQueries({ queryKey: ["product"] });
        Swal.fire({
          title: `${res?.data?.message}`,
          text: "Product is addedd successfully !!!!",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: `${res?.data?.message}`,
          text: "Somthing was wrong  !!!!",
          icon: "error",
        });
      }
    },
  });
  /************************ get category */
  const category = useQuery({
    queryFn: () => ShowCategory(),
  });
  /***************** Get Brands */

  const brands = useQuery({
    queryKey: ["getbrand"],
    queryFn: () => GetBrand(token),
  });

  const getbrand = brands?.data?.data?.data;
  console.log(
    formik?.values?.categoryId,
    ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
  );

  const price = 2000; // Example product price
  const companyPercentage = 90;
  const adminPercentage = 10;
  const companyShare = (price * companyPercentage) / 100;
  const adminShare = (price * adminPercentage) / 100;

  console.log(`Company Share: $${companyShare.toFixed(2)}`);
  console.log(`Admin Share: $${adminShare.toFixed(2)}`);

  /********************************** OffCanvs */
  const [toggleshow, setToggleShow] = useState(false);
  const toggleOpen = () => setToggleShow((s) => !s);
  const CloseToggle = () => setToggleShow(false);

  /****************************  Payment retriecve aPi ~~~~~~~~~ */
  const userDetails = useQuery({
    queryKey: ["userDetail"],
    queryFn: () => ViewCompanyUser(token),
  });
  // console.log(data,"ppppppppppppppppppppppppppppppppp");
  const detail = userDetails?.data?.data?.data;

  const AccountIs = useQuery({
    queryKey: ["AccountIsComplited"],
    queryFn: () => AccountIsDone(token),
  });
  /*********************** open mutate  And open link*/
  const OpenLink = useMutation({
    mutationFn: (tok) => AccountLink(tok),
    onSuccess: (res) => {
      const URL = res?.data?.data?.url;
      if (URL) {
        window.open(URL, "_blank");
      } else {
        console.log("url not worked !!!");
      }
    },
  });
  const AccountStatus = AccountIs?.data?.data?.verify;

  const Message = AccountIs?.data?.data?.message;
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10 mt-5">
            {/* **************** Canaas */}
            <div className="canvas text-end">
              <button
                className="me-2 text-end btn text-light  bg-danger"
                onClick={toggleOpen}
              >
                Profile
              </button>
            </div>

            <Offcanvas show={toggleshow} placement="end" onHide={CloseToggle}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Offcanvas</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <div className="container">
                  <div className="row">
                    <div className="col-md-8 offset-md-2">
                      <h2>Email : {detail?.email}</h2>
                      {/* ******************** Account Verify ~~~~~~~~~~~~ */}
                      {AccountStatus == 1 ? (
                        <button
                          type="button"
                          className="button text-capitalize bg-success"
                          onClick={() => alert("Your Onboarding is Compled!!")}
                        >
                          {Message}
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="button text-capitalize bg-success"
                          onClick={() => OpenLink.mutate(token)}
                        >
                          {Message}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </Offcanvas.Body>
            </Offcanvas>

            {/* *************** end Convas */}
            <div className="container-fluid mt-5">
              <div className="row">
                <div className="col-md-12">
                  <button
                    className="btn bg-warning text-dark mb-3"
                    onClick={handleShow}
                  >
                    Add product
                  </button>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Brand</th>
                        <th scope="col">Price</th>
                        <th scope="col">Detail</th>
                        <th scope="col">Delete</th>
                        <th>Edit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.data?.data?.map((item) => {
                        return (
                          <>
                            <tr>
                              <td style={{ width: "150px" }}>
                                <img
                                  src={`http://localhost:3000/api/${item?.image}`}
                                  width={"100%"}
                                />
                              </td>
                              <td>{item?.name}</td>

                              <td>{item?.brands?.name}</td>
                              <td>${item?.price}.00</td>

                              <td>{item?.description}</td>
                              <td>
                                <button
                                  className="btn bg-danger text-light border-0"
                                  onClick={() => ProDelete.mutate(item?._id)}
                                >
                                  Delete
                                </button>
                              </td>
                              <td>
                                <button
                                  className="bg-success btn text-light border-0"
                                  data-bs-toggle="modal"
                                  data-bs-target="#update"
                                  onClick={() => {
                                    formik.setValues({
                                      ...formik.values,
                                      id: item?._id,
                                      name: item?.name,
                                      price: item?.price,
                                      brand: item?.brand,
                                      image: `http://localhost:3000/api/${item?.image}`,
                                      description: item?.description,
                                      createBy: _id,
                                    }),
                                      Setupdateshow(true);
                                  }}
                                >
                                  Update
                                </button>
                              </td>
                            </tr>
                          </>
                        );
                      })}
                      {/* ************************************ UPDATE PRODUCT  */}
                      <Modal
                        show={updateshow}
                        onHide={handleUpdateClose}
                        backdrop="static"
                        size="lg"
                        keyboard={show}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Modal title</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          {/* /&************************* */}
                          <div className="row">
                            {/* *********************** name */}

                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label">
                                  Product Name
                                </label>
                                <input
                                  type="text"
                                  name="name"
                                  className="form-control"
                                  value={formik?.values?.name}
                                  onChange={formik?.handleChange}
                                  id="exampleFormControlInput1"
                                />
                                {formik?.errors?.name && (
                                  <p>{formik?.errors?.name}</p>
                                )}
                              </div>
                            </div>
                            {/* ************************ Price */}
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label">Price</label>
                                <input
                                  type="text"
                                  value={formik?.values?.price}
                                  name="price"
                                  onChange={formik?.handleChange}
                                  className="form-control"
                                  id="exampleFormControlInput1"
                                />
                                {formik?.errors?.price && (
                                  <p>{formik?.errors?.price}</p>
                                )}
                              </div>
                            </div>
                            {/* ************************ Brand */}
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label">Brand</label>
                                <input
                                  type="text"
                                  value={formik?.values?.brand}
                                  onChange={formik?.handleChange}
                                  name="brand"
                                  className="form-control"
                                  id="exampleFormControlInput1"
                                />
                                {formik?.errors?.brand && (
                                  <p>{formik?.errors?.brand}</p>
                                )}
                              </div>
                            </div>
                            {/* ************************ Image */}
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label">Image</label>
                                <input
                                  type="file"
                                  name="image"
                                  onChange={(e) =>
                                    formik?.setFieldValue(
                                      "image",
                                      e.target.files[0]
                                    )
                                  }
                                  className="form-control"
                                  id="exampleFormControlInput1"
                                />
                                {formik?.errors?.image && (
                                  <p>{formik?.errors?.image}</p>
                                )}
                              </div>
                            </div>
                            {/* ************************* image show */}
                            <div className="col-md-4">
                              <div className="mb-3">
                                <label className="form-label">Image</label>
                                <div className="form-control">
                                  <img
                                    src={formik?.values?.image}
                                    width={"70%"}
                                  />
                                </div>
                              </div>
                            </div>
                            {/* ************************ Descrption */}
                            <div className="col-md-8">
                              <div className="mb-3">
                                <label className="form-label">
                                  Description
                                </label>
                                <textarea
                                  className="form-control"
                                  type="text"
                                  name="description"
                                  value={formik?.values?.description}
                                  onChange={formik?.handleChange}
                                  id="exampleFormControlTextarea1"
                                  rows="3"
                                ></textarea>
                                {formik?.errors?.description && (
                                  <p>{formik?.errors?.description}</p>
                                )}
                              </div>
                            </div>
                          </div>
                          {/* ************************************* end inputs */}
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            variant="secondary"
                            onClick={handleUpdateClose}
                          >
                            Close
                          </Button>
                          <Button
                            variant="primary"
                            onClick={() =>
                              updateProduct.mutate(formik?.values?.id)
                            }
                          >
                            Understood
                          </Button>
                        </Modal.Footer>
                      </Modal>

                      {/* *********************8//////////  end of modal          /////// */}
                    </tbody>
                  </table>
                  {/* /********************** Add product Modal */}
                  <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    size="lg"
                    keyboard={false}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Add Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="container">
                        <div className="row">
                          {/* *********************** name */}

                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Product Name</label>
                              <input
                                type="text"
                                name="name"
                                className="form-control"
                                value={formik?.values?.name}
                                onChange={formik?.handleChange}
                                id="exampleFormControlInput1"
                              />
                              {formik?.errors?.name && (
                                <p className="text-danger">{formik?.errors?.name}</p>
                              )}
                            </div>
                          </div>
                          {/* ************************ Price */}
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Price</label>
                              <input
                                type="text"
                                value={formik?.values?.price}
                                name="price"
                                onChange={formik?.handleChange}
                                className="form-control"
                                id="exampleFormControlInput1"
                              />
                              {formik?.errors?.price && (
                                <p className="text-danger">{formik?.errors?.price}</p>
                              )}
                            </div>
                          </div>
                          {/* ************************ Category */}
                          <div className="col-md-3">
                            <div className="mb-3">
                              <label className="form-label">category</label>
                              <select
                                className="form-select"
                                aria-label="Default select example"
                                name="categoryId"
                                onChange={formik?.handleChange}
                              >
                                <option selected>Category</option>
                                {/* *********** category get  */}
                                {category?.data?.data?.data.map((category) => {
                                  return (
                                    <>
                                      <option
                                        key={category?._id}
                                        value={category?._id}
                                      >
                                        {category?.name}
                                      </option>
                                    </>
                                  );
                                })}
                              </select>
                              {formik?.errors?.categoryId && (
                                <p className="text-danger">{formik?.errors?.categoryId}</p>
                              )}
                            </div>
                          </div>

                          {/* ************************ Brand.... */}
                          <div className="col-md-3">
                            <div className="mb-3">
                              <label className="form-label">Brand</label>
                              <select
                                className="form-select"
                                aria-label="Default select example"
                                name="brandId"
                                onChange={formik?.handleChange}
                              >
                                <option selected>Brands</option>
                                {/* *********** category get  */}
                                {getbrand?.map((item) => {
                                  return (
                                    <>
                                      <option key={item?._id} value={item?._id}>
                                        {item?.name}
                                      </option>
                                    </>
                                  );
                                })}
                              </select>
                              {formik?.errors?.brandId && (
                                <p className="text-danger">{formik?.errors?.brandId}</p>
                              )}
                            </div>
                          </div>

                          {/* *********************** Stock  */}
                          <div className="col-md-2">
                            <div className="mb-3">
                              <label className="form-label">Stock</label>
                              <input
                              className="form-control"
                                type="text"
                                name="isStock"
                                value={formik?.values?.isStock}
                                onChange={formik?.handleChange}
                              />
                              {formik?.errors?.isStock && (
                                <p className="text-danger">{formik?.errors?.isStock}</p>
                              )}
                            </div>
                          </div>
                          {/* ************************ Image */}
                          <div className="col-md-4">
                            <div className="mb-3">
                              <label className="form-label">Image</label>
                              <input
                                type="file"
                                name="image"
                                onChange={(e) =>
                                  formik?.setFieldValue(
                                    "image",
                                    e.target.files[0]
                                  )
                                }
                                className="form-control"
                                id="exampleFormControlInput1"
                              />
                              {formik?.errors?.image && (
                                <p className="text-danger">{formik?.errors?.image}</p>
                              )}
                            </div>
                          </div>
                          {/* ************************ Descrption */}
                          <div className="col-md-12">
                            <div className="mb-3">
                              <label className="form-label">Description</label>
                              <textarea
                                className="form-control"
                                type="text"
                                name="description"
                                value={formik?.values?.description}
                                onChange={formik?.handleChange}
                                id="exampleFormControlTextarea1"
                                rows="3"
                              ></textarea>
                            </div>
                              {formik?.errors?.description && (
                                <p className="text-danger">{formik?.errors?.description}</p>
                              )}
                          </div>
                        </div>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button
                        variant="success"
                        type="button"
                        onClick={formik?.handleSubmit}
                      >
                        Submit
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

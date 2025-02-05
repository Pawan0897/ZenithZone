import { useState } from "react";
import { Tabs, Tab, Modal, Button } from "react-bootstrap";
import PhoneInput from "react-phone-input-2"; // Make sure to import PhoneInput
import Header from "../Customer/Header";
// import { useQuery } from '@tanstack/react-query';
// import { CheckOutProduct } from '../Request/https';
import { useLocation } from "react-router-dom";
import Step2 from "../PaymentGate/step2";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AddressDe,
  AddressFetched,
  AddressUdate,
  OrderSet,
  SaveAddress,
} from "../Request/https";
import useToken from "../Hooks/useToken";
import Swal from "sweetalert2";

const Checkout = () => {
  const quieryclient = useQueryClient();
  /************** Modal open close */
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  /********************* TAb active or close ********* */
  const [activeTab, setActiveTab] = useState("home"); // State to manage active tab
  /***************** */
  const token = useToken();
  /***************** view all products */
  const location = useLocation();
  const check = location.state.data;
  /*****************Formik ,..... */
  const formik = useFormik({
    initialValues: {
      id: "p",
      name: "",
      phone: "",
      pincode: "",
      state: "",
      city: "",
      fulladdress: "",
    },
    validationSchema: yup.object({
      name: yup.string().required(),
      phone: yup.string().required(),
      pincode: yup.number().required(),
      state: yup.string().required(),
      city: yup.string().required(),
      fulladdress: yup.string().required(),
    }),
    onSubmit: (value) => {
      setActiveTab("profile");
      console.log(value, "formikkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
    },
  });

  console.log(location?.state?.data, "----------------------------");
  const dt = location.state.data.map((item) => item?.price);
  const tot = dt.reduce((acum,current) =>acum +current,0)
  console.log(tot,":::::::::::::::::::::::::::::::>>>>>>>>>>>>>>>>>>>>>>>>");

  /************* order mutaion Api */
  const Orderset = useMutation({
    mutationKey: ["orderset"],
    mutationFn: ({ body, token }) => OrderSet(body, token),
  });

  // ******** RND *******************
  console.log(
    Orderset,
    "11111111111111111111111111111111111111111111111111111111111111111"
  );

  console.log(
    location.state.data.map((item) => item?.price),
    "........................."
  );
  /********************* now address check box ********* */
  const [showAddress, setAddress] = useState(false);
  const [showNew, setNew] = useState(false);

  /************************ Save Addres Or NOT Api ********** */
  const AddressSave = useMutation({
    mutationKey: ["save_address"],
    mutationFn: ({ body, token }) => SaveAddress(body, token),
  });
  console.log(
    formik?.values,
    "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
  );
  /************************* GEt Address Api  ******* */
  const { data } = useQuery({
    queryKey: ["address"],
    queryFn: () => AddressFetched(token),
    onSuccess: () => {
      // quieryclient.invalidateQueries({ mutationKey: ["addressdel"] });
      // quieryclient.invalidateQueries({ mutationKey: ["updateaddress"] });
    },
  });
  console.log(
    data?.data?.data,
    "dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  );
  /****************** Check address  *************/
  const [checkedAddresses, setCheckedAddresses] = useState({});
  // const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [Nextbtn, setNextbtn] = useState(false);

  /***************** check form is filled then save addres button show ***********/
  const isFormFilled = () => {
    return Object.values(formik.values).every(
      (value) => value !== "" && value !== null
    );
  };
  const addressget = data?.data?.data;

  /********************* Delete Address Api */
  const AddressDelete = useMutation({
    mutationKey: ["addressdel"],
    mutationFn: (id) => AddressDe(id),
    onSuccess: (res) => {
      Swal.fire({
        title: `${res?.data?.message}`,
        icon: "warning",
      });
    },
  });

  /******************Update the Address **************** */
  const AddressUpdated = useMutation({
    mutationKey: ["updateaddress"],
    mutationFn: ({ id, body }) => AddressUdate(id, body),
    onSuccess: (res) => {
      console.log(res, "response");

      quieryclient.invalidateQueries({ mutationKey: ["updateaddress"] });
      Swal.fire({
        title: `${res?.data?.message}`,
        icon: "success",
      }),
        setShow(false);
    },
  });
  return (
    <>
      <Header />

      <div className="container mt-5 ">
        <h1 className="mb-3  fw-bolder tittle-text">Checkout</h1>
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6">
            <Tabs
              activeKey={activeTab} // Set active tab based on state
              onSelect={(k) => setActiveTab(k)} // Update state on tab change
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              {/* *********************  Address ******************/}
              <Tab eventKey="home" title="Address">
                <div className="row mt-4">
                  {/* ******************** Address Checked !!!! ******************/}
                  <div className="col-md-12  checkaddress ">
                    {addressget?.map((element) => {
                      return (
                        <>
                          <div className="bg-light checkaddress bg-inset mb-4 mt-4">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name={`${element?._id}`}
                                id={`${element?._id}`}
                                // checked={selectedAddressId === element?._id}
                                checked={
                                  checkedAddresses[element?._id] || false
                                }
                                onClick={() => {
                                  // setSelectedAddressId(element?._id);
                                  setCheckedAddresses({
                                    [element._id]: true, // Set the clicked checkbox to true
                                  });
                                  formik.setValues({
                                    name: element?.name,
                                    phone: element?.phone,
                                    pincode: element?.pincode,
                                    state: element?.state,
                                    city: element?.city,
                                    fulladdress: element?.fulladdress,
                                  }),
                                    setAddress(true);
                                  setNextbtn(true);
                                }}
                              />
                              <label className="form-check-label">
                                {element?.pincode}
                              </label>
                            </div>
                            <h5 className="card-title text-capitalize">
                              {element?.city}
                            </h5>
                            <p className="card-text text-capitalize">
                              {element?.pincode} {element?.fulladdress},{" "}
                              {element?.state}, {element?.city}
                            </p>
                            {/* ************** Update Address ************ */}
                            <button
                              type="button"
                              className="btn btn-success me-3 btn-custom"
                              onClick={() => {
                                formik.setValues({
                                  ...formik?.values,
                                  id: element?._id,
                                  name: element?.name,
                                  phone: element?.phone,
                                  pincode: element?.pincode,
                                  state: element?.state,
                                  city: element?.city,
                                  fulladdress: element?.fulladdress,
                                }),
                                  setShow(true);
                              }}
                            >
                              Edit
                            </button>
                            {/* *********** Delte Address  ********** */}
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => AddressDelete.mutate(element?._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </>
                      );
                    })}

                    {/* *************** checked address button  *****************/}
                    {Nextbtn ? (
                      <>
                        <button
                          type="button"
                          className="btn btn-warning me-0 mb-4"
                          onClick={() => formik.handleSubmit()}
                        >
                          Next
                        </button>
                      </>
                    ) : (
                      ""
                    )}
                  </div>

                  {/* ************  Open Address Button  ****************/}
                  <div className="col-md-12">
                    <button
                      type="button "
                      onClick={() => {
                        setCheckedAddresses(false),
                          formik.resetForm(),
                          setNextbtn(false);
                      }}
                      className="bg-danger text-light mb-3 btn"
                    >
                      + Add New Address
                    </button>
                  </div>
                  {/* ************** New Address Inputs Form starts **********/}

                  {!checkedAddresses ? (
                    <>
                      <div className="col-md-12 bg-shadow p-4">
                        <div className="row">
                          <div className="col-md-12 ">
                            <div className="form-group">
                              <label htmlFor="firstName"> Name</label>
                              <input
                                type="text"
                                className="form-control"
                                id="Name"
                                value={formik?.values?.name}
                                onChange={formik?.handleChange}
                                name="name"
                                placeholder="Name"
                              />
                              {formik?.errors?.name && (
                                <p className="text-danger">
                                  {formik?.errors?.name}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        {/* *************** phone number  **********/}
                        <div className="row mt-4">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="phone">Phn no.</label>
                              <PhoneInput
                                className="border-0"
                                country={"pk"}
                                onChange={(phone) =>
                                  formik?.setFieldValue("phone", phone)
                                }
                                inputProps={{
                                  name: "phone",
                                  className: "form-control",
                                  placeholder: "",
                                }}
                                inputStyle={{
                                  width: "100%",
                                  height: "15%",
                                }}
                              />
                            </div>
                            {formik?.errors?.phone && (
                              <p className="text-danger">
                                {formik?.errors?.phone}
                              </p>
                            )}
                          </div>
                          {/* ******************* pincode */}
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="pincode">Pincode</label>
                              <input
                                type="text"
                                className="form-control"
                                id="pincode"
                                value={formik?.values?.pincode}
                                onChange={formik?.handleChange}
                                name="pincode"
                              />
                              {formik?.errors?.pincode && (
                                <p className="text-danger">
                                  {formik?.errors.pincode}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* *************** city & state **********/}
                        <div className="row mt-4">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="city">City</label>
                              <input
                                type="text"
                                className="form-control"
                                id="city"
                                value={formik?.values?.city}
                                onChange={formik?.handleChange}
                                name="city"
                                placeholder="City"
                              />
                              {formik?.errors?.city && (
                                <p className="text-danger">
                                  {formik?.errors?.city}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="state">State/territory</label>
                              <select
                                className="form-control"
                                name="state"
                                value={formik?.values?.state}
                                onChange={formik?.handleChange}
                                id="state"
                              >
                                <option>South Australia</option>
                                <option>Delhi</option>
                              </select>
                              {formik?.errors?.state && (
                                <p className="text-danger">
                                  {formik?.errors?.state}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        {/* ************ addresss *****************/}
                        <div className="form-group mt-4">
                          <label htmlFor="address">Address</label>
                          <textarea
                            className="form-control"
                            id="address"
                            value={formik?.values?.fulladdress}
                            onChange={formik?.handleChange}
                            name="fulladdress"
                            rows={"4"}
                            placeholder="Address"
                          />
                        </div>
                        {formik?.errors?.fulladdress && (
                          <p className="text-danger">
                            {formik?.errors?.fulladdress}
                          </p>
                        )}
                        {/* **************  Save address ********/}
                        {isFormFilled() && (
                          <>
                            <div className="form-check mt-3">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="saveInfo"
                                onChange={() =>
                                  AddressSave.mutate({
                                    body: formik?.values,
                                    token,
                                  })
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="saveInfo"
                              >
                                Save this information for next time
                              </label>
                            </div>
                          </>
                        )}

                        <div>
                          <button
                            type="button"
                            className="btn text-end bg-success text-light mb-5 mt-4"
                            // onClick={formik?.handleSubmit
                            // } // Call handleSubmit on click
                            onClick={() => formik.handleSubmit()}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </Tab>

              {/* ******************* Payment Method ************/}
              <Tab
                eventKey="profile"
                onSelect={() => setActiveTab("home")}
                onChange={() => setActiveTab("home")``}
                title="Payment"
              >
                <div className="section-title ">Payment</div>
                <p>All transactions are secure and encrypted.</p>
                <Step2 items={formik?.values} />
              </Tab>
            </Tabs>
          </div>
          {/* *************  Show Cart products  Order Summery   **************/}

          <div className="col-md-6">
            <div className="order-summary position-fixed end-0 mt-5 ">
              <h3>Order Summary</h3>
              {location.state.check === true
                ? check?.map((item) => {
                    return (
                      <>
                        <div className="item">
                          <img
                            src={`http://localhost:3000/api/${item?.addtocart?.image}`}
                            alt="Product Image"
                            width="50"
                          />
                          <span>{item?.addtocart?.name}</span>{" "}
                          <span>quantity : {item?.quantity}</span>
                          <span>${item?.addtocart?.price}.00</span>
                        </div>
                      </>
                    );
                  })
                : location.state.data.map((item) => {
                    return (
                      <>
                        <div className="item">
                          <img
                            src={`http://localhost:3000/api/${item?.image}`}
                            alt="Product Image"
                            width="50"
                          />
                          <span>{item?.name}</span>
                          <span>quantity : {location.state.quantity}</span>
                          <span>${item?.price}.00</span>
                        </div>
                      </>
                    );
                  })}
              <div className="item">
                <span>Subtotal</span>
                <span>$66.00</span>
              </div>
              <div className="item">
                <span>Shipping</span>
                <span>$30.00</span>
              </div>
              <div className="item">
                <span>Total</span>
                <span>${location.state.total}.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* *********************** Modal Update Address *************/}
      <Modal
        show={show}
        centered
        size="lg"
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              {/* ****************** name  ********** */}
              <div className="col-md-12 mb-3">
                <div className="form-group">
                  <label htmlFor="city">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={formik?.values?.name}
                    onChange={formik?.handleChange}
                    name="name"
                    placeholder="name"
                  />
                  {formik?.errors?.name && (
                    <p className="text-danger">{formik?.errors?.name}</p>
                  )}
                </div>
              </div>
              {/* ******************* */}
              {/* ****************** city  ********** */}
              <div className="col-md-6 mb-3">
                <div className="form-group">
                  <label htmlFor="city">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    value={formik?.values?.phone}
                    onChange={formik?.handleChange}
                    name="phone"
                    placeholder="phone"
                  />
                  {formik?.errors?.phone && (
                    <p className="text-danger">{formik?.errors?.phone}</p>
                  )}
                </div>
              </div>
              {/* ******************* */}
              {/* ****************** city  ********** */}
              <div className="col-md-6 mb-3">
                <div className="form-group">
                  <label htmlFor="city">Pincode</label>
                  <input
                    type="text"
                    className="form-control"
                    id="pincode"
                    value={formik?.values?.pincode}
                    onChange={formik?.handleChange}
                    name="pincode"
                    placeholder="pincode"
                  />
                  {formik?.errors?.pincode && (
                    <p className="text-danger">{formik?.errors?.pincode}</p>
                  )}
                </div>
              </div>
              {/* ******************* */}
              {/* ****************** city  ********** */}
              <div className="col-md-6 mb-3">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    value={formik?.values?.city}
                    onChange={formik?.handleChange}
                    name="city"
                    placeholder="City"
                  />
                  {formik?.errors?.city && (
                    <p className="text-danger">{formik?.errors?.city}</p>
                  )}
                </div>
              </div>
              {/* ******************* */}
              {/* ****************** state  ********** */}
              <div className="col-md-6 mb-3">
                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    className="form-control"
                    id="state"
                    value={formik?.values?.state}
                    onChange={formik?.handleChange}
                    name="state"
                    placeholder="state"
                  />
                  {formik?.errors?.state && (
                    <p className="text-danger">{formik?.errors?.state}</p>
                  )}
                </div>
              </div>
              {/* ******************* */}
              {/* ****************** fulladdress  ********** */}
              <div className="col-md-12 mb-3">
                <div className="form-group mt-4">
                  <label htmlFor="address">Address</label>
                  <textarea
                    className="form-control"
                    id="address"
                    value={formik?.values?.fulladdress}
                    onChange={formik?.handleChange}
                    name="fulladdress"
                    rows={"4"}
                    placeholder="Address"
                  />
                </div>
                {formik?.errors?.fulladdress && (
                  <p className="text-danger">{formik?.errors?.fulladdress}</p>
                )}
              </div>
              {/* ******************* */}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            type="button"
            variant="danger0"
            onClick={() =>
              AddressUpdated.mutate({
                id: formik?.values?.id,
                body: formik?.values,
              })
            }
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Checkout;

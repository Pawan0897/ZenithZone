import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import useToken from "../Hooks/useToken";
import { useLocation } from "react-router-dom";

function Step1(items) {
  console.log(items, "]]]]]]]]]]>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.");

  /***************location state total */
  const location = useLocation();
  const total = location.state.total;
  const totalprice = location.state.total;
  const selecttoken = useToken();
  // const [state,setstate] = useState("")
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  console.log(location.state.data, "------------------------");

  /***************** submit button  */
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return; // Stripe.js has not yet loaded.
    }
    

    /*********** create card token  */
    const element = elements.getElement(CardElement);
    const { error, token } = await stripe.createToken(element);

    if (token) {
      console.log(token, "token created !!!!!");
      /***************** payment method */
      const paymentmethod = await axios.post(
        "http://localhost:3000/payment/paymentmethod",
        { tokenid: token.id },
        {
          headers: {
            Authorization: selecttoken,
          },
        }
      );
      /************* payment method */
      console.log(
        paymentmethod?.data?.data?.card?.brand,
        "paymentmethod !!!!!!!!!!!!"
      );

      const MethodToUsePay = paymentmethod?.data?.data?.card?.brand;
      // const createBy = location.state.data.map((item) => item?.createBy)

      /************************************************************ */

      const createBy = location.state.data.map((item) => item?.createBy);

      console.log(
        createBy,
        ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>...................................."
      );

      /********************************************************************** */
      const MethodId = await paymentmethod.data.data.id;

      const PaymentmethodIntent = await axios.post(
        "http://localhost:3000/payment/paymentintent",
        { totalprice: total, paymentmethodId: MethodId, createBy: createBy },
        {
          headers: {
            Authorization: selecttoken,
          },
        }
      );
      const addressdata = items?.item?.items;
      console.log(addressdata, "....[[';/////////////////////////////////");

      // const oredradd = item?.items
      if (PaymentmethodIntent) {
        const createBy = location.state.data.map((item) => item?.createBy);
        const priceBy = location.state.data.map((item) => item?.price);
        /****************  Order save in database with products  */

        const orderSave = await axios.post(
          "http://localhost:3000/order/setorder",
          {
            address: addressdata,
            product: location.state.data,
            totalprice: totalprice,
            createBy: createBy,
            price: priceBy,
            MethodToUsePay: MethodToUsePay,
          },
          {
            headers: {
              Authorization: selecttoken,
            },
          }
        );

        console.log(
          orderSave,
          "save---------$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$---------------------------"
        );

        alert("payment successfully !!!!");
        console.log(paymentmethod, "Yes >>>>>>>>>>>>>>>>>>>>>");
      } else {
        console.log(paymentmethod, "Not >>>>>>>>>>>>>>>>>>>>>");
      }
    } else {
      setErrorMessage(error.message);
    }

    // // Trigger form validation and wallet collection
    // const { error: submitError } = await elements.submit();
    // if (submitError) {
    //   // Show error to your customer
    //   setErrorMessage(submitError.message);
    //   return;
    // }

    // Create the PaymentIntent and obtain clientSecret from your server endpoint

    // const { client_secret: clientSecret } = await res.json();

    // const { error } = await stripe.confirmPayment({
    //   //`Elements` instance that was used to create the Payment Element
    //   elements,
    //   clientSecret,
    //   confirmParams: {
    //     return_url: "https://example.com/order/123/complete",
    //   },
    // });

    // if (error) {
    //   // This point will only be reached if there is an immediate error when
    //   // confirming the payment. Show error to your customer (for example, payment
    //   // details incomplete)
    //   setErrorMessage(error.message);
    // } else {
    //   // Your customer will be redirected to your `return_url`. For some payment
    //   // methods like iDEAL, your customer will be redirected to an intermediate
    //   // site first to authorize the payment, then redirected to the `return_url`.
    // }
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button
        type="submit"
        className="mt-3 bg-danger text-light btn"
        disabled={!stripe || !elements}
      >
        Pay
      </button>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
}

export default Step1;

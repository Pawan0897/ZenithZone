import Step1 from "./Step1";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function Step2(items) {
  const stripePromise = loadStripe(
    "*******************************************************************"
  );
  const options = {
    mode: "payment",
    amount: 1099,

    currency: "usd",
    appearance: {
      theme: "stripe",
      colorBackground: "#ffffff",
    },
  };
  console.log(items,"[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[");
  

  // ////////////////////////////////////////
  return (
    <>
      <div className="cursor-dot" data-cursor-dot></div>
      <div className="curson-outline" data-cursor-outline></div>
      <div className="container ">
        <div className="row">
          <Elements stripe={stripePromise} options={options}>
            <Step1 item={items}/>
          </Elements>
        </div>
      </div>
    </>
  );
}

export default Step2;

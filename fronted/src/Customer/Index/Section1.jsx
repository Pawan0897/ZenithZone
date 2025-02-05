import { Link } from "react-router-dom";
import imge from "../Index/image/slide1.png";
import imge2 from "../Index/image/slide2.png";
import Section4 from "./Section4";
export default function Section1() {
  return (
    <>
      <section className="slider">
        <div className="container">
          <div className="row ">
            {/* <div className="col-md-5 slider-box">
              <div className="slider-text">
                <span className="text-capitalize"> in world besr</span>

                <h1 className="text-uppercase">Fasion brands</h1>
              </div>
            </div> */}
          </div>
        </div>
      </section>
      {/* ****************** */}
      <Section4/>

      {/* ************************ Second sectionm  */}

      <div className="container">
        <div
          className="row d-flext justify-content-center align-items-center"
          id="ttcmsaboutus"
        >
          <div className="ttcmsabout ttabout1 col-sm-5 col-xs-12 left-to-right hb-animate-element hb-in-viewport">
            <div className="ttcmsabout-content">
              <div className="ttcmsabout-title">ZenithZone: Your Gateway to a World of Possibilities</div>
              <p>
                At ZenithZone, we're more than just an online store; we're your
                gateway to a world of possibilities. We believe in empowering
                individuals with the freedom to explore, discover, and
                experience the best that life has to offer
              </p>
              <p>
              To provide a seamless and enjoyable online shopping experience, offering a diverse range of high-quality products at competitive prices. We strive to build long-lasting relationships with our customers by providing exceptional customer service and ensuring their complete satisfaction.
              </p>
              <div className="ttcmsabout-btn">
                <a href="#" title="shop Now">
                  shop Now
                </a>
              </div>
            </div>
            {/* <div className="image1 ttimg">
                <div className="ttabout-img">
                  <Link href="#">
                    <img
                      src={imge2}
                      alt="about-01"
                      width="500"
                      height="670"
                    />
                  </Link>
                </div>
              </div> */}
          </div>

          {/* /********************* */}

          <div className="ttcmsabout ttabout2 col-sm-5 offset-sm-1 col-xs-12 right-to-left hb-animate-element hb-in-viewport">
            <div className="image2 ttimg">
              <div className="ttabout-img">
                <Link href="#">
                  {" "}
                  <img src={imge} alt="about-02" width="500" height="670" />
                </Link>
              </div>
            </div>
            {/* <div className="ttcmsabout-content">
                <div className="ttcmsabout-title">
                  La Fashion est le tbeatre de notre intinite.
                </div>
                <div className="ttcmsabout-btn">
                  <a href="#" title="show more">
                    show more
                  </a>
                </div>
              </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

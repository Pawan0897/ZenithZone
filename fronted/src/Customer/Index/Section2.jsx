
import "../style.css";
import { FaGift } from "react-icons/fa6";
import { TbClock24 } from "react-icons/tb";import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineSavings } from "react-icons/md";
export default function Section2() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div id="ttcmsservices">
            <div className="container d-flex justify-content-center align-items-center">
              <div className="ttcmstopservice-content owl-loaded owl-carousel owl-drag">
                <div className="owl-stage-outer">
                  <div
                    className="owl-stage d-flex"
                    // style="transform: translate3d(0px, 0px, 0px); transition: all; width: 1290px;"
                  >
                    <div
                      className="owl-item active"
                      // style="width: 322.5px;"
                    >
                      <div className="ttsupport service">
                        <div className="service-icon-background">
                          <div className="ttshare_img service-icon">
                          <TbTruckDelivery />
                          </div>
                        </div>
                        <div className="service-content">
                          <div className="service-title">
                            Worldwide Delivery
                          </div>
                          <div className="service-desc">
                            Lorem Ipsum Dolor Sit co.
                          </div>
                        </div>{" "}
                       
                      </div>
                    </div>
                    <div
                      className="owl-item active"
                      // style="width: 322.5px;"
                    >
                      <div className="ttshare service">
                        <div className="service-icon-background">
                          <div className="ttshare_img service-icon">
                            <FaGift />
                          </div>
                        </div>
                        <div className="service-content">
                          <div className="service-title">Gift Vouchers</div>
                          <div className="service-desc">
                            Lorem Ipsum Dolor Sit co.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="owl-item active"
                      // style="width: 322.5px;"
                    >
                      <div className="ttsaving service">
                        <div className="service-icon-background">
                          <div className="ttsaving_img service-icon">
                            <TbClock24 />
                          </div>
                        </div>
                        <div className="service-content">
                          <div className="service-title">24*7 Support</div>
                          <div className="service-desc">
                            Lorem Ipsum Dolor Sit co.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="owl-item active"
                      // style="width: 322.5px;"
                    >
                      <div className="ttsupport service">
                        <div className="service-icon-background">
                          <div className="ttgreat_img service-icon">
                            <MdOutlineSavings />
                          </div>
                        </div>
                        <div className="service-content">
                          <div className="service-title">Great Savings</div>
                          <div className="service-desc">
                            Lorem Ipsum Dolor Sit co.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="owl-dots disabled"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

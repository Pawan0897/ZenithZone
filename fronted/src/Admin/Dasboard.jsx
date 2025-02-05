import Sidebar from "./Sidebar";

export default function Dasboard() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10 mt-5">
            <div className="mb-3 mt-5 card32 card12">
              <div className="no-gutters row">
                <div className="col-sm-6 col-md-4 col-xl-4">
                  <div className="card no-shadow rm-border bg-transparent widget-chart text-left">
                    <div className="icon-wrapper rounded-circle">
                      <div className="icon-wrapper-bg opacity-10 bg-warning"></div>
                      <i className="lnr-laptop-phone text-dark opacity-8"></i>
                    </div>
                    <div className="widget-chart-content">
                      <div className="widget-subheading">Cash Deposits</div>
                      <div className="widget-numbers">1,7M</div>
                      <div className="widget-description opacity-8 text-focus">
                        <div className="d-inline text-danger pr-1">
                          <i className="fa fa-angle-down"></i>
                          <span className="pl-1">54.1%</span>
                        </div>
                        less earnings
                      </div>
                    </div>
                  </div>
                  <div className="divider m-0 d-md-none d-sm-block"></div>
                </div>
                <div className="col-sm-6 col-md-4 col-xl-4">
                  <div className="card no-shadow rm-border bg-transparent widget-chart text-left">
                    <div className="icon-wrapper rounded-circle">
                      <div className="icon-wrapper-bg opacity-9 bg-danger"></div>
                      <i className="lnr-graduation-hat text-white"></i>
                    </div>
                    <div className="widget-chart-content">
                      <div className="widget-subheading">
                        Invested Dividents
                      </div>
                      <div className="widget-numbers">
                        <span>9M</span>
                      </div>
                      <div className="widget-description opacity-8 text-focus">
                        Grow Rate:
                        <span className="text-info pl-1">
                          <i className="fa fa-angle-down"></i>
                          <span className="pl-1">14.1%</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="divider m-0 d-md-none d-sm-block"></div>
                </div>
                <div className="col-sm-12 col-md-4 col-xl-4">
                  <div className="card no-shadow rm-border bg-transparent widget-chart text-left">
                    <div className="icon-wrapper rounded-circle">
                      <div className="icon-wrapper-bg opacity-9 bg-success"></div>
                      <i className="lnr-apartment text-white"></i>
                    </div>
                    <div className="widget-chart-content">
                      <div className="widget-subheading">Capital Gains</div>
                      <div className="widget-numbers text-success">
                        <span>$563</span>
                      </div>
                      <div className="widget-description text-focus">
                        Increased by
                        <span className="text-warning pl-1">
                          <i className="fa fa-angle-up"></i>
                          <span className="pl-1">7.35%</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* /////////////////////// */}
    </>
  );
}

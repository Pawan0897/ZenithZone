import { useQuery } from "@tanstack/react-query";
import useToken from "../Hooks/useToken";
import { AccountIsDone, ViewCompanyUser } from "../Request/https";
import { useState } from "react";
import { Offcanvas } from "react-bootstrap";

export default function Profile() {
  const token = useToken();
  const userDetails = useQuery({
    queryKey: ["userDetail"],
    queryFn: () => ViewCompanyUser(token),
  });
  // console.log(data,"ppppppppppppppppppppppppppppppppp");
  const detail = userDetails?.data?.data?.data;

  /********************************** OffCanvs */
  const [toggleshow, setToggleShow] = useState(false);
  const toggleOpen = () => setToggleShow((s) => !s);
  const CloseToggle = () => setToggleShow(false);

  const AccountIs = useQuery({
    queryKey: ["AccountIsComplited"],
    queryFn: () => AccountIsDone(token),
  });
  const AccountStatus = AccountIs?.data?.data?.verify;

  const Message = AccountIs?.data?.data?.message;
  return (
    <>
      <div className="canvas text-end">
        <button
          className="me-2 text-end btn text-light  bg-danger"
          onClick={toggleOpen}
        >
          Profile
        </button>
      </div>
      {/* ************************** Canvas */}
      <Offcanvas show={toggleshow} placement="end" onHide={CloseToggle}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Admin Profile</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="container">
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <h5>Name : {detail?.firstname}  {detail?.lastname}</h5>
                <h5>Email : {detail?.email}</h5>
                <h5>Phone : {detail?.phone}</h5>
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
                    // onClick={() => OpenLink.mutate(token)}
                  >
                    {Message}
                  </button>
                )}
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

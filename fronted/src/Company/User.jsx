import { useMutation, useQuery } from "@tanstack/react-query";
import Sidebar from "./Sidebar";
import "./style.css";
import useToken from "../Hooks/useToken";
import { AccountIsDone, AccountLink, ViewCompanyUser } from "../Request/https";
import Profile from "./Profile";

export default function User() {
  const token = useToken();
  const { data } = useQuery({
    queryKey: ["userDetail"],
    queryFn: () => ViewCompanyUser(token),
  });
  // console.log(data,"ppppppppppppppppppppppppppppppppp");
  const detail = data?.data?.data;

  /***********************   Account is complited !!!!!!! */
  const AccountIs = useQuery({
    queryKey: ["AccountIsComplited"],
    queryFn: () => AccountIsDone(token),
  });

  const AccountStatus = AccountIs?.data?.data?.verify;

  const Message = AccountIs?.data?.data?.message;
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
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10 mt-5">
            <Profile />
            <div className="container">
              <div className="card">
                <div className="user-info">
                  <img
                    src="profile.jpg"
                    alt="Profile Image"
                    className="profile-image"
                  />
                  <h2>{detail?.firstname + detail?.lastname}</h2>
                  <p>{detail?.email}</p>
                  <p>{detail?.phone}</p>
                </div>
                <div className="buttons">
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
          </div>
        </div>
      </div>
    </>
  );
}

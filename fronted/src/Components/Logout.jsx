import { useNavigate } from "react-router-dom";
import useToken from "../Hooks/useToken";
import { useMutation } from "@tanstack/react-query";
import { userlogOut } from "../Request/https";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { userInfo } from "../Redux/Reducers";
import { MdLogout } from "react-icons/md";
export default function Logout() {
  const navigation = useNavigate();
const dispatch = useDispatch()
  const token = useToken();
  const logout = useMutation({
    mutationFn: (token) => userlogOut(token),
    onSuccess: (res) => {
      if (res?.data?.statuscode == 200) {
        Swal.fire({
          title: `${res?.data?.message}`,
          text: "you can logout successfullly !",
          icon: "success",
        });
          console.log( "..................", dispatch(userInfo(res?.data?.data)));
          
        navigation("/login");
      } else {
        Swal.fire({
          title: `${res?.data?.message}`,
          text: "please check logout info !!",
          icon: "error",
        });
      }
    },
  });
  return (
    <>
      <a
        className="bg-warning text-dark border-0 btn"
        onClick={() => logout.mutate(token)}
      >
        <MdLogout />
      </a>
    </>
  );
}

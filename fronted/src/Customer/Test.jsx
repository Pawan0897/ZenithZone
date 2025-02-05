// import { useMutation } from "@tanstack/react-query"
// import { OrderGen } from "../Request/https"
// import useToken from "../Hooks/useToken"
// import { useLocation } from "react-router-dom"

// export default function Test() {
//     const token = useToken()
//     const GenOrder = useMutation({
//         mutationFn:({body,token}) => OrderGen(body,token)
//     })
//     const location = useLocation()

//     console.log(location,"submit..........................................");
    
//   return (
//     <>
//       <div className="buttonsubmit">
//         <button className="bg-dark btn  text-light"  onClick={() => GenOrder.mutate({body:items,token})} type="button" >
//             submit
//         </button>
//       </div>
//     </>
//   )
// }

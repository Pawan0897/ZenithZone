import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useToken from "../Hooks/useToken";
import Header from "./Header";
import { AddToCart, ShowWishList } from "../Request/https";
import Swal from "sweetalert2";

export default function WishList() {
  const queryClient = useQueryClient();
  const token = useToken();
  const { data } = useQuery({
    queryKey: ["showwishlist"],
    queryFn: () => ShowWishList(token),
  });
  console.log(":::::::::::::::::::::::",data);
  //*********************** Add to Cart */
  const cartadd = useMutation({
      mutationKey: ["addtocart"],
      mutationFn: (body) => AddToCart(body),
      onSuccess: (res) => {
        if (res?.data?.statuscode == 200) {
          console.log(res, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>....");
          queryClient.invalidateQueries({ queryKey: ["addtocart"] }),
            queryClient.invalidateQueries({ queryKey: ["countcart"] });
          Swal.fire({
            title: `${res?.data?.message}`,
            text: "Your cart addedd successfully !!!!",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: `${res?.data?.message}`,
            icon: "info",
          });
        }
      },
    });
  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <h2 className="text-center">You Wishlist !!</h2>
          {data?.data?.data?.map((item) => {
            return (
              <>
                <div className="col-md-3 mt-4">
                  <div className="card">
                    <div className="card-img">
                      <img
                        src={`http://localhost:3000/api/${item?.image}`}
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="cart-box"></div>
                    </div>
                    {/* ******** card body */}
                    <div className="card-body">
                      {/* *********** price & Wishlist */}
                      <div className="price-det d-flex  align-items-center">
                        <h6>
                          Price :
                          <span className="text-danger">${item?.price}.00</span>
                        </h6>
                      </div>
                      {/* ****************** add to cart button  */}
                      <div className="addtocart text-center d-flex mt-3">
                      <button
                          className="btn button me-4  bg-warning"
                          type="button"
                          onClick={() =>{let body = {
                            token: token,
                            productid: item?.productId,
                          };
                          cartadd.mutate(body)}} 
                        >
                         Add To Cart
                        </button>
                        <button
                          className="btn button  bg-warning"
                          type="button"
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

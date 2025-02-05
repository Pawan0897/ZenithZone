import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Setsearch } from "../Redux/Reducers";

export default function Search() {
  const [isActive, setIsActive] = useState(false);
  const searchInputRef = useRef(null);
  const handleToggle = (evt) => {
    setIsActive(!isActive);
    if (!isActive) {
      evt.preventDefault();
    }
  };

  /**************************** use selector */
  const dispatch = useDispatch();
  const search = useSelector((state) => state.user.search);

  console.log(".......................", search);

  return (
    <>
      <div className={`search-wrapper ${isActive ? "active" : ""}`}>
        {" "}
        <div className="input-holder">
          {" "}
          <input
            type="text"
            className="search-input"
            value={search}
            onChange={(e) => dispatch(Setsearch(e.target.value))}
            placeholder="Type to search"
            ref={searchInputRef}
          />{" "}
          <button className="search-icon bg-red" onClick={handleToggle}>
            {" "}
            <span> </span>{" "}
          </button>{" "}
        </div>{" "}
        <span
          className="close"
          onClick={() => {
            handleToggle(), dispatch(Setsearch(""));
          }}
        ></span>
      </div>
    </>
  );
}

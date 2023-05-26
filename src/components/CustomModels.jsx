import React from "react";
import "../style/custommodels.css";
import { useSelector } from "react-redux";
import MyButton from "./MyButton";
const CustomModels = ({ id, setshowPopup, showPopup }) => {
  const allUser = useSelector((state) => state.app.user);

  // get user single user id with filter
  const singleuser = allUser.filter((ele) => ele.id === id);

  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <h2>{singleuser[0].name}</h2>
          <h3>{singleuser[0].email}</h3>
          <p>{singleuser[0].age}</p>
          <p>{singleuser[0].gender}</p>

          <MyButton
            type="button"
            className="btn btn-danger"
            onClick={() => setshowPopup(false)}
          >
            Close
          </MyButton>
        </div>
      </div>
    </>
  );
};

export default CustomModels;

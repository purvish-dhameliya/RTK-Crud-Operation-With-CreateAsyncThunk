import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser, showUser } from "../store/UserDetailsSlice";
import CustomModels from "../components/CustomModels";
import MyInput from "../components/MyInput";
import MyButton from "../components/MyButton";

const Read = () => {
  const [id, setId] = useState();
  const [showPopup, setshowPopup] = useState(false);
  const [radioData, setradioData] = useState("");

  const dispatch = useDispatch();
  // store mathi app je reducer ma che te call krvani data display karva useSelector use thay

  const { user, loading, searchData } = useSelector((state) => state.app);

  useEffect(() => {
    // action ne call karva je slice ma bani hoy tene call action karva dispatch use thay
    dispatch(showUser());
  }, [dispatch]);

  if (loading) {
    return <h2>loading..</h2>;
  }

  return (
    <>
      {showPopup && (
        <CustomModels
          id={id}
          showPopup={showPopup}
          setshowPopup={setshowPopup}
        />
      )}

      <div className="mx-auto mt-3 p-1">
        <div className="container p-1">
          <MyInput
            className="form-check-input"
            type="radio"
            name="gender"
            checked={radioData === ""}
            onChange={() => setradioData("")}
          />
          <label className="form-check-label">All</label>
          <MyInput
            className="form-check-input"
            type="radio"
            name="gender"
            value="male"
            checked={radioData === "male"}
            onChange={(e) => setradioData(e.target.value)}
            
          />
          <label className="form-check-label">Male</label>
          
          <MyInput
            className="form-check-input"
            type="radio"
            name="gender"
            value="female"
            checked={radioData === "female"}
            onChange={(e) => setradioData(e.target.value)}
          />
          <label className="form-check-label">Female</label>
        </div>
        {user &&
          user
            .filter((ele) => {
              if (searchData.length === 0) {
                return ele;
              } else {
                return ele.email
                  .toLowerCase()
                  .includes(searchData.toLowerCase());
              }
            })
            .filter((ele) => {
              if (radioData === "male") {
                return ele.gender === radioData;
              } else if (radioData === "female") {
                return ele.gender === radioData;
              } else {
                return ele;
              }
            })
            .map((us) => (
              <>
                <div
                  key={us.id}
                  className="card mx-auto mt-4 w-75"
                  style={{ width: "18rem" }}
                >
                  <div className="card-body">
                    <h5 className="card-title">{us.email}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">
                      {us.name}
                    </h6>

                    <p className="card-text">{us.gender}</p>
                    <MyButton
                      className="btn btn-primary me-2"
                      onClick={() => [setId(us.id), setshowPopup(true)]} // ekk saathe 2 state data ne call karva alag alag state ne []
                    >
                      View
                    </MyButton>

                    <Link to={`/edit/${us.id}`} className="card-link">
                      Edit
                    </Link>
                    <Link
                      to=""
                      className="card-link"
                      onClick={() => dispatch(deleteUser(us.id))}
                    >
                      Delete
                    </Link>
                  </div>
                </div>
              </>
            ))}
      </div>
    </>
  );
};

export default Read;

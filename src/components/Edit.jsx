import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../store/UserDetailsSlice";
import MyInput from "./MyInput";
import MyLabel from "./MyLabel";
import MyButton from "./MyButton";

const Edit = () => {
  const [updateData, setUpdateData] = useState({});

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.app);

  useEffect(() => {
    if (id) {
      const singleUser = user.filter((ele) => ele.id === id);
      setUpdateData(singleUser[0]);
    }
  }, [id,user]);

  const newData = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  console.log("updated data", updateData);

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUser(updateData));
    navigate("/read");
  };

  return (
    <>
      <div className="container">
        <h2 className="my-2">Edit data</h2>
        <form className="w-50 mx-auto mt-5" onSubmit={handleUpdate}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              name="email"
              value={updateData?.email || ""}
              className="form-control"
              onChange={newData}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">name</label>
            <input
              type="name"
              name="name"
              value={updateData && updateData?.name}
              className="form-control"
              onChange={newData}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Age</label>
            <input
              type="number"
              name="age"
              className="form-control"
              value={updateData && updateData?.age}
              onChange={newData}
            />
          </div>

          <div className="mb-3">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value="male"
              checked={updateData && updateData?.gender === "male"}
              onChange={newData}
            />
            <label className="form-check-label">Male</label>
          </div>

          <div className="mb-3">
            <MyInput
              className="form-check-input"
              name="gender"
              type="radio"
              value="female"
              checked={updateData && updateData?.gender === "male"}
              onChange={newData}
            />
            <MyLabel className="form-check-label">Female</MyLabel>
          </div>

          <MyButton type="submit" className="btn btn-primary mt-2">
            Submit
          </MyButton>
        </form>
      </div>
    </>
  );
};

export default Edit;

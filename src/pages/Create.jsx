import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../store/UserDetailsSlice";
import { useNavigate } from "react-router-dom";
import MyInput from "../components/MyInput";
import MyButton from "../components/MyButton";

const Create = () => {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getUserInputs = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    dispatch(createUser(user));
    navigate("/read");
  };
  return (
    <>
      <div className="container">
        <h2 className="my-2">Create Post data</h2>
        <form className="w-50 mx-auto mt-5" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <MyInput
              type="email"
              name="email"
              className="form-control"
              onChange={getUserInputs}
              placeholder="Enter your Email"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Name</label>
            <MyInput
              type="text"
              name="name"
              className="form-control"
              onChange={getUserInputs}
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Age</label>
            <MyInput
              type="number"
              name="age"
              className="form-control"
              onChange={getUserInputs}
              placeholder="Enter your age"
            />
          </div>

          <div className="mb-3">
            <MyInput
              type="radio"
              name="gender"
              className="form-check-input"
              onChange={getUserInputs}
              value="male"
            />
            <label className="form-label">Male</label>
          </div>

          <div className="mb-3">
            <MyInput
              type="radio"
              name="gender"
              className="form-check-input"
              onChange={getUserInputs}
              value="female"
            />
            <label className="form-label">Female</label>
          </div>

          <MyButton type="submit" className="btn btn-primary mt-2">
            Submit
          </MyButton>
        </form>
      </div>
    </>
  );
};

export default Create;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { searchUser } from "../features/UserDetailsSlice";
import MyInput from "./MyInput";

const Navbar = () => {
  const allUsers = useSelector((state) => state.app.user);
  const [searchData, setSearchData] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchUser(searchData));
  }, [dispatch, searchData]);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Redux-Crud
          </Link>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Create Post
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/read">
                  All Posts : {allUsers.length}
                </Link>
              </li>
            </ul>
            <form className="d-flex w-50 " role="search">
              <MyInput
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => setSearchData(e.target.value)}
              />
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

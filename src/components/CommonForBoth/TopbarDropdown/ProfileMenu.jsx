import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'

import PropTypes from "prop-types";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

//i18n
import { withTranslation } from "react-i18next";
// Redux
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

// users
import user1 from "../../../assets/images/users/avatar-1.jpg";

const ProfileMenu = (props) => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false);

  const [username, setusername] = useState("Admin");

  // useEffect(() => {
  //   if (localStorage.getItem("authUser")) {
  //     if (import.meta.env.VITE_APP_DEFAULTAUTH === "firebase") {
  //       const obj = JSON.parse(localStorage.getItem("authUser"));
  //       setusername(obj.displayName);
  //     } else if (
  //       import.meta.env.VITE_APP_DEFAULTAUTH === "fake" ||
  //       import.meta.env.VITE_APP_DEFAULTAUTH === "jwt"
  //     ) {
  //       const obj = JSON.parse(localStorage.getItem("authUser"));
  //       setusername(obj.username);
  //     }
  //   }
  // }, [props.success]);
  const user = useSelector(state => state.users.user)

  useEffect(() => {
    if (user) {
      setusername(user.store)
    }
  }, [user])

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          tag="button"
        >
          <span className="d-none d-xl-inline-block ms-2 me-1">{username}</span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <div className="dropdown-divider" />
          <Link to="/logout" className="dropdown-item">
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span>Logout</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};


export default ProfileMenu


import React, { Fragment } from "react";
import SideBar from "./SideBar";
import Nav from "./Nav";

function NavBar({ navLinks, notLoggedIn, fullName }) {
  return (
    <Fragment>
      <div className="sticky-alerts"></div>
      <div
        className="sidebar-overlay"
        onClick={() => window.halfmoon.toggleSidebar()}
      ></div>
      <Nav notLoggedIn={notLoggedIn} fullName={fullName} />
      <SideBar navLinks={navLinks} />
    </Fragment>
  );
}

export default NavBar;

import React from "react";
import { Link } from "react-router-dom";
import { signOut } from "../../db/ops/authOps";

function Nav({ notLoggedIn, fullName }) {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <button
          className="btn btn-action"
          type="button"
          onClick={() => window.halfmoon.toggleSidebar()}
        >
          <i className="fa fa-bars" aria-hidden="true"></i>
          <span className="sr-only">Toggle sidebar</span>
        </button>
      </div>

      <Link to="/" className="navbar-brand">
        V-H
      </Link>

      <div className="navbar-content">About</div>

      {!notLoggedIn && (
        <div className="navbar-content ml-auto mr-5">
          <ul className="navbar-nav">
            <li className="nav-item dropdown with-arrow">
              <span
                className="nav-link"
                data-toggle="dropdown"
                id="nav-link-dropdown-toggle"
              >
                <i
                  className="fa fa-chevron-circle-down ml-5"
                  aria-hidden="true"
                ></i>
              </span>

              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="nav-link-dropdown-toggle"
              >
                <span className="dropdown-item">{fullName}</span>
                <div className="dropdown-content">
                  <button
                    className="btn btn-danger btn-sm"
                    type="button"
                    onClick={signOut}
                  >
                    LogOut
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Nav;

import React from "react";
import { Link } from "react-router-dom";

function SideBar({ navLinks }) {
  return (
    <div className="sidebar">
      <div className="sidebar-menu">
        <h6 className="sidebar-title">Actions</h6>

        <div className="sidebar-divider"></div>

        {navLinks.map((link, i) => {
          return (
            <Link
              key={i}
              to={link.key}
              className="sidebar-link sidebar-link-with-icon"
            >
              <span className="sidebar-icon bg-transparent justify-content-start mr-0">
                <i className={`fa ${link.icon}`} aria-hidden="true"></i>
              </span>
              {link.content}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default SideBar;

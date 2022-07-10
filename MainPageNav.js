import React from "react";
import user_img from "../images/user.png";
import { useNavigate } from "react-router-dom";
import { AuthContext, useAuth } from "./AuthContext";


const MainPageNav = () => {
  const history = useNavigate();
  const auth = useAuth();
  const handleSignOut = () => {
    auth.signOut();
    history("/login");
  };
  return (
    <nav
      class="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "#d82122", color: "white" }}
    >
 
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
        <a class="navbar-brand mt-2 mt-lg-0" href="/dashboard">
        <span
          style={{
            color: "white",
            letterSpacing: "2px",
            display: "inline-block",
            verticalAlign: " middle",
            fontWeight: "bold",
            fontSize: "1em",
          }}
        >
          KFCTEAM
        </span>
      </a>
          <a
            class="nav-item nav-link"
            href="/dashboard"
            style={{ color: "white" }}
          >
            Home
          </a>

          <a class="nav-item nav-link" href="/team" style={{ color: "white" }}>
            Team
          </a>

          <a
            class=" nav-item nav-link"
            href="/schedule"
            style={{ color: "white" }}
          >
            Schedule
          </a>

          <a
            class="nav-item nav-link"
            href="/contact"
            style={{ color: "white" }}
          >
            Contact
          </a>
        </div>
      </div>

      <div className="d-flex align-items-center">
        <div class="dropdown">
          <a
            class="dropdown-toggle d-flex align-items-center hidden-arrow dropbtn"
            href="#"
            id="navbarDropdownMenuAvatar"
            role="button"
            data-mdb-toggle="dropdown"
            aria-expanded="false"
            style={{ color: "#8a0404" }}
          >
            <img
              src={user_img}
              class="rounded-circle"
              height="25"
              alt="Black and White Portrait of a Man"
              loading="lazy"
            />
          </a>
          <div class="dropdown-content">
            <a href="/myprofile">My Profile</a>
            <a href="#" onClick={handleSignOut}>
              Sign out
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainPageNav;

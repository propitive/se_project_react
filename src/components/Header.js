import { Link } from "react-router-dom/cjs/react-router-dom";
import logoPath from "../images/logo.svg";
import avatarPath from "../images/avatar.svg";
import ToggleSwitch from "./ToggleSwitch";
import CurrentUserContext from "../contexts/CurrentUserContext";
import React from "react";

function Header({ onCreateModal, location, onLogIn, onSignUp }) {
  const { isLoggedIn, currentUser, alternateAvatar } =
    React.useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  console.log(isLoggedIn);
  console.log(currentUser);

  return (
    <header className="header">
      <div className="header__first-section">
        <Link to="/">
          <img src={logoPath} alt="logo" className="header__logo" />
        </Link>
        <h2 className="header__date">
          {currentDate}, {location}
        </h2>
      </div>
      <div className="header__second-section">
        <ToggleSwitch />
        {isLoggedIn ? (
          <>
            <button
              type="button"
              className="header__button"
              onClick={onCreateModal}
            >
              + New Clothes
            </button>
            <Link className="header__profile-link" to="/profile">
              <div className="header__name">Terrence Tegegne</div>
            </Link>
            {currentUser === "" ? (
              <p>{alternateAvatar}</p>
            ) : (
              <img src={avatarPath} alt="logo" className="header__avatar" />
            )}
          </>
        ) : (
          <>
            <button type="button" className="header__button" onClick={onSignUp}>
              Sign Up
            </button>
            <button type="button" className="header__button" onClick={onLogIn}>
              Login
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;

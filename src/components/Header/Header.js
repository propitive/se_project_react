import React, { useState, useContext } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import "../Header/Header.css";
import "../Header/Navigation.css";
import headerLogo from "../../images/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../context/CurrentUserContext";

const Header = ({
  weatherData,
  handleAddClick,
  openLoginModal,
  openRegisterModal,
  setUser,
}) => {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const { city } = weatherData || {};

  const params = new URLSearchParams(window.location.search);
  const username = params.get("username") || "User";

  const [isToggleOn, setIsToggleOn] = useState(false);

  const handleToggle = () => {
    setIsToggleOn(!isToggleOn);
  };

  const currentUser = useContext(CurrentUserContext);
  const history = useHistory();
  const location = useLocation();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    history.push("/");
  };

  const isMainPage = location.pathname === "/";
  const isProfilePage = location.pathname === "/profile";

  return (
    city && (
      <header className="header">
        <div className="header__container">
          <Link to="/">
            <img src={headerLogo} alt="wtwr logo" className="header__logo" />
          </Link>
          <p className="header__date">{`${currentDate}, ${city}`}</p>
        </div>

        <div className="header__nav">
          <ToggleSwitch isChecked={isToggleOn} onToggle={handleToggle} />

          {currentUser ? (
            <>
              <button onClick={handleAddClick} className="navigation__button">
                + Add clothes
              </button>
              <span className="navigation__username">
                {currentUser.name || username}
              </span>
              <Link to="/profile">
                {currentUser.avatar ? (
                  <img
                    className="navigation__user"
                    src={currentUser.avatar}
                    alt="user avatar"
                  />
                ) : (
                  <button className="navigation__default">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </button>
                )}
              </Link>
              {!isMainPage && !isProfilePage && (
                <button onClick={handleSignOut} className="navigation__button">
                  Sign out
                </button>
              )}
            </>
          ) : (
            <>
              <span className="navigation__link" onClick={openLoginModal}>
                Log in
              </span>
              <span className="navigation__link" onClick={openRegisterModal}>
                Sign up
              </span>
            </>
          )}
        </div>
      </header>
    )
  );
};

export default Header;

import React, { useState, useContext } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import "../Header/Header.css";
import "../Header/Navigation.css";
import headerLogo from "../../images/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../context/CurrentUserContext";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

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
  const [sidebar, setSidebar] = useState(false);

  const handleToggle = () => {
    setIsToggleOn(!isToggleOn);
  };

  const showSidebar = () => setSidebar(!sidebar);
  const handleCloseOnOverlayClick = (event) => {
    console.log(event.target);
    console.log(event.currentTarget);
    if (event.target === event.currentTarget) {
      showSidebar();
    }
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
        <div className="header__whole-container">
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
                  <button
                    onClick={handleSignOut}
                    className="navigation__button"
                  >
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
        </div>
        <div className="menu__container">
          <div className="navbar">
            <div className="navbar__logo-date">
              <Link
                to="/"
                style={{ textDecoration: "none", alignSelf: "center" }}
              >
                <img className="header__logo" src={headerLogo} />
              </Link>
              <p className="navbar__date">{`${currentDate}, ${city}`}</p>
            </div>
            <Link to="#" className="menu-bars">
              <FaIcons.FaBars
                style={{
                  color: "black",
                }}
                onClick={showSidebar}
              />
            </Link>
          </div>
          <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
            <div
              className={`nav-menu__backdrop ${
                sidebar ? "nav-menu__backdrop__open" : ""
              }`}
              onClick={handleCloseOnOverlayClick}
            ></div>
            <ul className="nav-menu-items">
              <li className="navbar-toggle">
                <Link to="#" className="menu-bars" onClick={showSidebar}>
                  <AiIcons.AiOutlineClose
                    style={{
                      color: "white",
                    }}
                  />
                </Link>
              </li>
              <li onClick={handleAddClick} className="nav-text">
                <span>+ Add Clothes</span>
              </li>
              <div className="toggle-switch__container">
                <ToggleSwitch isChecked={isToggleOn} onToggle={handleToggle} />
              </div>
              {/* {SidebarData.map((item, index) => {
                      return (
                        <li key={index} className={item.cName}>
                          <Link to={item.path}>
                            <span>{item.title}</span>
                          </Link>
                        </li>
                      );
                    })} */}
              {/* <BookOnlineButton className=" nav-menu__button" /> */}
            </ul>
          </nav>
        </div>
      </header>
    )
  );
};

export default Header;

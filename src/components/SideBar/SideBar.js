import React, { useContext } from "react";
import "./SideBar.css";
import CurrentUserContext from "../../context/CurrentUserContext";
function SideBar({ handleEditProfileOpen, handleLogoutModalOpen }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="side-bar">
      <div className="side-bar__container">
        <div className="side-bar__user-info">
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
          <p className="side-bar__username">{currentUser?.name || "User"}</p>
        </div>
        <button onClick={handleEditProfileOpen} className="side-bar__button">
          Change Profile Data
        </button>
        <button onClick={handleLogoutModalOpen} className="side-bar__logout">
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;

import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import "./SideBar.css";
import CurrentUserContext from "../../context/CurrentUserContext";
function SideBar({ handleSignOut, handleEditProfileOpen }) {
  const currentUser = useContext(CurrentUserContext);
  const history = useHistory();

  const handleLogout = () => {
    handleSignOut();
    history.push("/");
  };

  console.log("This is current user -->" + currentUser);

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
        <button onClick={handleLogout} className="side-bar__logout">
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;

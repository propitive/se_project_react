import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import CurrentUserContext from "../../context/CurrentUserContext";
import "./Profile.css";

function Profile({
  cards,
  handleAddClick,
  onCardClick,
  onCardLike,
  handleSetUserNull,
  handleEditProfileOpen,
  currentUser,
}) {
  const history = useHistory();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    handleSetUserNull();
    history.push("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      history.push("/");
    }
  }, [history]);

  return (
    <div className="profile">
      <div className="profile-container">
        <SideBar
          handleSignOut={handleSignOut}
          handleEditProfileOpen={handleEditProfileOpen}
        />
        <ClothesSection
          cards={cards}
          handleAddClick={handleAddClick}
          onCardClick={onCardClick}
          onCardLike={onCardLike}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
}

export default Profile;

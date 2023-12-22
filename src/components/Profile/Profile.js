import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import "./Profile.css";

import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  cards,
  handleAddClick,
  handleEditProfileOpen,
  handleSetUserNull,
  handleLogoutModalOpen,
  onCardClick,
  onCardLike,
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
          handleLogoutModalOpen={handleLogoutModalOpen}
        />
        <ClothesSection
          cards={cards}
          handleAddClick={handleAddClick}
          onCardClick={onCardClick}
          onCardLike={onCardLike}
        />
      </div>
    </div>
  );
}

export default Profile;

import React from "react";
import ItemCard from "../ItemCard/ItemCard";
import ItemCardClothesSection from "../ItemCardClothesSection/ItemCardClothesSection";
import "./ClothesSection.css";
import CurrentUserContext from "../../context/CurrentUserContext";

const ClothesSection = ({
  cards = [],
  onCardClick,
  onCardLike,
  handleAddClick,
}) => {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <div className="clothes-section">
      <div className="clothes-section__nav">
        <div className="clothes-section__title">Your Items</div>
      </div>
      <div className="clothes-section-container">
        {currentUser !== null &&
          cards.map((card, index) => {
            return (
              <ItemCardClothesSection
                key={index}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ClothesSection;

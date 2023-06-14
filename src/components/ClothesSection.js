import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { defaultClothingItems } from "../utils/constants";
import ItemCard from "./ItemCard";

export function ClothesSection({ onSelectCard, clothingItems }) {
  const { currentUser } = React.useContext(CurrentUserContext);

  return (
    <section className="clothesSection">
      <div className="clothesSection__text">
        <h2 className="clothesSection__your-items">Your items</h2>
        <h2 className="clothesSection__add-new">+ Add new</h2>
      </div>
      <div className="clothesSection__items">
        {clothingItems
          .filter((card) => card.owner === currentUser?._id)
          .map((filteredCard) => (
            <ItemCard
              key={filteredCard.id}
              card={filteredCard}
              onSelectCard={onSelectCard}
            />
          ))}

        {/* {clothingItems.map((card) => {
          return (
            <ItemCard key={card.id} card={card} onSelectCard={onSelectCard} />
          )
        })} */}
      </div>
    </section>
  );
}

export default ClothesSection;

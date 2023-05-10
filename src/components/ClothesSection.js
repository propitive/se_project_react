import { defaultClothingItems } from "../utils/constants";
import ItemCard from "./ItemCard";

export function ClothesSection({ onSelectCard }) {
  return (
    <section className="clothesSection">
      <div className="clothesSection__text">
        <h2 className="clothesSection__your-items">Your items</h2>
        <h2 className="clothesSection__add-new">+ Add new</h2>
      </div>
      <div className="clothesSection__items">
        {defaultClothingItems.map((card) => {
          return (
            <ItemCard key={card._id} card={card} onSelectCard={onSelectCard} />
          );
        })}
      </div>
    </section>
  );
}

export default ClothesSection;

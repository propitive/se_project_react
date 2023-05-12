import SideBar from "../components/SideBar";
import ClothesSection from "./ClothesSection";

export function Profile({ onSelectCard, clothingItems }) {
  return (
    <section className="profile">
      <SideBar />
      <ClothesSection
        clothingItems={clothingItems}
        onSelectCard={onSelectCard}
      />
    </section>
  );
}

export default Profile;

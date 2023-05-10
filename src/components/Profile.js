import SideBar from "../components/SideBar";
import ClothesSection from "./ClothesSection";

export function Profile({ onSelectCard }) {
  return (
    <section className="profile">
      <SideBar />
      <ClothesSection onSelectCard={onSelectCard} />
    </section>
  );
}

export default Profile;

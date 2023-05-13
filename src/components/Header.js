import { Link } from "react-router-dom/cjs/react-router-dom";
import logoPath from "../images/logo.svg";
import avatarPath from "../images/avatar.svg";
import Checkbox from "./ToggleSwitch";

function Header({ onCreateModal, location }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__first-section">
        <Link to="/">
          <img src={logoPath} alt="logo" className="header__logo" />
        </Link>
        <h2 className="header__date">
          {currentDate}, {location}
        </h2>
      </div>
      <div className="header__second-section">
        <Checkbox />
        <button
          type="button"
          className="header__button"
          onClick={onCreateModal}
        >
          + New Clothes
        </button>
        <Link className="header__profile-link" to="/profile">
          <div className="header__name">Terrence Tegegne</div>
        </Link>
        <img src={avatarPath} alt="logo" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;

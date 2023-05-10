import logoPath from "../images/logo.svg";
import avatarPath from "../images/avatar.svg";
import Checkbox from "./Checkbox";

function Header({ onCreateModal, location }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__first-section">
        <img src={logoPath} alt="logo" className="header__logo" />
        <h2 className="header__date">
          {currentDate}, {location}
        </h2>
      </div>
      <div className="header__second-section">
        {/* <label className="header__switch">
          <input className="header__toggle" type="checkbox" />
          <span className="header__slider"></span>
          <div className="header__toggle_text_section">
            <p className="header__toggle_text_f">F</p>
            <p className="header__toggle_text_c">C</p>
          </div>
        </label> */}
        <Checkbox />
        <button
          type="button"
          className="header__button"
          onClick={onCreateModal}
        >
          + New Clothes
        </button>
        <div className="header__name">Terrence Tegegne</div>
        <img src={avatarPath} alt="logo" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;

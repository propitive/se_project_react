import logoPath from "../images/logo.svg";
import avatarPath from "../images/avatar.svg";

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
        <button
          type="button"
          className="header__button"
          onClick={onCreateModal}
        >
          + New Clothes
        </button>
        <div className="header__name">Name</div>
        <img src={avatarPath} alt="logo" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;

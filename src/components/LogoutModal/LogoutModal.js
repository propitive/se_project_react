import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

function LogoutModal({ handleSignOut, isOpen }) {
  const history = useHistory();

  const handleLogout = () => {
    handleSignOut();
    history.push("/");
  };

  const handleCloseOnOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      handleSignOut();
    }
  };

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        handleSignOut();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <div
      className={`modal-logout ${isOpen ? "modal-logout__open" : ""}`}
      onClick={handleCloseOnOverlayClick}
    >
      <div className="modal-logout__container">
        <h2 className="modal-logout__title">Are you sure?</h2>
        <p className="modal-logout__paragraph">
          Are you sure you are going to want to sign out?
        </p>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <button
            className="modal-logout__button"
            onClick={() => handleLogout()}
          >
            <p className="modal-logout__button-text">{"Sign Out"}</p>
          </button>
        </Link>
        <button
          className="modal-logout__button-close"
          type="button"
          onClick={() => handleSignOut()}
        ></button>
      </div>
    </div>
  );
}

export default LogoutModal;

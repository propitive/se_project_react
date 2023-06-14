import React from "react";
import CurrentModalOpenedContext from "../contexts/CurrentModalOpened";
import "../blocks/modalWithForm/modalWithForm.css";
import closeButtonForms from "../images/close-icon-forms.png";

function ModalWithForm({
  children,
  buttonText,
  title,
  onClose,
  name,
  onSubmit,
}) {
  const openedModal = React.useContext(CurrentModalOpenedContext);

  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__content">
        <img
          className="modal-form__close-icon"
          alt="close-icon"
          src={closeButtonForms}
          onClick={onClose}
        />
        <h3 className="modal-form__title">{title}</h3>
        <form onSubmit={onSubmit}>
          {children}

          {openedModal === "create" && (
            <button type="submit" className="modal-form__button">
              {buttonText}
            </button>
          )}
          {openedModal === "register" && (
            <button type="submit" className="register-modal__submit">
              {buttonText}
            </button>
          )}
          {openedModal === "login" && (
            <button type="submit" className="login-modal__submit">
              {buttonText}
            </button>
          )}
          {/* <button type="submit" className="modal-form__button">
            {buttonText}
          </button> */}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;

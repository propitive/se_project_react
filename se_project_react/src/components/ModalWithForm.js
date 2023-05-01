import "../blocks/modalWithForm/modalWithForm.css";
import closeButtonForms from "../images/close-icon-forms.png";

function ModalWithForm({
  children,
  buttonText = "Add garment",
  title,
  onClose,
  name,
}) {
  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__content">
        <img
          className="modal-form__close-icon"
          src={closeButtonForms}
          onClick={onClose}
        />
        {/* <button type="button" onClick={onClose}>
          Close
        </button> */}
        <h3 className="modal-form__title">{title}</h3>
        <form>{children}</form>
        <button type="submit" className="modal-form__button">
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default ModalWithForm;

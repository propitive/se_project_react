import ModalWithForm from "./ModalWithForm";

export function RegisterModal({ onCloseModal }) {
  return (
    <ModalWithForm
      title={"Log in"}
      onClose={onCloseModal}
      buttonText={"Log in"}
    >
      <label>
        <h2 className="register-modal__header">Email</h2>
        <input placeholder="Email" className="register-modal__input__email" />
      </label>
      <label>
        <h2 className="register-modal__header">Password</h2>
        <input
          placeholder="Password"
          className="register-modal__input__password"
        />
      </label>
      <button className="register-modal__button">or Register</button>
    </ModalWithForm>
  );
}

export default RegisterModal;

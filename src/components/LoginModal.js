import ModalWithForm from "./ModalWithForm";

export function LoginModal({ onCloseModal }) {
  return (
    <ModalWithForm title={"Sign up"} onClose={onCloseModal} buttonText={"Next"}>
      <label>
        <h2 className="login-modal__header">Email</h2>
        <input
          placeholder="Email"
          className="login-modal__input"
          type="email"
          name="email"
          id="email"
          required
          minLength="1"
          maxLength="30"
        />
      </label>
      <label>
        <h2 className="login-modal__header">Password</h2>
        <input
          placeholder="Password"
          className="login-modal__input"
          type="password"
          name="password"
          id="password"
          required
          minLength="9"
          maxLength="30"
        />
      </label>
      <label>
        <h2 className="login-modal__header">Name</h2>
        <input
          placeholder="Name"
          className="login-modal__input"
          type="text"
          name="name"
          id="name"
          required
          minLength="2"
          maxLength="30"
        />
      </label>
      <label>
        <h2 className="login-modal__header">Avatar URL</h2>
        <input
          placeholder="Avatar URL"
          className="login-modal__input__last"
          type="url"
          name="avatar"
          id="avatar"
          required
        />
      </label>
      <button className="login-modal__button">or Log in</button>
    </ModalWithForm>
  );
}

export default LoginModal;

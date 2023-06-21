import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import {
  LoginValidation,
  LoginEmailValidation,
  LoginPasswordValidation,
} from "../../utils/validation";

function LoginModal({ isOpen, onClose, onLogin, switchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  useEffect(() => {
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/gim.test(email);

    setIsFormValid(LoginValidation(email, password));
  }, [email, password]);

  useEffect(() => {
    setIsPasswordValid(LoginPasswordValidation(password));
  }, [password]);

  useEffect(() => {
    setIsEmailValid(LoginEmailValidation(email));
  }, [email]);

  useEffect(() => {
    setIsPasswordValid(false);
    setIsEmailValid(true);
  }, []);

  const emailLabelClassName = isEmailValid
    ? "login__label"
    : "login__label-invalid";

  const emailInputClassName = isEmailValid
    ? "login__input"
    : "login__input-invalid";

  const passwordLabelClassName = isPasswordValid
    ? "login__label-invalid"
    : "login__label";

  const passwordInputClassName = isPasswordValid
    ? "login__input-invalid"
    : "login__input";

  function handleSubmit(e) {
    e.preventDefault();
    onLogin({ email, password });
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Log In"
      buttonText="Log In"
      isValid={isFormValid}
    >
      <label className={emailLabelClassName}>Email</label>
      <input
        className={emailInputClassName}
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        minLength={1}
        maxLength={30}
        autoComplete="email-password"
      />
      <label className={passwordLabelClassName}>Password</label>
      <input
        className={passwordInputClassName}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        minLength={4}
        maxLength={35}
        autoComplete="new-password"
      />
      <p className="or__register" onClick={switchToRegister}>
        or Register
      </p>
    </ModalWithForm>
  );
}

export default LoginModal;

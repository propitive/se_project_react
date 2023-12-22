import React, { useState, useEffect } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

import {
  SignUpValidation,
  SignUpEmailValidation,
  SignUpPasswordValidation,
  SignUpNameValidation,
} from "../../utils/validation";

function RegisterModal({ isOpen, onClose, onRegister, switchToLogin }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);

  useEffect(() => {
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/gim.test(email);

    setIsFormValid(SignUpValidation(email, password, name));
  }, [email, password, name]);

  useEffect(() => {
    setIsEmailValid(SignUpEmailValidation(email));
  }, [email]);

  useEffect(() => {
    setIsPasswordValid(SignUpPasswordValidation(password));
  }, [password]);

  useEffect(() => {
    setIsNameValid(SignUpNameValidation(name));
  }, [name]);

  useEffect(() => {
    setIsPasswordValid(true);
    setIsEmailValid(true);
    setIsNameValid(true);
  }, []);

  const emailLabelClassName = isEmailValid
    ? "login__label"
    : "login__label-invalid";

  const emailInputClassName = isEmailValid
    ? "login__input"
    : "login__input-invalid";

  const passwordLabelClassName = isPasswordValid
    ? "login__label"
    : "login__label-invalid";

  const passwordInputClassName = isPasswordValid
    ? "login__input"
    : "login__input-invalid";

  const nameLabelClassName = isNameValid
    ? "login__label"
    : "login__label-invalid";

  const nameInputClassName = isNameValid
    ? "login__input"
    : "login__input-invalid";

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({ name, avatar, email, password });
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Sign Up"
      buttonText="Next"
      isValid={isFormValid}
    >
      <label className={emailLabelClassName}>Email</label>
      <input
        className={emailInputClassName}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <label className={passwordLabelClassName}>Password</label>
      <input
        className={passwordInputClassName}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        autoComplete="new-password"
      />
      <label className={nameLabelClassName}>Name</label>
      <input
        className={nameInputClassName}
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <label className="register__label">Avatar URL</label>
      <input
        className="register__input"
        type="text"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
        placeholder="Avatar URL"
      />
      <p className="or__log-in" onClick={switchToLogin}>
        or Log in
      </p>
    </ModalWithForm>
  );
}

export default RegisterModal;

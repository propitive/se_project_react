import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import {
  NewItemValidation,
  NewItemNameValidation,
  NewItemLinkValidation,
} from "../../utils/validation";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const [itemName, setItemName] = useState("");
  const [itemLink, setItemLink] = useState("");
  const [weatherType, setWeatherType] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);
  const [isLinkValid, setIsLinkValid] = useState(false);

  useEffect(() => {
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/gim.test(
      itemLink,
      itemName,
      weatherType
    );
    setIsFormValid(NewItemValidation(itemLink, itemName, weatherType));
  }, [itemLink, itemName, weatherType]);

  useEffect(() => {
    setIsNameValid(NewItemNameValidation(itemName));
  }, [itemName]);

  useEffect(() => {
    setIsLinkValid(NewItemLinkValidation(itemLink));
  }, [itemLink]);

  useEffect(() => {
    setIsNameValid(true);
    setIsLinkValid(true);
  }, []);

  const nameLabelClassName = isNameValid
    ? "login__label"
    : "login__label-invalid";

  const nameInputClassName = isNameValid
    ? "login__input modal__input"
    : "login__input-invalid modal__input";

  const linkLabelClassName = isLinkValid
    ? "login__label"
    : "login__label-invalid";

  const linkInputClassName = isLinkValid
    ? "login__input modal__input"
    : "login__input-invalid modal__input";

  function handleNameChange(event) {
    setItemName(event.target.value);
  }

  function handleImageChange(event) {
    setItemLink(event.target.value);
  }

  function handleWeatherTypeChange(event) {
    setWeatherType(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    // Ensure that weatherType is in lowercase before calling onAddItem
    onAddItem(itemName, itemLink, weatherType.toLowerCase());
  }

  return (
    <ModalWithForm
      name="new-card"
      buttonText="Add garment"
      isOpen={isOpen}
      title="New garment"
      onSubmit={handleSubmit}
      onClose={onClose}
      isValid={isFormValid}
      additionalClass="add-item-modal"
    >
      <label className={nameLabelClassName}>Name</label>
      <input
        type="text"
        name="name"
        id="name"
        className={nameInputClassName}
        placeholder="Name"
        required
        minLength="1"
        maxLength="30"
        value={itemName}
        onChange={handleNameChange}
      />
      <label className={linkLabelClassName}>Image URL</label>
      <input
        type="url"
        name="link"
        id="link"
        className={linkInputClassName}
        placeholder="Image URL"
        required
        value={itemLink}
        onChange={handleImageChange}
      />
      <p>Select the weather type:</p>
      <div className={"modal__input modal__input_type_radio hot"}>
        <input
          type="radio"
          id="choiceHot"
          name="weatherType"
          value="Hot"
          checked={weatherType.toLowerCase() === "hot"}
          onChange={handleWeatherTypeChange}
        />
        <label className="modal__label-hot" htmlFor="choiceHot">
          Hot
        </label>
      </div>

      <div className={"modal__input modal__input_type_radio warm"}>
        <input
          type="radio"
          id="choiceWarm"
          name="weatherType"
          value="warm"
          checked={weatherType.toLowerCase() === "warm"}
          onChange={handleWeatherTypeChange}
        />
        <label className="modal__label-warm" htmlFor="choiceWarm">
          Warm
        </label>
      </div>
      <div className={"modal__input modal__input_type_radio cold"}>
        <input
          type="radio"
          id="choiceCold"
          name="weatherType"
          value="cold"
          checked={weatherType.toLowerCase() === "cold"}
          onChange={handleWeatherTypeChange}
        />
        <label className="modal__label-cold" htmlFor="choiceCold">
          Cold
        </label>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;

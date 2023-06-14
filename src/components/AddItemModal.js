import { useEffect, useState } from "react";
import ModalWithForm from "./ModalWithForm";

export function AddItemModal({ isOpen, onCloseModal, onAddItem }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };
  const handleWeatherChange = (event) => {
    setWeather(event.target.value);
  };

  useEffect(() => {
    isOpen === "false" && setName("") && setImageUrl("") && setWeather("");
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    onAddItem({ name, imageUrl, weather });
  };

  return (
    <ModalWithForm
      title={"New garment"}
      onClose={onCloseModal}
      buttonText="Add garment"
      onSubmit={handleSubmit}
    >
      <label>
        <h2 className="new-garment-modal__title-name">Name</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          minLength="1"
          maxLength="30"
          className="new-garment-modal__input form__input"
          value={name}
          onChange={handleNameChange}
          required
        />
      </label>
      <label>
        <h2 className="new-garment-modal__title-image">Image</h2>
        <input
          type="url"
          name="link"
          placeholder="Image URL"
          minLength="1"
          className="new-garment-modal__input form__input"
          value={imageUrl}
          onChange={handleImageUrlChange}
          required
        />
        <p className="new-garment-modal__text">Select the weather type:</p>
        <div className="new-garment-modal__button">
          <input
            type="radio"
            name="button"
            id="hot"
            value="hot"
            className="new-garment-modal__radio"
            onChange={handleWeatherChange}
          />
          <label>Hot</label>
        </div>
        <div className="new-garment-modal__button">
          <input
            type="radio"
            name="button"
            id="warm"
            value="warm"
            className="new-garment-modal__radio"
            onChange={handleWeatherChange}
          />
          <label>Warm</label>
        </div>
        <div className="new-garment-modal__button">
          <input
            type="radio"
            name="button"
            id="cold"
            value="cold"
            className="new-garment-modal__radio"
            onChange={handleWeatherChange}
          />
          <label>Cold</label>
        </div>
      </label>
    </ModalWithForm>
  );
}

export default AddItemModal;

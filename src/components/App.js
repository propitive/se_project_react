import { useEffect, useState } from "react";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ModalWithForm from "./ModalWithForm";
import ItemModal from "./ItemModal";
import {
  getForecastWeather,
  parseWeatherData,
  parseWeatherLocation,
} from "../utils/weatherApi";
import { processServerResponse } from "../utils/weatherApi";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("Unknown");

  function handleModal(modal) {
    setActiveModal(modal);
    document.addEventListener("keyup", handleEscUp);
    document.addEventListener("click", handleOverlayClick);
  }

  const handleCreateModal = () => {
    handleModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
    document.removeEventListener("keyup", handleEscUp);
    document.removeEventListener("click", handleOverlayClick);
  };

  const handleSelectedCard = (card) => {
    setSelectedCard(card);
    handleModal("preview");
  };

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data);
        setTemp(temperature);
        const location = parseWeatherLocation(data);
        setCity(location);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleEscUp = (evt) => {
    if (evt.key === "Escape") {
      handleCloseModal();
    }
  };

  const handleOverlayClick = (e) => {
    if (
      e.target.classList.contains("modal") ||
      e.target.classList.contains("close-icon")
    ) {
      handleCloseModal();
    }
  };

  return (
    <div className="page">
      <div className="page__wrapper">
        <Header onCreateModal={handleCreateModal} location={city} />
        <Main weatherTemp={temp} onSelectCard={handleSelectedCard} />
        <Footer />
        {activeModal === "create" && (
          <ModalWithForm
            title={"New garment"}
            onClose={handleCloseModal}
            buttonText="Add garment"
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
                maxLength="30"
                className="new-garment-modal__input form__input"
                required
              />
              <p className="new-garment-modal__text">
                Select the weather type:
              </p>
              <div className="new-garment-modal__button">
                <input
                  type="radio"
                  name="button"
                  id="hot"
                  value="hot"
                  className="new-garment-modal__radio"
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
                />
                <label>Cold</label>
              </div>
            </label>
          </ModalWithForm>
        )}
        {activeModal === "preview" && (
          <ItemModal card={selectedCard} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
}

export default App;

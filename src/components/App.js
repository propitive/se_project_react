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
import {
  CurrentTemperatureUnitContext,
  currentTemperatureUnit,
  handleToggleSwitchChange,
} from "../contexts/CurrentTemperatureUnitContext";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState({
    temperature: {
      F: 0,
      C: 0,
    },
  });
  const [city, setCity] = useState("Unknown");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

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
        setTemp({
          temperature: {
            F: `${Math.round(temperature)}°F`,
            C: `${Math.round(((temperature - 32) * 5) / 9)}°C`,
          },
        });
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

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  return (
    <div className="page">
      <div className="page__wrapper">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header onCreateModal={handleCreateModal} location={city} />
          <Main
            weatherTemp={
              currentTemperatureUnit === "F"
                ? temp.temperature.F
                : temp.temperature.C
            }
            onSelectCard={handleSelectedCard}
          />
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
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </div>
  );
}

export default App;

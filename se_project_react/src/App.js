import { useEffect, useState } from "react";
import "./blocks/header/header.css";
import "./blocks/page/page.css";
import "./blocks/cardSection/cardSection.css";
import "./blocks/weatherCard/weatherCard.css";
import "./blocks/footer/footer.css";
import "./blocks/modalWithForm/modalWithForm.css";
import "./blocks/itemModal/itemModal.css";
import "./blocks/newGarmentModal/newGarmentModal.css";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import ModalWithForm from "./components/ModalWithForm";
import ItemModal from "./components/ItemModal";
import {
  getForecastWeather,
  parseWeatherData,
  parseWeatherLocation,
} from "./util/WeatherApi";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("Unknown");

  const handleCreateModal = () => {
    setActiveModal("create");
  };
  const handleCloseModal = () => {
    setActiveModal("");
    document.removeEventListener("keyup", handleEscUp);
  };
  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
    document.addEventListener("keyup", handleEscUp);
  };

  useEffect(() => {
    getForecastWeather().then((data) => {
      const temperature = parseWeatherData(data);
      setTemp(temperature);
      const location = parseWeatherLocation(data);
      setCity(location);
    });
  }, []);

  const handleEscUp = (evt) => {
    evt.preventDefault();

    if (evt.key === "Escape") {
      setActiveModal("");
    }
  };

  return (
    <>
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
            <ItemModal
              selectedCard={selectedCard}
              onClose={handleCloseModal}
              // closeModal={setActiveModal("")}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;

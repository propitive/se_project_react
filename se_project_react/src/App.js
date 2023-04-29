import { useEffect, useState } from "react";
import "./blocks/header/header.css";
import "./blocks/page/page.css";
import "./blocks/cardSection/cardSection.css";
import "./blocks/weatherCard/weatherCard.css";
import "./blocks/footer/footer.css";
import "./blocks/modalWithForm/modalWithForm.css";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import ModalWithForm from "./components/ModalWithForm";
import ItemModal from "./components/ItemModal";
import { getForecastWeather, parseWeatherData } from "./util/WeatherApi";

function App() {
  const weatherTemp = "75°F";
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);

  const handleCreateModal = () => {
    setActiveModal("create");
  };
  const handleCloseModal = () => {
    setActiveModal("");
  };
  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  getForecastWeather();

  useEffect(() => {
    getForecastWeather().then((data) => {
      console.log(data);
    });
  }, []);

  return (
    <>
      <div className="page">
        <div className="page__wrapper">
          <Header onCreateModal={handleCreateModal} />
          <Main weatherTemp={temp} onSelectCard={handleSelectedCard} />
          <Footer />
          {activeModal === "create" && (
            <ModalWithForm title={"New garment"} onClose={handleCloseModal}>
              <label>
                Name
                <input type="text" name="name" minLength="1" maxLength="30" />
              </label>
              <label>
                Image
                <input type="url" name="link" minLength="1" maxLength="30" />
                <p>Select the weather type:</p>
                <div>
                  <input type="radio" id="hot" value="hot" />
                  <label>Hot</label>
                </div>
                <div>
                  <input type="radio" id="warm" value="warm" />
                  <label>Warm</label>
                </div>
                <div>
                  <input type="radio" id="cold" value="cold" />
                  <label>Cold</label>
                </div>
              </label>
            </ModalWithForm>
          )}
          {activeModal === "preview" && (
            <ItemModal selectedCard={selectedCard} onClose={handleCloseModal} />
          )}
        </div>
      </div>
    </>
  );
}

export default App;

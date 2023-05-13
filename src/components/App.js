import { useEffect, useState } from "react";
import {
  Route,
  Switch,
  BrowserRouter,
  HashRouter,
} from "react-router-dom/cjs/react-router-dom.min";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ItemModal from "./ItemModal";
import Profile from "./Profile";
import {
  getForecastWeather,
  parseWeatherData,
  parseWeatherLocation,
} from "../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";
import { api } from "../utils/api";
import AddItemModal from "./AddItemModal";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [temp, setTemp] = useState({
    temperature: {
      F: 0,
      C: 0,
    },
  });
  const [city, setCity] = useState("Unknown");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  // The App component makes an API request for the weather data (only once - on mounting).
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

  // The App component saves default clothing items in the state.
  useEffect(() => {
    api
      .getItemList()
      .then((items) => {
        setClothingItems(items);
        console.log("we got the cards!");
      })
      .catch((err) => console.log(err));
  }, []);

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
    console.log("close!");
  };

  const handleSelectedCard = (card) => {
    setSelectedCard(card);
    handleModal("preview");
  };

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

  const handleItemSubmit = (item) => {
    console.log(item);
    api
      .addItem(item)
      .then((newItem) => {
        console.log("handleItemSubmit");
        setClothingItems([newItem, ...clothingItems]);
        handleCloseModal();
      })
      .catch((err) => console.log(err));
  };

  const handleCardDelete = (card) => {
    api
      .removeItem(card.id)
      .then(() => {
        setClothingItems((cards) => cards.filter((c) => c.id !== card.id));
        handleCloseModal();
      })
      .catch((err) => console.log(err));
  };

  return (
    <HashRouter>
      <div className="page">
        <div className="page__wrapper">
          <CurrentTemperatureUnitContext.Provider
            value={{ currentTemperatureUnit, handleToggleSwitchChange }}
          >
            <Header onCreateModal={handleCreateModal} location={city} />
            <Switch>
              <Route path="/profile">
                <Profile
                  onSelectCard={handleSelectedCard}
                  clothingItems={clothingItems}
                />
              </Route>
              <Route exact path="/">
                <Main
                  weatherTemp={
                    currentTemperatureUnit === "F"
                      ? temp.temperature.F
                      : temp.temperature.C
                  }
                  onSelectCard={handleSelectedCard}
                  clothingItems={clothingItems}
                />
              </Route>
            </Switch>
            <Footer />
            {activeModal === "create" && (
              <AddItemModal
                isOpen={activeModal === "create" ? true : false}
                onCloseModal={handleCloseModal}
                onAddItem={handleItemSubmit}
              />
            )}
            {activeModal === "preview" && (
              <ItemModal
                card={selectedCard}
                onClose={handleCloseModal}
                onDelete={handleCardDelete}
              />
            )}
          </CurrentTemperatureUnitContext.Provider>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;

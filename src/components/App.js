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
import RegisterModal from "./RegisterModal";
import {
  getForecastWeather,
  parseWeatherData,
  parseWeatherLocation,
} from "../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";
import CurrentModalOpenedContext from "../contexts/CurrentModalOpened";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { api } from "../utils/api";
import AddItemModal from "./AddItemModal";
import LoginModal from "./LoginModal";
import { signup, signin, checkToken } from "../utils/auth";

const express = require("express");
const mongoose = require("mongoose");

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db", (r) => {
  console.log("connected to DB", r);
});

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

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [alternateAvatar, setAlternateAvatar] = useState("");

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

  const handleSignInModal = () => {
    handleModal("login");
  };

  const handleSignUpModal = () => {
    handleModal("register");
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
    api
      .addItem(item)
      .then((newItem) => {
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

  const handleSignupSubmit = (values) => {
    const { email, password } = values;

    signup(values)
      .then((res) => {
        handleLoginSubmit({ email, password });
        handleCloseModal();
      })
      .catch((err) => {});
  };

  const handleLoginSubmit = ({ email, password }) => {
    const user = { email, password };

    signin(user).then((res) => {
      localStorage.setItem("token", res.token);

      checkToken(res.token).then((res) => {
        setCurrentUser(res);
        setAlternateAvatar(getUserFirstLetter(res.name));
        setIsLoggedIn(true);
      });
      handleCloseModal();
    });
  };

  const getUserFirstLetter = (name) => {
    const firstletter = name.slice(0, 1);
    return firstletter;
  };

  function getLocalToken() {
    return localStorage.getItem("token");
  }

  function checkAccess() {
    const jwt = getLocalToken();

    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          setCurrentUser(res);
          setAlternateAvatar(getUserFirstLetter(res.name));
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.log("No token found", err.message);
        });
    }
  }

  return (
    <HashRouter>
      <div className="page">
        <div className="page__wrapper">
          <CurrentTemperatureUnitContext.Provider
            value={{ currentTemperatureUnit, handleToggleSwitchChange }}
          >
            <CurrentModalOpenedContext.Provider value={activeModal}>
              <CurrentUserContext.Provider
                value={{ isLoggedIn, currentUser, alternateAvatar }}
              >
                <Header
                  onCreateModal={handleCreateModal}
                  location={city}
                  onLogIn={handleSignInModal}
                  onSignUp={handleSignUpModal}
                />
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
                {activeModal === "register" && (
                  <RegisterModal onCloseModal={handleCloseModal} />
                )}
                {activeModal === "login" && (
                  <LoginModal onCloseModal={handleCloseModal} />
                )}
              </CurrentUserContext.Provider>
            </CurrentModalOpenedContext.Provider>
          </CurrentTemperatureUnitContext.Provider>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
  console.log("This is working");
});

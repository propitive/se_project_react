import React, { useState, useEffect, useCallback } from "react";
import { Route, Switch } from "react-router-dom";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { location } from "../../utils/constants";
import {
  getForecastWeather,
  filterDataFromWeatherApi,
} from "../../utils/weatherApi";
import "./App.css";
import { CurrentTemperatureUnitContext } from "../../context/CurrentTemperatureUnit";
import CurrentUserContext from "../../context/CurrentUserContext";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import Api from "../../utils/Api";
import CardDeleteModal from "../CardDeleteModal/CardDeleteModal";
import { checkToken, signIn, signUp } from "../../utils/auth";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import LogoutModal from "../LogoutModal/LogoutModal";

const APIKey = "44d763e20353ebef92d497833d045a80";

const App = () => {
  const [weatherData, setWeatherData] = useState({});
  const [activeModal, setActiveModal] = useState("logout");
  const [selectCard, setSelectCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [cards, setCards] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentUser, setUser] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [authError, setAuthError] = useState("");
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  // effects

  useEffect(() => {
    if (token) {
      Api.getCards(token)
        .then(({ data }) => {
          setCards(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token]);

  useEffect(() => {
    setIsLoading(true);
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      isReloading(storedToken);
    }
    setIsLoading(false);
  }, []);

  // modal functions

  const closeAllModals = () => {
    setActiveModal("");
    handleEditProfileClose();
  };

  const handleAddClick = () => {
    setActiveModal("create");
  };

  const handleEditProfileOpen = () => {
    setIsEditProfileModalOpen(true);
  };

  const handleEditProfileClose = () => {
    setIsEditProfileModalOpen(false);
  };

  const handleLogoutModalClose = () => {
    setActiveModal("");
  };

  const handleLogoutModalLogout = () => {
    setActiveModal("");
    handleSignOut();
  };

  const handleLogoutModalOpen = () => {
    setActiveModal("logout");
    console.log("opening logout modal" + ` logout modal is ${activeModal}`);
  };

  const onCardClick = (card) => {
    setActiveModal("preview");
    setSelectCard(card);
  };

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
    setActiveModal("");
  };

  // api functions

  const fetchWeatherData = () => {
    if (location.latitude && location.longitude) {
      getForecastWeather(location, APIKey)
        .then((data) => {
          setWeatherData(filterDataFromWeatherApi(data));
        })
        .catch((err) => console.log(err));
    }
  };

  const handleAddCardSubmit = (name, link, weather) => {
    Api.addCard({ name, imageUrl: link, weather })

      .then((newCard) => {
        setCards([newCard.data, ...cards]);
        closeAllModals();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCardDeleteSubmit = () => {
    setIsDeleting(true);
    Api.deleteCard(selectCard._id, token)
      .then(() => {
        setCards(
          cards.filter((item) => {
            return item._id !== selectCard._id;
          })
        );
        setActiveModal("");
        setDeleteModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  const handleEditProfile = (name, avatar) => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    Api.updateUserInfo(name, avatar, token)
      .then((res) => {
        closeAllModals();
        setUser(res);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLike = (card, isLiked) => {
    const { _id: id } = card;
    const token = localStorage.getItem("token");

    isLiked
      ? Api.removeCardLike(id, token)
          .then((updatedCard) => {
            setCards((cards) =>
              cards.map((c) => (c._id === id ? updatedCard.data : c))
            );
          })
          .catch((err) => console.log(err))
      : Api.addCardLike(id, token)
          .then((updatedCard) => {
            setCards((cards) =>
              cards.map((c) => (c._id === id ? updatedCard.data : c))
            );
          })
          .catch((err) => console.log(err));
  };

  const handleLogin = ({ email, password }) => {
    signIn(email, password)
      .then((res) => {
        if (res && res.token) {
          localStorage.setItem("token", res.token);
          isReloading(res.token);
        } else {
          setAuthError(res.message || "Invalid credentials");
        }
      })
      .catch(() => {
        setAuthError("Incorrect password");
      });
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    signUp(name, avatar, email, password)
      .then((res) => {
        handleLogin({ email, password });
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSetUserNull = useCallback(() => {
    setUser(null);
  }, [setUser]);
  useEffect(() => {
    fetchWeatherData();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const isReloading = (token) => {
    checkToken(token)
      .then((decoded) => {
        setUser(decoded.data);
        setIsLoginModalOpen(false);
        setIsRegisterModalOpen(false);
        setAuthError("");
        setToken(token);
      })
      .catch((error) => {
        console.error("Error checking token:", error);
        setAuthError("Error checking token");
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{
          currentTemperatureUnit,
          setCurrentTemperatureUnit,
        }}
      >
        <div className="page">
          <div className="page__wrapper">
            <Header
              handleAddClick={() => setActiveModal("create")}
              handleEditProfileOpen={handleEditProfileOpen}
              handleLogoutModalOpen={handleLogoutModalOpen}
              openLoginModal={() => setIsLoginModalOpen(true)}
              openRegisterModal={() => setIsRegisterModalOpen(true)}
              weatherData={weatherData}
            />
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <>
                <Switch>
                  <ProtectedRoute
                    path="/profile"
                    isAuthenticated={!!currentUser}
                    component={Profile}
                    cards={cards}
                    handleAddClick={handleAddClick}
                    handleEditProfileOpen={handleEditProfileOpen}
                    handleSetUserNull={handleSetUserNull}
                    handleSignOut={handleSignOut}
                    handleLogoutModalOpen={handleLogoutModalOpen}
                    onCardClick={onCardClick}
                    onCardLike={handleLike}
                  />
                  <Route path="/">
                    <Main
                      cards={cards}
                      onCardClick={onCardClick}
                      onCardLike={handleLike}
                      weatherData={weatherData}
                    />
                  </Route>
                </Switch>
                <Footer />
                {activeModal === "create" && (
                  <AddItemModal
                    isOpen={activeModal === "create"}
                    onClose={closeAllModals}
                    onAddItem={handleAddCardSubmit}
                  />
                )}
                {activeModal === "preview" && (
                  <ItemModal
                    card={selectCard}
                    onClose={closeAllModals}
                    onOpenDeleteModal={openDeleteModal}
                  />
                )}
                {deleteModalOpen && (
                  <CardDeleteModal
                    onClose={() => setDeleteModalOpen(false)}
                    handleDelete={handleCardDeleteSubmit}
                    isLoading={isDeleting}
                  />
                )}
                {isLoginModalOpen && (
                  <LoginModal
                    isOpen={isLoginModalOpen}
                    onClose={() => setIsLoginModalOpen(false)}
                    onLogin={handleLogin}
                    // authError={authError}
                    switchToRegister={() => {
                      setIsRegisterModalOpen(true);
                      setIsLoginModalOpen(false);
                    }}
                  />
                )}
                {isRegisterModalOpen && (
                  <RegisterModal
                    isOpen={isRegisterModalOpen}
                    onClose={() => setIsRegisterModalOpen(false)}
                    onRegister={handleRegister}
                    // authError={authError}
                    switchToLogin={() => {
                      setIsLoginModalOpen(true);
                      setIsRegisterModalOpen(false);
                    }}
                  />
                )}
                {activeModal === "logout" && (
                  <LogoutModal
                    handleLogoutModalClose={handleLogoutModalClose}
                    handleSignOut={handleLogoutModalLogout}
                    isOpen={true}
                  />
                )}
              </>
            )}
            {isEditProfileModalOpen && (
              <EditProfileModal
                isOpen={isEditProfileModalOpen}
                onClose={handleEditProfileClose}
                onUpdateUser={handleEditProfile}
              />
            )}
          </div>
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
};
export default App;

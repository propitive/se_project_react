import { useEffect } from "react";
import React from "react";
import "./ItemModal.css";
import CurrentUserContext from "../../context/CurrentUserContext";

function ItemModal({ card, onClose, onOpenDeleteModal }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isCardOwner = card.owner === currentUser._id ? true : false;

  const handleCloseOnOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        onClose();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <div className="item-modal__preview" onClick={handleCloseOnOverlayClick}>
      <div className="item-modal__container">
        <button
          type="button"
          className="item-modal__close-button"
          onClick={onClose}
        ></button>
        <img
          className="item-modal__preview-image"
          alt={card.name}
          src={card.imageUrl}
        />
        <div className="item-modal__content">
          <h2 className="item-modal__title">{card.name}</h2>

          <div className="item-modal__description">
            <p className="item-modal__weather">Weather: {card.weather}</p>
            {isCardOwner && (
              <>
                <button
                  className="item-modal__delete-buton"
                  onClick={onOpenDeleteModal}
                  type="button"
                >
                  <span className="item-modal__delete-text">Delete</span>
                  <span className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                    </svg>
                  </span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;

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
          <div className="item-modal__description">
            <h2 className="item-modal__title">{card.name}</h2>

            <p className="item-modal__weather">Weather: {card.weather}</p>
          </div>
          {isCardOwner && (
            <button
              className="item-modal__delete"
              onClick={onOpenDeleteModal}
              type="button"
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;

import React from "react";
import closeButton from "../images/close-button.svg";
import CurrentUserContext from "../contexts/CurrentUserContext";

function ItemModal({ card, onClose, onDelete }) {
  const { currentUser } = React.useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;

  const itemDeleteButtonClassName = `item-modal__delete ${
    isOwn ? "item-modal__visible" : "item-modal__hidden"
  }`;

  return (
    <div className={`modal`}>
      <div className="item-modal__content">
        <img
          className="item-modal__close-icon close-icon"
          alt="close-icon"
          src={closeButton}
          onClick={onClose}
        />
        <img
          src={card.imageUrl}
          className="item-modal__image"
          alt={`Photo of ${card.name}`}
        />
        <div className="item-modal__type">{card.name}</div>
        <div className="item-modal__weather">Weather type: {card.weather}</div>
        {isOwn && (
          <button
            type="button"
            className={itemDeleteButtonClassName}
            //Causing card to be deleted when the card is initially clicked on
            onClick={() => onDelete(card)}
          >
            Delete item
          </button>
        )}
      </div>
    </div>
  );
}

export default ItemModal;

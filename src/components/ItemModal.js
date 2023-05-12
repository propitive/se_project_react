import closeButton from "../images/close-button.svg";

function ItemModal({ card, onClose, onDelete }) {
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
        <button
          type="button"
          className="item-modal__delete"
          onClick={onDelete(card)} //Causing card to be deleted when the card is initially clicked on
        >
          Delete item
        </button>
      </div>
    </div>
  );
}

export default ItemModal;

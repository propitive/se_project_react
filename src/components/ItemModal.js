import closeButton from "../images/close-button.svg";

function ItemModal({ card, onClose }) {
  return (
    <div className={`modal`}>
      <div className="modal__content item-modal__content">
        <img
          className="item-modal__close-icon close-icon"
          alt="close-icon"
          src={closeButton}
          onClick={onClose}
        />
        <img
          src={card.link}
          className="item-modal__image"
          alt={`Photo of ${card.name}`}
        />
        <div className="item-modal__type">{card.name}</div>
        <div className="item-modal__weather">Weather type: {card.weather}</div>
      </div>
    </div>
  );
}

export default ItemModal;

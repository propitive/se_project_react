import closeButton from "../images/close-button.svg";

function Card({ selectedCard, onClose }) {
  return (
    <div className={`modal`}>
      <div className="modal__content item-modal__content">
        <img
          class="item-modal__close-icon close-icon"
          alt="close-icon"
          src={closeButton}
          onClick={onClose}
        />
        <img
          src={selectedCard.link}
          className="item-modal__image"
          alt={`Photo of ${selectedCard.name}`}
        />
        <div className="item-modal__type">{selectedCard.name}</div>
        <div className="item-modal__weather">
          Weather type: {selectedCard.weather}
        </div>
      </div>
    </div>
  );
}

export default Card;

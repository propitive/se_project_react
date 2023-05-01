import closeButton from "../images/close-button.svg";

function ItemModal({ selectedCard, onClose }) {
  // selectedCard.addEventListener("mousedown", (evt) => {
  //   if (
  //     evt.target.classList.contains("modal") ||
  //     evt.target.classList.contains("close-icon")
  //   ) {
  //     {
  //       closeModal;
  //     }
  //   }
  // });

  return (
    <div className={`modal`}>
      <div className="modal__content item-modal__content">
        <img
          class="item-modal__close-icon close-icon"
          src={closeButton}
          onClick={onClose}
        />
        {/* <button type="button" onClick={onClose}>
          Close
        </button> */}
        <img src={selectedCard.link} className="item-modal__image" />
        <div className="item-modal__type">{selectedCard.name}</div>
        <div className="item-modal__weather">
          Weather type: {selectedCard.weather}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;

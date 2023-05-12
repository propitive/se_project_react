function ItemCard({ card, onSelectCard }) {
  return (
    <div>
      <div className="card-section__container">
        <img
          src={card.imageUrl}
          alt="item card"
          className="card-section__image"
          onClick={() => onSelectCard(card)}
        />
        <div className="card-section__name">
          <span className="card-section__span">{card.name}</span>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;

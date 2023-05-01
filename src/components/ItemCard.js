function ItemCard({ x, onSelectCard }) {
  return (
    <div>
      <div className="card-section__container">
        <img
          src={x.link}
          alt="item card"
          className="card-section__image"
          onClick={() => onSelectCard(x)}
        />
        <div className="card-section__name">
          <span>{x.name}</span>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;

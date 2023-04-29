function ItemCard({ x, onSelectCard }) {
  return (
    <div>
      <div>
        <img
          src={x.link}
          className="card-section__image"
          onClick={() => onSelectCard(x)}
        />
      </div>
      <div className="card-section__name">{x.name}</div>
    </div>
  );
}

export default ItemCard;

import React from "react";
import "./ItemCardClothesSection.css";
import HeartLiked from "../../images/like_active.png";
import HeartNotLiked from "../../images/likeButton.svg";
import CurrentUserContext from "../../context/CurrentUserContext";

const ItemCardClothesSection = ({ card, onCardClick, onCardLike }) => {
  const currentUser = React.useContext(CurrentUserContext);

  const isLiked = card.likes.some((card) => card === currentUser._id);
  const cardClassName = `card-cs ${
    currentUser === null ? "card__invisible" : "card__visible"
  }`;

  const renderNotLiked = () => {
    return (
      <button
        onClick={() => onCardLike(card, isLiked)}
        className="card__like-button"
      >
        <img
          className="card__like-button-image"
          src={HeartLiked}
          alt="This item has been liked"
        />
      </button>
    );
  };

  const renderLiked = () => {
    return (
      <button
        onClick={() => onCardLike(card, isLiked)}
        className="card__like-button"
      >
        <img
          className="card__like-button-image"
          src={HeartNotLiked}
          alt="This item has not been liked"
        />
      </button>
    );
  };

  return (
    <div className={cardClassName}>
      <div className="card-cs__header">
        <div className="card-cs__name">{card.name}</div>
        {isLiked ? renderNotLiked() : renderLiked()}
      </div>

      <img
        className="card-cs__image"
        src={card.imageUrl || card.link}
        alt={card.name}
        onClick={() => {
          onCardClick(card);
        }}
      />
    </div>
  );
};

export default ItemCardClothesSection;

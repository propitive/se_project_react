import React from "react";
import "./ItemCard.css";
import HeartLiked from "../../images/like_active.png";
import HeartNotLiked from "../../images/likeButton.svg";

const ItemCard = ({ card, onCardClick, onCardLike, currentUser }) => {
  const isLiked = card.likes.some((card) => card === currentUser._id);
  const cardClassName = `card ${
    currentUser === null ? "card__invisible" : "card__visible"
  }`;

  const renderNotLiked = () => {
    return (
      <button
        onClick={() => onCardLike(card, isLiked)}
        className="card__like-button"
      >
        <img src={HeartLiked} alt="This item has been liked" />
      </button>
    );
  };

  const renderLiked = () => {
    return (
      <button
        onClick={() => onCardLike(card, isLiked)}
        className="card__like-button"
      >
        <img src={HeartNotLiked} alt="This item has not been liked" />
      </button>
    );
  };

  return (
    <div className={cardClassName}>
      <div className="card__header">
        <div className="card__name">{card.name}</div>
        {isLiked ? renderNotLiked() : renderLiked()}
      </div>

      <img
        className="card__image"
        src={card.imageUrl || card.link}
        alt={card.name}
        onClick={() => {
          onCardClick(card);
        }}
      />
    </div>
  );
};

export default ItemCard;

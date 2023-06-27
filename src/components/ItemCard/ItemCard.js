import React from "react";
import "./ItemCard.css";
import HeartLiked from "../../images/like_active.png";
import HeartNotLiked from "../../images/likeButton.svg";

const ItemCard = ({ card, onCardClick, onCardLike, currentUser }) => {
  const isLiked = card.likes.some((card) => card === currentUser._id);
  const likeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_filled" : ""
  }`;

  const renderNotLiked = () => {
    return (
      <button
        onClick={() => onCardLike(card, isLiked)}
        className={likeButtonClassName}
      >
        <img src={HeartLiked} alt="This item has been liked" />
      </button>
    );
  };

  const renderLiked = () => {
    return (
      <button
        onClick={() => onCardLike(card, isLiked)}
        className={likeButtonClassName}
      >
        <img src={HeartNotLiked} alt="This item has not been liked" />
      </button>
    );
  };

  // const handleLikeClick = () => {
  //   console.log(card);
  //   onCardLike(card);
  // };

  return (
    // <div className="card">
    //   <div className="card__header">
    //     <div className="card__name">{card.name}</div>
    //     <button
    //       className={`card__like-button ${
    //         card.isLiked ? "card__like-button_filled" : ""
    //       }`}
    //       onClick={handleLikeClick(card, isLiked)}
    //       style={{ background: "none" }}
    //     >
    //       {card.isLiked ? (
    //         <img src={HeartLiked} alt="Heart Liked" />
    //       ) : (
    //         <img src={HeartNotLiked} alt="Heart Not Liked" />
    //       )}
    //     </button>
    //   </div>

    //   <img
    //     className="card__image"
    //     src={card.imageUrl || card.link}
    //     alt={card.name}
    //     onClick={() => {
    //       onCardClick(card);
    //     }}
    //   />
    // </div>

    <div className="card">
      <div className="card__header">
        <div className="card__name">{card.name}</div>
        {isLiked ? renderLiked() : renderNotLiked()}
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

// Like function is not working

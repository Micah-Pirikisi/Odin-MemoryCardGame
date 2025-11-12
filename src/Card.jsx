import React from "react";

function Card({ card, isFlipped, onClick }) {
  return (
    <div className={`card ${isFlipped ? "flipped" : ""}`} onClick={onClick}>
      {isFlipped ? (
        <img src={card.image} alt={card.name} />
      ) : (
        <div className="card-back">?</div>
      )}
    </div>
  );
}

export default Card;

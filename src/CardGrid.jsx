import React from "react";
import Card from "./Card.jsx";

function CardGrid({ cards, flippedCards, matchedCards, onCardClick }) {
  return (
    <div className="grid">
      {cards.map((card, index) => (
        <Card
          key={index}
          card={card}
          isFlipped={
            flippedCards.includes(card.id) || matchedCards.includes(card.id)
          }
          onClick={() => onCardClick(card.id)}
        />
      ))}
    </div>
  );
}

export default CardGrid;

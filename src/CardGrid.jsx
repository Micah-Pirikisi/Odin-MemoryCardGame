import React from "react";
import Card from "./Card.jsx";

export default function CardGrid({
  cards,
  flippedCards,
  matchedCards,
  onCardClick,
}) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", maxWidth: "350px" }}>
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          isFlipped={
            flippedCards.includes(card.id) || matchedCards.includes(card.id)
          }
          onClick={onCardClick}
        />
      ))}
    </div>
  );
}

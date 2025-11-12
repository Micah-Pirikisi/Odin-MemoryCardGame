import React from "react";
import Card from "./Card.jsx";

export default function CardGrid({
  cards,
  flippedCards,
  matchedCards,
  onCardClick,
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 110px)",
        justifyContent: "center",
        gap: "10px",
        marginTop: "20px",
      }}
    >
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          isFlipped={flippedCards.includes(card.id)}
          isMatched={matchedCards.includes(card.id)}
          onClick={() => onCardClick(card.id)}
        />
      ))}
    </div>
  );
}

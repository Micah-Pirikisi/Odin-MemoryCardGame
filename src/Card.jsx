import React from "react";

export default function Card({ card, isFlipped, isMatched, onClick }) {
  // Consider a card visible if it's currently flipped or has been matched
  const visible = isFlipped || isMatched;

  return (
    <div
      className={`card ${visible ? "flipped" : ""}`}
      onClick={() => {
        if (!isMatched) onClick(card.id);
      }}
      style={{
        width: "100px",
        height: "100px",
        margin: "5px",
        border: "1px solid #333",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: isMatched ? "default" : "pointer",
        backgroundColor: visible ? "#fff" : "#ccc",
        transition: "0.3s",
        userSelect: "none",
      }}
    >
      {visible ? (
        <img
          src={card.image}
          alt={card.name}
          style={{ width: "80px", height: "80px" }}
        />
      ) : (
        <div style={{ fontSize: "2rem" }}>?</div>
      )}
    </div>
  );
}

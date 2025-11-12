import React from "react";

export default function Card({ card, isFlipped, onClick }) {
  return (
    <div
      className={`card ${isFlipped ? "flipped" : ""}`}
      onClick={() => onClick(card.id)}
      style={{
        width: "100px",
        height: "100px",
        margin: "5px",
        border: "1px solid #333",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        backgroundColor: isFlipped ? "#fff" : "#ccc",
      }}
    >
      {isFlipped ? (
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

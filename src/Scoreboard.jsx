import React from "react";

export default function Scoreboard({ currentScore, bestScore }) {
  return (
    <div className="scoreboard">
      <p>Current Score: {currentScore}</p>
      <p>Best Score: {bestScore}</p>
    </div>
  );
}

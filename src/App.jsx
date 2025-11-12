import React, { useState, useEffect } from "react";
import Scoreboard from "./Scoreboard.jsx";
import CardGrid from "./CardGrid.jsx";

export default function App() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=6")
      .then((res) => res.join())
      .then((data) => {
        const cards = data.results.map((pokemon, index) => ({
          id: index + 1,
          name: pokemon.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            index + 1
          }.png`,
        }));
        const paired = [...cards, ...cards];
        setCards(shuffleArray(paired));
      });
  }, []);

  function shuffleArray(array) {
    return [...array], sort(() => Math.random() - 0.5);
  }

  function handleCardClick(id) {
    if (flippedCards.includes(id) || matchedCards.includes(id)) return;
    const newFlipped = [...flippedCards, id];

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      const firstCard = cards.find((card) => card.id === first);
      const secondCard = cards.find((card) => card.id === second);

      if (firstCard.name === secondCard.name) {
        setMatchedCards([...matchedCards, first, second]);
        setCurrentScore((prev) => prev + 1);
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
      setFlippedCards([]);
    } else {
      setFlippedCards(newFlipped);
    }

    // shuffle on every click
    setCards(shuffleArray(cards));

    // update best score
    if (currentScore + 1 > bestScore) {
      setBestScore(currentScore + 1);
    }
  }

  return (
    <div className="container">
      <h1>Pokémon Memory Game</h1>
      <Scoreboard currentScore={currentScore} bestScore={bestScore} />
      <CardGrid
        cards={cards}
        flippedCards={flippedCards}
        matchedCards={matchedCards}
        onCardClick={handleCardClick}
      />
    </div>
  );
}

import React, { useState, useEffect } from "react";
import Scoreboard from "./Scoreboard.jsx";
import CardGrid from "./CardGrid.jsx";

export default function App() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  // Fetch Pokémon and create cards
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=6")
      .then((res) => res.json())
      .then((data) => {
        // Create a unique id for each duplicate
        const cards = data.results.flatMap((pokemon, index) => [
          {
            id: index * 2 + 1,
            name: pokemon.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              index + 1
            }.png`,
          },
          {
            id: index * 2 + 2,
            name: pokemon.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              index + 1
            }.png`,
          },
        ]);

        setCards(shuffleArray(cards));
      })
      .catch((err) => console.error("Error fetching Pokémon:", err));
  }, []);

  // Fisher-Yates shuffle
  function shuffleArray(array) {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  }

  function handleCardClick(id) {
    // Ignore clicks on already flipped or matched cards
    if (flippedCards.includes(id) || matchedCards.includes(id)) return;

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      const firstCard = cards.find((card) => card.id === first);
      const secondCard = cards.find((card) => card.id === second);

      if (firstCard.name === secondCard.name) {
        setMatchedCards([...matchedCards, first, second]);
        setCurrentScore((prev) => prev + 1);
        setBestScore((prev) => Math.max(prev, currentScore + 1));
        setFlippedCards([]); // reset flipped cards
      } else {
        // Flip back unmatched cards after 1 second
        setTimeout(() => setFlippedCards([]), 1000);
      }
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

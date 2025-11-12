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
    let revealTimeout;

    fetch("https://pokeapi.co/api/v2/pokemon?limit=6")
      .then((res) => res.json())
      .then((data) => {
        // Create a unique id for each duplicate
        const created = data.results.flatMap((pokemon, index) => [
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

        const shuffled = shuffleArray(created);
        setCards(shuffled);

        // Reveal all cards briefly at start so the player can memorize positions
        const allIds = shuffled.map((c) => c.id);
        setFlippedCards(allIds);
        revealTimeout = setTimeout(() => setFlippedCards([]), 3000);
      })
      .catch((err) => console.error("Error fetching Pokémon:", err));

    return () => {
      if (revealTimeout) clearTimeout(revealTimeout);
    };
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

  function reshuffleAndReveal() {
    const shuffled = shuffleArray(cards);
    setCards(shuffled);

    // Show all cards for 5 seconds
    const allIds = shuffled.map((c) => c.id);
    setFlippedCards(allIds);
    setTimeout(() => setFlippedCards([]), 5000);
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
        // Add to matched and increase the current consecutive-match streak.
        setMatchedCards((prev) => [...prev, first, second]);
        setCurrentScore((prev) => {
          const next = prev + 1;
          // Update best score based on the new streak value
          setBestScore((bs) => Math.max(bs, next));
          return next;
        });
        setFlippedCards([]); // reset flipped cards
      } else {
        // Flip back unmatched cards after 1 second, reset the current streak,
        // and reshuffle the board so the order changes after the streak is broken.
        setTimeout(() => {
          setFlippedCards([]);
          setMatchedCards([]);
          setCurrentScore(0);
          reshuffleAndReveal();
        }, 1000);
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

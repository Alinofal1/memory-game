import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

const cardIlmges = [
  { "src": "./images/helmet-1.png", matched: false },
  { "src": "./images/potion-1.png", matched: false },
  { "src": "./images/ring-1.png", matched: false },
  { "src": "./images/scroll-1.png", matched: false },
  { "src": "./images/shield-1.png", matched: false },
  { "src": "./images/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTow, setChoiceTow] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardIlmges, ...cardIlmges]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random()}));

      setChoiceOne(null);
      setChoiceTow(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  // handle a choice
  const handleChoice = (card)=> {
    choiceOne ? setChoiceTow(card) : setChoiceOne(card);
  }

  // compare 2 selected cadrs
  useEffect(()=> {
    if(choiceOne && choiceTow) {
      setDisabled(true);

      if(choiceOne.src === choiceTow.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src) {
              return { ...card, matched: true}
            }else {
              return card
            }
          })
        })
        resetTurn();
      }else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  },[choiceOne,choiceTow])

  console.log(cards);

  
  // rest choices & increase turn
  const resetTurn = ()=> {
    setChoiceOne(null);
    setChoiceTow(null);
    setTurns(prev => prev + 1);
    setDisabled(false);
  }

  // start a new game automatically
  useEffect(()=> {
    shuffleCards();
  },[])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard key={card.id}
           card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTow || card.matched}
            disabled={disabled}
            />
        ))}
        <p>Turns: {turns}</p>
      </div>
    </div>
  );
}

export default App;

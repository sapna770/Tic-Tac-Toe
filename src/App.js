import React, { useState } from 'react';
import './App.css';

const App = () => {

  const Square = (props) => {
    return (
      <button
        className="square"
        onClick={props.onClickEvent}
      >
        {props.value}
      </button>
    );
  }

  const Board = () => {

    const initialSquares = Array(9).fill(null);
    const [squares, setSquares] = useState(initialSquares);
    const [xIsNext, setXIsNext] = useState(true);

    const handleClickEvent = (i) => {
      const newSquares = [...squares];

      const winnerDeclared = Boolean(calculateWinner(newSquares));
      const squareFilled = Boolean(newSquares[i]);
      if (winnerDeclared || squareFilled) {
        return;
      }

      newSquares[i] = xIsNext ? 'X' : 'O';
      setSquares(newSquares);
      setXIsNext(!xIsNext);
    }

    const renderSquare = (i) => {
      return (
        <Square
          value={squares[i]}
          onClickEvent={() => handleClickEvent(i)}
        />
      );
    }

    const winner = calculateWinner(squares);

    const status = winner ?
      `Winner: ${winner}` :
      `Next player: ${xIsNext ? 'X' : 'O'}`;

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {renderSquare(0)} {renderSquare(1)}{renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)} {renderSquare(4)}{renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)} {renderSquare(7)}{renderSquare(8)}
        </div>
      </div>
    );
  }

  const Game = () => {
    return (
      <div className="game">
        <div style={{ backgroundColor: '#ff6666', padding: '10px' }}>
          Tic Tac Toe
        </div>
        <Board />
      </div>
    );
  }
  return <div>
    <Game />
  </div>;
};

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],//row
    [0, 3, 6], [1, 4, 7], [2, 5, 8],//column
    [0, 4, 8], [2, 4, 6]//diagonals
  ];
  for (let line of lines) {

    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
export default App;

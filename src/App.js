import { useState } from "react";

function Square({ value, onSquareClick }) {
  // remove const [value, setValue] = useState(null) to lift up;
  //give the prop from Board- value

  //   remove the State from Child to for lift up
  //   function handleClick() {
  //   setValueState("X");
  // }

  //You’ll start with the function
  // that the Square component will call when
  // it is clicked. You’ll call that function
  //  onSquareClick
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  // It’s now time to fix a major defect in this tic-tac-toe game:
  // the “O”s cannot be marked on the board.
  // You’ll set the first move to be “X” by default.
  // Let’s keep track of this by adding another piece
  // of state to the Board component:

  const [xIsNextState, setXIsNextState] = useState(true);

  const [squaresState, setSquareState] = useState(Array(9).fill(null));
  //Array(9).fill(null) creates an array
  // with nine elements and sets each of them to null.
  // The useState() call around it declares a squares
  // state variable that’s initially set to that array.
  // Each entry in the array corresponds to the value
  // of a square. When you fill the board in later,
  // the squares array will look like this:

  //['O', null, 'X', 'X', 'X', 'O', 'O', null, null]

  // Your handleClick function is hardcoded
  // to update the index for the upper left square (0).
  // Let’s update handleClick to be able to update any
  // square. Add an argument i to the handleClick
  // function that takes the index of the square to
  // update

  function handleClick(i) {
    // to avoid rewrite the values: When you mark a square with a X or an O you aren’t first checking to see if the square already has a X or O value. You can fix this by returning early. You’ll check to see if the square already has a X or an O. If the square is already filled, you will return in the handleClick function early—before it tries to update the board state.
    if (calculateWinner(squaresState) || squaresState[i]) {
      return;
    }

    const nextSquares = squaresState.slice();
    //Each time a player moves, xIsNext (a boolean)
    // will be flipped to determine which player goes
    // next and the game’s state will be saved. You’ll
    // update the Board’s handleClick
    //  function to flip the value of xIsNext:
    if (xIsNextState) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    // nextSquares[i] = "X";
    setSquareState(nextSquares);
    setXIsNextState(!xIsNextState);
  }

  const winner = calculateWinner(squaresState);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNextState ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        {/* first  only the first square pass the prop onSquareClick={handleClick}*/}
        <Square value={squaresState[0]} onSquareClick={() => handleClick(0)} />
        {/*Here is why this doesn’t work. The handleClick(0) 
        call will be a part of rendering the board 
        component. Because handleClick(0) alters the 
        state of the board component by calling setSquaresState, your entire 
        board component will be re-rendered again.
        But this runs handleClick(0) again, leading to an infinite loop
        Why didn’t this problem happen earlier?When you were passing 
        onSquareClick={handleClick}, you were passing the handleClick
        function down as a prop. You were not calling it! But now you
        are calling that function right away
        You could fix by creating a function like 
        handleFirstSquareClick that calls handleClick(0),
        a function like handleSecondSquareClick that calls
        handleClick(1), and so on. You would pass (rather than call)
        these functions down as props like
        onSquareClick={handleFirstSquareClick}. 
        This would solve the infinite loop. However, defining nine 
        different functions and giving each of them 
        a name is too verbose


        Notice the new () => syntax. Here, () => handleClick(0) 
        is an arrow function, which is a shorter way to define functions.
        When the square is clicked, the code after the => “arrow” will run, 
        calling handleClick(0).
         */}

        <Square value={squaresState[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squaresState[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squaresState[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squaresState[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squaresState[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squaresState[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squaresState[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squaresState[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

//Declaring winner:  To do this you’ll add a helper function called calculateWinner that takes an array of 9 squares, checks for a winner and returns 'X', 'O', or null as appropriate. Don’t worry too much about the calculateWinner function; it’s not specific to React:
//You will call calculateWinner(squares) in the Board component’s handleClick function to check if a player has won. You can perform this check at the same time you check if a user has clicked a square that already has a X or and O. We’d like to return early in both cases
function calculateWinner(squaresState) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      squaresState[a] &&
      squaresState[a] === squaresState[b] &&
      squaresState[a] === squaresState[c]
    ) {
      return squaresState[a];
    }
  }
  return null;
}

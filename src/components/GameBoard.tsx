import { useState } from "react";
import { getBestMove } from "./HardMinimax"; // Import the getBestMove function from the HardMinimax module to get the best move for the AI
import styles from "./gameBoard.module.css";

// Define the type for the props that the GameBoard component will receive
type GameBoardProps = {
    playerSymbol: "X" | "O"; // The symbol used by the player ("X" or "O")
};

// Define the initial state of the board with 9 null values representing an empty board
const initialBoard = Array(9).fill(null);

export default function GameBoard({ playerSymbol }: GameBoardProps) {
    // State to keep track of the current board state
    const [board, setBoard] = useState<(null | "X" | "O")[]>(initialBoard);

    // State to keep track of whose turn it is ("X" or "O")
    const [currentTurn, setCurrentTurn] = useState<"X" | "O">(playerSymbol);

    // Determine the computer's symbol based on the player's symbol
    const computerSymbol = playerSymbol === "X" ? "O" : "X";

    // State to display the game status (e.g., instructions or result)
    const [gameStatus, setGameStatus] = useState<string>("Start playing your game");

    // Function to check if there is a winner on the board
    const checkWin = (board: (null | "X" | "O")[]) => {
        // Define the winning patterns for rows, columns, and diagonals
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
            [0, 4, 8], [2, 4, 6]              // Diagonals
        ];

        // Check each winning pattern
        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            // If all three cells in the pattern are the same and not null, return the symbol
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null; // No winner yet
    };

    // Function to check if the game is a draw (i.e., all cells are filled)
    const isDraw = (board: (null | "X" | "O")[]) => {
        return board.every((cell) => cell !== null);
    };

    // Function to handle a click on a board cell
    const handleClick = (index: number) => {
        // Do nothing if the cell is already filled, it's the computer's turn, or the game is already won
        if (board[index] || currentTurn === computerSymbol || checkWin(board)) return;

        // Create a copy of the board and update the clicked cell with the player's symbol
        const updatedBoard = board.slice();
        updatedBoard[index] = currentTurn;
        setBoard(updatedBoard); // Update the board state

        // Update the game status to indicate the computer's turn
        setGameStatus("Wait... Now it's the Computer's turn");

        // Switch to the computer's turn
        setCurrentTurn(computerSymbol);

        // Use a timeout to simulate the computer's thinking time
        setTimeout(() => {
            // If the game is not yet won or drawn, let the computer make a move
            if (!checkWin(updatedBoard) && !isDraw(updatedBoard)) {
                // Get the best move for the computer
                const computerMove = getBestMove(updatedBoard, computerSymbol);
                updatedBoard[computerMove] = computerSymbol; // Update the board with the computer's move
                setBoard(updatedBoard); // Update the board state
                setGameStatus("It's Your Turn"); // Update the game status
            }
            // Switch back to the player's turn
            setCurrentTurn(playerSymbol);
        }, 1000); // 1-second delay for the computer's move
    };

    // Function to reset the game
    const reset = () => {
        setGameStatus("It's Your Turn"); // Reset the game status
        setBoard(Array(9).fill(null)); // Clear the board
    };

    // Determine if there is a winner or if the game is a draw
    const winner = checkWin(board);
    const draw = isDraw(board);

    return (
        <div className={styles.boardContainer}>
            {/* Display the game status */}
            {currentTurn === computerSymbol ? (<h1 className={styles.turnStatus}>{gameStatus}</h1>): (<h1>{gameStatus}</h1>)}

            <div className={styles.board}>
                {/* Render each cell as a button */}
                {board.map((cell, index) => (
                    <button
                        className={styles.gridButton}
                        key={index}
                        onClick={() => handleClick(index)}
                        disabled={currentTurn === computerSymbol || cell !== null} // Disable button if it's the computer's turn or cell is filled
                    >
                        {cell} {/* Display the cell content ("X", "O", or empty) */}
                    </button>
                ))}
            </div>

            {/* Show reset button and result message if the game is over */}
            {(winner || draw) && (
                <div className={styles.resetButtonContainer}>
                    {winner && <h2 className={styles.winMessage}>{winner === computerSymbol ? "You lose the game 😞" : "You win! 🎉"}</h2>}
                    {draw && !winner && <h2 className={styles.winMessage}>It&apos;s a draw!</h2>}

                    {/* Button to reset the game */}
                    <button type="button" className={styles.resetButton} onClick={reset}>
                        Reset
                    </button>
                </div>
            )}
        </div>
    );
}

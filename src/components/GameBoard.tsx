import { useState} from "react";
import { minimax } from "./Minimax";
import styles from "./gameBoard.module.css";

type GameBoardProps = {
    playerSymbol: "X" | "O";
};

const initialBoard = Array(9).fill(null);

export default function GameBoard({ playerSymbol }: GameBoardProps) {
    const [board, setBoard] = useState<(null | "X" | "O")[]>(initialBoard);
    const [currentTurn, setCurrentTurn] = useState<"X" | "O">(playerSymbol);
    const computerSymbol = playerSymbol === "X" ? "O" : "X";
    const [gameStatus, setGameStatus] = useState<string>('Start playing your game');
    // const [winningCells, setWinningCells] = useState<number[] | null>(null);


    const checkWin = (board: (null | "X" | "O")[]) => {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                // setWinningCells(pattern); // Save the winning pattern
                return board[a];
            }
        }
        return null;
    };

    const isDraw = (board: (null | "X" | "O")[]) => {
        return board.every((cell) => cell !== null);
    };

    const handleClick = (index: number) => {
        // if (board[index] || checkWin(board)) return;

        // Prevent player action if it's the computer's turn or the cell is already occupied
        if (board[index] || currentTurn === computerSymbol || checkWin(board)) return;


        const updatedBoard = board.slice();
        updatedBoard[index] = currentTurn;
        setBoard(updatedBoard);
        setGameStatus("Wait... Now it's the Computer's turn");


        setCurrentTurn(computerSymbol);
        setTimeout(() => {
            if (!checkWin(updatedBoard) && !isDraw(updatedBoard)) {
            const computerMove = minimax(updatedBoard, computerSymbol).index;
            updatedBoard[computerMove] = computerSymbol;
            setBoard(updatedBoard);
            setGameStatus("It's Your Turn");
        }
            // By adding this using will show 1 seconds delay. So, that he can see that computer is also processing it's turn
            setCurrentTurn(playerSymbol);
        }, 1000); // 1000 milliseconds = 1 seconds

    };

    const reset = (changeStatus = true) => {
        console.log(changeStatus)
        setGameStatus("It's Your Turn");
        setBoard(Array(9).fill(null));
    };


    const winner = checkWin(board);
    const draw = isDraw(board);

    return (
        <div className={styles.boardContainer}>
            <h1>{gameStatus}</h1>
            <div className={styles.board} >
                {board.map((cell, index) => (

                    // ${winningCells?.includes(index) ? styles.winningCell : ""}`
                    <button
                            className={styles.gridButton}

                        key={index}

                        onClick={() => handleClick(index)}
                            disabled={currentTurn === computerSymbol || cell !== null} // Disable button if it's computer's turn or cell is occupied

                    >
                        {cell}
                    </button>
                ))}
            </div>


            {(winner || draw) && (
                <div className={styles.resetButtonContainer}>
                    {winner && <h2 className={styles.winMessage}>{winner === computerSymbol ?'You lose the game 😞':'You wins! 🎉' } </h2>}
                    {draw && !winner && <h2 className={styles.winMessage} >It&apos;s a draw!</h2>}

                    <button
                        type="button"
                        className={styles.resetButton}
                        onClick={() => reset(true)}>
                        Reset
                    </button>
                </div>
            )}

        </div>
)
    ;
}

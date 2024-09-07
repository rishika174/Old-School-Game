// Define a type alias `Board` to represent the state of the Tic-Tac-Toe board.
// The board is an array with 9 elements, where each element can be either `null`, "X", or "O".
type Board = (null | "X" | "O")[];

/**
 * The `minimax` function is an implementation of the minimax algorithm,
 * which is used to determine the best move for a player in a game of Tic-Tac-Toe.
 *
 * @param board - The current state of the board.
 * @param player - The player who is about to make a move ("X" or "O").
 * @returns The best move object, containing the index and score.
 */
export const minimax = (board: Board, player: "X" | "O") => {

    // `computer` is the AI player, which will be the same as the current `player`.
    const computer = player;

    // `human` is the opponent player.
    const human = player === "X" ? "O" : "X";

    /**
     * A helper function to find the indices of empty spots on the board.
     *
     * @param board - The current state of the board.
     * @returns An array of indices where the board is empty.
     */
    const emptyIndices = (board: Board) => {
        return board
            // Map the board to an array where empty spots are replaced with their index, and filled spots are replaced with `null`.
            .map((value, index) => (value === null ? index : null))
            // Filter out the `null` values, leaving only the indices of empty spots.
            .filter((val) => val !== null) as number[];
    };

    // Check if the current board state has a winner.
    const winner = checkWin(board);

    // If the `human` player has won, return a score of -10 (bad outcome for the `computer`).
    if (winner === human) return {score: -10};

    // If the `computer` has won, return a score of 10 (good outcome for the `computer`).
    if (winner === computer) return {score: 10};

    // If the board has no more empty spots and no winner, it's a tie, so return a score of 0.
    if (emptyIndices(board).length === 0) return {score: 0};

    // Initialize an array to store all possible moves.
    const moves: { index: number; score: number }[] = [];

    // Loop over all empty spots on the board.
    emptyIndices(board).forEach((index) => {
        // Create a copy of the board to simulate a move.
        const newBoard = [...board];
        // Place the current `player`'s mark on the empty spot.
        newBoard[index] = player;

        // Recursively call `minimax` to simulate the opponent's move.
        const result = minimax(newBoard, player === human ? computer : human);
        // Store the move along with its score.
        moves.push({index, score: result.score});

        // Reset the spot on the board after simulation (not strictly necessary, but keeps the board clean).
        newBoard[index] = null;
    });


    // Initialize a variable to store the best move.
    // This will eventually hold the move (index and score) that is most favorable for the current player.
    // `bestMove` is not yet defined because we need to evaluate all possible moves before determining which is best.
    let bestMove;

    // Check if the `computer` is the current player.
    // The goal for the computer is to maximize its score, meaning it wants to choose the move that gives it the highest score.
    if (player === computer) {
        // Start with the worst possible score for maximization.
        // We're looking to find a score higher than this initial value.
        let bestScore = -Infinity;

        // Loop through all possible moves calculated earlier.
        moves.forEach((move) => {
            // If the score of the current move is better than the best score found so far,
            // then update `bestScore` to this move's score, and `bestMove` to this move.
            if (move.score > bestScore) {
                bestScore = move.score;
                bestMove = move;
            }
        });
    }
    // If the `human` is the current player (i.e., it's the opponent's turn),
    // the goal is to minimize the score, as the computer is trying to anticipate and counter the human's best strategy.
    else {
        // Start with the best possible score for minimization.
        // We're looking to find a score lower than this initial value.
        let bestScore = Infinity;

        // Loop through all possible moves calculated earlier.
        moves.forEach((move) => {
            // If the score of the current move is worse (lower) than the best score found so far,
            // then update `bestScore` to this move's score, and `bestMove` to this move.
            if (move.score < bestScore) {
                bestScore = move.score;
                bestMove = move;
            }
        });
    }

    // After evaluating all possible moves, return the move that has the best score for the current player.
    // The `bestMove` object contains the index of the optimal move on the board and the associated score.
    return bestMove!;

};


/**
 * The `checkWin` function checks if there is a winner on the board.
 *
 * @param board - The current state of the board.
 * @returns The winning player ("X" or "O") or `null` if there is no winner.
 */
const checkWin = (board: Board) => {
    // Define all possible winning combinations (rows, columns, diagonals).
    const winPatterns = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Diagonal from top-left to bottom-right
        [2, 4, 6], // Diagonal from top-right to bottom-left
    ];

    // Loop through each win pattern to check if any player has won.
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        // If the three positions in a pattern are the same and not null, we have a winner.
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }

    // If no winner is found, return `null`.
    return null;
};

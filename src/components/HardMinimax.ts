type Board = (null | "X" | "O")[];

export const hardMinimax = (
    board: Board,
    depth: number,
    isMaximizing: boolean,
    alpha: number,
    beta: number
): number => {
    const human = "O";
    const computer = "X";

    const winner = checkWin(board);
    if (winner === computer) return 10 - depth;
    if (winner === human) return depth - 10;
    if (emptyIndices(board).length === 0) return 0; // Draw

    if (isMaximizing) {
        let maxEval = -Infinity;
        for (const index of emptyIndices(board)) {
            board[index] = computer;
            const evalScore = hardMinimax(board, depth + 1, false, alpha, beta);
            board[index] = null;
            maxEval = Math.max(maxEval, evalScore);
            alpha = Math.max(alpha, evalScore);
            if (beta <= alpha) break; // Alpha-beta pruning
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (const index of emptyIndices(board)) {
            board[index] = human;
            const evalScore = hardMinimax(board, depth + 1, true, alpha, beta);
            board[index] = null;
            minEval = Math.min(minEval, evalScore);
            beta = Math.min(beta, evalScore);
            if (beta <= alpha) break; // Alpha-beta pruning
        }
        return minEval;
    }
};

export const getBestMove = (board: Board, playerSymbol: "X" | "O"): number => {
    let bestMove = -1;
    let bestScore = -Infinity;
    const computer = playerSymbol === "X" ? "O" : "X";

    for (const index of emptyIndices(board)) {
        board[index] = computer;
        const moveScore = hardMinimax(board, 0, false, -Infinity, Infinity);
        board[index] = null;
        if (moveScore > bestScore) {
            bestScore = moveScore;
            bestMove = index;
        }
    }

    return bestMove;
};

const emptyIndices = (board: Board) => {
    return board.map((value, index) => (value === null ? index : null)).filter((val) => val !== null) as number[];
};

const checkWin = (board: Board) => {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
};

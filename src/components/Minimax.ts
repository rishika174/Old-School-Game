type Board = (null | "X" | "O")[];

export const minimax = (board: Board, player: "X" | "O") => {
    const computer = player;
    const human = player === "X" ? "O" : "X";

    const emptyIndices = (board: Board) => {
        return board.map((value, index) => (value === null ? index : null)).filter((val) => val !== null) as number[];
    };

    const winner = checkWin(board);
    if (winner === human) return { score: -10 };
    if (winner === computer) return { score: 10 };
    if (emptyIndices(board).length === 0) return { score: 0 };

    const moves: { index: number; score: number }[] = [];

    emptyIndices(board).forEach((index) => {
        const newBoard = [...board];
        newBoard[index] = player;

        const result = minimax(newBoard, player === human ? computer : human);
        moves.push({ index, score: result.score });

        newBoard[index] = null;
    });

    let bestMove;
    if (player === computer) {
        let bestScore = -Infinity;
        moves.forEach((move) => {
            if (move.score > bestScore) {
                bestScore = move.score;
                bestMove = move;
            }
        });
    } else {
        let bestScore = Infinity;
        moves.forEach((move) => {
            if (move.score < bestScore) {
                bestScore = move.score;
                bestMove = move;
            }
        });
    }

    return bestMove!;
};

const checkWin = (board: Board) => {
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
            return board[a];
        }
    }
    return null;
};

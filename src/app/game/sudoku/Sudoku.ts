// Function to check if a number is valid in a given position
const isValid = (grid: number[][], row: number, col: number, num: number) => {
    for (let i = 0; i < 9; i++) {
        // Check if the number already exists in the row, column, or 3x3 grid
        if (grid[row][i] === num || grid[i][col] === num) return false;

        // Check the 3x3 grid
        const gridRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        const gridCol = 3 * Math.floor(col / 3) + (i % 3);
        if (grid[gridRow][gridCol] === num) return false;
    }
    return true;
};

// Function to generate a full valid Sudoku grid using backtracking
export const generateFullSudoku = () => {
    const grid = Array.from({ length: 9 }, () => Array(9).fill(0));

    // Function to fill the grid using backtracking
    const fillGrid = (grid: number[][]): boolean => {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (grid[row][col] === 0) {
                    // Shuffle numbers 1-9 to place them randomly
                    const nums = Array.from({ length: 9 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
                    for (const num of nums) {
                        if (isValid(grid, row, col, num)) {
                            grid[row][col] = num;
                            if (fillGrid(grid)) return true;
                            grid[row][col] = 0; // Backtrack
                        }
                    }
                    return false; // No valid number found, backtrack
                }
            }
        }
        return true; // Grid fully filled
    };


    fillGrid(grid);
    return grid;
};

// Function to remove numbers to create a Sudoku puzzle with a specific difficulty
export const removeNumbers = (grid: number[][], difficulty: "easy" | "medium" | "hard") => {
    let attempts = difficulty === "easy" ? 20 : difficulty === "medium" ? 35 : 50;

    while (attempts > 0) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);

        if (grid[row][col] !== 0) {
            const backup = grid[row][col];
            grid[row][col] = 0;

            const gridCopy = grid.map(row => [...row]);

            // If the puzzle still has a unique solution, continue; otherwise, restore the number
            if (!hasUniqueSolution(gridCopy)) {
                grid[row][col] = backup; // Restore the number if multiple solutions found
            } else {
                attempts--;
            }
        }
    }

    return grid;
};

// Function to check if the Sudoku has a unique solution (basic backtracking solver)
const hasUniqueSolution = (grid: number[][]) => {
    let solutionCount = 0;

    const solve = (grid: number[][]): boolean => {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (grid[row][col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (isValid(grid, row, col, num)) {
                            grid[row][col] = num;
                            if (solve(grid)) {
                                solutionCount++;
                                if (solutionCount > 1) return false; // More than one solution
                            }
                            grid[row][col] = 0;
                        }
                    }
                    return false; // No solution found
                }
            }
        }
        return true; // Solution found
    };

    solve(grid);
    return solutionCount === 1;
};



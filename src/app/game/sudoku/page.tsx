"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function Home() {
    // State for managing the current Sudoku puzzle
    const [sudoku, setSudoku] = useState<number[][]>([]);
    // State for storing the initial unchangeable Sudoku puzzle
    const [initialSudoku, setInitialSudoku] = useState<number[][]>([]);
    // State for tracking the currently selected cell in the Sudoku grid
    const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);

    const [difficultyLevel, setDifficultyLevel] = useState< "easy" | "medium" | "hard" >('easy');
    const [message, setMessage] = useState<string>('');


    // Function to check the entire Sudoku grid for a correct solution
    const checkSolution = () => {
        // Helper function to check if an array contains unique numbers 1-9
        const isValidArray = (arr: number[]) => {
            const filteredArr = arr.filter(num => num !== 0); // Remove 0s (empty cells)
            const uniqueNumbers = new Set(filteredArr);
            return filteredArr.length === uniqueNumbers.size && filteredArr.length === 9;
        };




        // Check all columns
        for (let col = 0; col < 9; col++) {
            const column = sudoku.map(row => row[col]);
            if (!isValidArray(column)) {
                setMessage(`Invalid solution! Check your column ${1+col} `);
                return false;
            }
        }

        // // Check all 3x3 grids
        // for (let gridRow = 0; gridRow < 3; gridRow++) {
        //     for (let gridCol = 0; gridCol < 3; gridCol++) {
        //         const grid: number[] = [];
        //         for (let row = gridRow * 3; row < gridRow * 3 + 3; row++) {
        //             for (let col = gridCol * 3; col < gridCol * 3 + 3; col++) {
        //                 grid.push(sudoku[row][col]);
        //             }
        //         }
        //         if (!isValidArray(grid)) {
        //             setMessage(`Invalid solution! Check your ${1+gridRow}x${1+gridCol} grids. 🤔`);
        //             return false;
        //         }
        //     }
        // }

        // Check all rows
        for (let row = 0; row < 9; row++) {
            if (!isValidArray(sudoku[row])) {
                setMessage(`Invalid solution! Check your row ${1+row}. 🧐`);
                return false;
            }
        }
        setMessage("Congratulations! Your solution is correct. 🥰");
        return true;
    };


    console.log("Rerender page....");


    // Main function to generate a medium-level Sudoku puzzle
    const generateSudoku = () => {
        const fullGrid = generateFullGrid(); // Generate the complete grid
        return removeNumbers(fullGrid, difficultyLevel); // Remove numbers for medium difficulty
    };

    // Effect to initialize the Sudoku puzzle when the component mounts
    useEffect(() => {
        const puzzle = generateSudoku(); // Generate the puzzle
        setSudoku(puzzle); // Set the current puzzle state
        setInitialSudoku(puzzle.map(row => [...row])); // Store the initial puzzle as unchangeable cells
    }, [difficultyLevel]);

    // Handle when a cell is clicked
    const handleCellClick = (row: number, col: number) => {
        // Only allow changing the cell if it's not pre-filled
        if (initialSudoku[row][col] === 0) {
            setSelectedCell([row, col]);
        }
    };

    // Handle when a number is selected from the number buttons
    const handleNumberSelect = (number: number) => {
        if (selectedCell) {
            const [row, col] = selectedCell;
            const newSudoku = [...sudoku]; // Clone the current puzzle
            newSudoku[row][col] = number; // Update the selected cell with the new number
            setSudoku(newSudoku); // Update the state with the new puzzle
        }
    };

    // Check if the cell is pre-filled and thus unchangeable
    const isUnchangeable = (row: number, col: number) => {
        return initialSudoku[row][col] !== 0; // If the initial puzzle value is not 0, it's unchangeable
    };

    // Render each individual cell in the Sudoku grid
    const renderCell = (row: number, col: number) => {
        const value = sudoku[row][col]; // Get the value for the current cell

        // Determine if the cell is selected or part of the same row, column, or 3x3 grid
        const isSelected = selectedCell && selectedCell[0] === row && selectedCell[1] === col;
        const isSameRowOrColumn = selectedCell && (selectedCell[0] === row || selectedCell[1] === col);
        const isInSameGrid = selectedCell && Math.floor(selectedCell[0] / 3) === Math.floor(row / 3) && Math.floor(selectedCell[1] / 3) === Math.floor(col / 3);

        return (
            <td
                key={`${row}-${col}`}
                className={`${styles.cell} ${isUnchangeable(row, col) ? styles.unchangeable : styles.changeable}`}
                onClick={() => handleCellClick(row, col)}
                style={{
                    backgroundColor:  isSelected
                        ? "lightblue" // Highlight the selected cell
                        : isSameRowOrColumn || isInSameGrid
                            ? "#d0f0d0" // Highlight the same row, column, or 3x3 grid cells
                            : isUnchangeable(row, col)
                                ? "#f0f0f0" // Set background color for pre-filled cells
                                : "white", // Default background for other cells
                    border: isInSameGrid ? ' 1px solid var(--light-green)':'' // Inner grid border
                }}
            >
                {value !== 0 ? value : ''} {/* Display the cell value if not 0 */}
            </td>
        );
    };

    return (<>
        <div className={styles.container}>

            <h1>Sudoku</h1>

            <div className={styles.difficultyContainer}>
                <button onClick={() => setDifficultyLevel('easy')}>Easy</button>
                <button onClick={() => setDifficultyLevel('medium')}>Medium</button>
                <button onClick={() => setDifficultyLevel('hard')}>Hard</button>
            </div>

            {/* Sudoku grid */}
            <table className={styles.grid}> {/* Outer border for Sudoku grid */}
                <tbody>
                {sudoku.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((_, colIndex) => renderCell(rowIndex, colIndex))}
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Number selection buttons */}
            <div className={styles.numberSelect}>
                {Array.from({length: 9}, (_, i) => i + 1).map((number) => (
                    <button key={number} onClick={() => handleNumberSelect(number)} className={styles.numberButton}>
                        {number}
                    </button>
                ))}
            </div>


            <div className={styles.checkYourSolutionContainer}>
                <p>{message}</p>
                <button onClick={() => checkSolution()}>Check your solution</button>
            </div>


            {/* Display Sudoku rules */}
            <div className={styles.rules}>
                <h3>Sudoku Rules</h3>
                <p>1. Each row, column, and 3x3 grid must contain the numbers 1-9 without repetition.</p>
                <p>2. Select a box to fill it with a number.</p>
                <p>3. Pre-filled numbers cannot be changed.</p>
            </div>

        </div>
        </>
    );
}








// Function to check if a number is valid in a given position on the Sudoku grid
const isValid = (grid: number[][], row: number, col: number, num: number) => {
    for (let i = 0; i < 9; i++) {
        // Check if the number exists in the same row or column
        if (grid[row][i] === num || grid[i][col] === num) return false;

        // Calculate the start of the 3x3 grid the number should belong to
        const gridRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        const gridCol = 3 * Math.floor(col / 3) + (i % 3);

        // Check if the number already exists in the corresponding 3x3 grid
        if (grid[gridRow][gridCol] === num) return false;
    }
    return true; // The number is valid in the given position
};

// Function to generate a fully valid Sudoku grid using backtracking
const generateFullGrid = () => {
    // Create a 9x9 grid filled with 0s (empty cells)
    const grid = Array.from({ length: 9 }, () => Array(9).fill(0));

    // Recursive function to fill the grid using backtracking
    const fillGrid = (grid: number[][]): boolean => {
        for (let row = 0; row < 9; row++) {

            for (let col = 0; col < 9; col++) {
                // If the current cell is empty (0), try to place a valid number
                if (grid[row][col] === 0) {
                    // Create an array of numbers 1-9 and shuffle them randomly
                    const nums = Array.from({ length: 9 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
                    // Try each number in the shuffled array
                    for (const num of nums) {
                        // Check if the number is valid in the current position
                        if (isValid(grid, row, col, num)) {
                            grid[row][col] = num; // Place the number
                            // Recursively attempt to fill the next cell
                            if (fillGrid(grid)) return true;
                            grid[row][col] = 0; // Backtrack if placing the number didn't work
                        }
                    }
                    return false; // No valid number found, backtrack
                }
            }
        }
        return true; // Grid fully filled successfully
    };

    fillGrid(grid); // Start filling the grid
    return grid; // Return the generated Sudoku grid
};

// Function to remove numbers from the filled grid to create a Sudoku puzzle
// Difficulty can be "easy", "medium", or "hard"
const removeNumbers = (grid: number[][], difficulty: "easy" | "medium" | "hard") => {
    // Set the number of removal attempts based on the difficulty level
    let attempts = difficulty === "easy" ? 30 : difficulty === "medium" ? 40 : 50;

    // Remove numbers from the grid until the number of attempts is reached
    while (attempts > 0) {
        const row = Math.floor(Math.random() * 9); // Pick a random row
        const col = Math.floor(Math.random() * 9); // Pick a random column

        // If the cell is not already empty
        if (grid[row][col] !== 0) {
            const backup = grid[row][col]; // Backup the number in the cell
            grid[row][col] = 0; // Remove the number (set to 0)

            // Create a deep copy of the grid to test if the puzzle still has a unique solution
            const gridCopy = grid.map(row => [...row]);

            // If the puzzle has multiple solutions, restore the removed number
            if (!hasUniqueSolution(gridCopy)) {
                grid[row][col] = backup; // Restore the removed number
            } else {
                attempts--; // Decrease the number of attempts left
            }
        }
    }

    return grid; // Return the grid with numbers removed
};

// Function to check if the Sudoku puzzle has a unique solution
const hasUniqueSolution = (grid: number[][]) => {
    let solutionCount = 0; // Initialize solution count

    // Recursive function to solve the grid using backtracking
    const solve = (grid: number[][]): boolean => {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                // If the current cell is empty (0), try placing numbers 1-9
                if (grid[row][col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        // Check if the number is valid in the current position
                        if (isValid(grid, row, col, num)) {
                            grid[row][col] = num; // Place the number
                            if (solve(grid)) {
                                solutionCount++; // Increase the solution count if a solution is found
                                if (solutionCount > 1) return false; // If more than one solution, stop
                            }
                            grid[row][col] = 0; // Backtrack if needed
                        }
                    }
                    return false; // No valid number found, backtrack
                }
            }
        }
        return true; // Solution found
    };

    solve(grid); // Start solving the grid
    return solutionCount === 1; // Return true if only one solution exists
};


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


        //
        // // Check all columns
        // for (let col = 0; col < 9; col++) {
        //     const column = sudoku.map(row => row[col]);
        //     if (!isValidArray(column)) {
        //         setMessage(`Invalid solution! Check your columns ${1+col}. 🧐`);
        //         return false;
        //     }
        // }

        // Check all 3x3 grids
        for (let gridRow = 0; gridRow < 3; gridRow++) {
            for (let gridCol = 0; gridCol < 3; gridCol++) {
                const grid: number[] = [];
                for (let row = gridRow * 3; row < gridRow * 3 + 3; row++) {
                    for (let col = gridCol * 3; col < gridCol * 3 + 3; col++) {
                        grid.push(sudoku[row][col]);
                    }
                }
                if (!isValidArray(grid)) {
                    setMessage(`Invalid solution! Check your ${1+gridRow}x${1+gridCol} grids. 🤔`);
                    return false;
                }
            }
        }

        // Check all rows
        for (let row = 0; row < 9; row++) {
            if (!isValidArray(sudoku[row])) {
                setMessage(`Invalid solution! Check your rows ${1+row}. 🧐`);
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
const generateFullGrid = () => {
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
const removeNumbers = (grid: number[][], difficulty: "easy" | "medium" | "hard") => {
    let attempts = difficulty === "easy" ? 30 : difficulty === "medium" ? 40 : 50;

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


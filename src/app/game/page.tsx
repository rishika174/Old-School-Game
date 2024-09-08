import React from 'react';
import styles from "./page.module.css";
import Link from "next/link";


const SelectGame = () => {
    return (
        <>
            <div id={styles.bgGrid}>
                <div id={styles.blurGrid}></div>
            </div>

            <div className={styles.urlConatiner}>
                <div className={styles.tictactoeUrlConatiner}>
                    <Link href="/game/tic-tac-toe/single-player">Tic Tac Toe</Link>
                </div>
                <div className={styles.githubUrlConatiner}>
                    <Link href="/game/sudoku">Sudoku</Link>
                </div>
            </div>

        </>
    );
};

export default SelectGame;
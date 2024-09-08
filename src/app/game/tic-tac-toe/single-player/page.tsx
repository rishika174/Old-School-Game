"use client";

import {useState} from "react";
import GameBoard from '../../../../components/GameBoard';
import styles from "./page.module.css";

export default function SinglePlayerPage() {
    const [playerSymbol, setPlayerSymbol] = useState<"X" | "O" | null>(null);


    const handleSymbolSelect = (symbol: "X" | "O") => {
        setPlayerSymbol(symbol);
    };

    return (
        <div style={{textAlign: "center"}}>
            {!playerSymbol ? (
                <>

                    <div id={styles.bgGrid}>
                        <div id={styles.blurGrid}></div>
                    </div>

                    <div className={styles.selectSymbolContainer}>
                        <h2>Select your symbol</h2>
                        <div className={styles.symbolContainer}>
                            <button className={styles.selectSymbolButton1} onClick={() => handleSymbolSelect("X")}>X
                            </button>
                            <button className={styles.selectSymbolButton2} onClick={() => handleSymbolSelect("O")}>O
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <GameBoard playerSymbol={playerSymbol}/>
            )}
        </div>
    );
}

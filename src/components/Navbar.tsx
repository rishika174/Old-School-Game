import React from 'react';
import Link from "next/link";
import styles from "@/components/navbar.module.css";

const Navbar = () => {
    return (
        <>
            <div className={styles["navbar-container"]}>
                <nav className={styles["navbar"]}>
                    <Link href="/" className={styles["heading"]}>
                        <h3 className={styles["title"]}>BRAIN GAME</h3>
                    </Link>
                    <Link href="/" className={styles.link}>LOGIN</Link>
                </nav>
            </div>
            <div className={styles["fade-navbar-effect"]}></div>
            <div className={styles["empty-navbar"]}></div>
        </>
    );
};

export default Navbar;
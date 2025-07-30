'use client'
import { useEffect, useState } from 'react'
import styles from './page.module.css'

const generateShuffledNumbers = (): number[] => {
  const numbers = Array.from({ length: 25 }, (_, i) => i + 1)
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[numbers[i], numbers[j]] = [numbers[j], numbers[i]]
  }
  return numbers
}

const SchulteTable = () => {
  const [numbers, setNumbers] = useState<number[]>([])
  const [nextNumber, setNextNumber] = useState(1)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [highlighted, setHighlighted] = useState<number | null>(null)
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)

  const startNewGame = () => {
    setNumbers(generateShuffledNumbers())
    setNextNumber(1)
    setStartTime(null)
    setElapsedTime(0)
    setHighlighted(null)
    if (intervalId) clearInterval(intervalId)
  }

  useEffect(() => {
    startNewGame()
  }, [])

  useEffect(() => {
    if (startTime !== null && nextNumber <= 25) {
      const id = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 100) / 10)
      }, 100)
      setIntervalId(id)
      return () => clearInterval(id)
    }
  }, [startTime,nextNumber])

  

  const handleClick = (num: number) => {
    if (num === nextNumber) {
      setHighlighted(num)

      if (num === 1) {
        setStartTime(Date.now())
      }

      if (num === 25 && intervalId) {
        clearInterval(intervalId)
      }

      setTimeout(() => setHighlighted(null), 200)
      setNextNumber(num + 1)
    }
  }

  return (
    <div className={styles.container}>
      

      {/* Game Status and Grid */}
      <div className={styles.header}>
        {nextNumber <= 25 ? (
          <>
            <span className={styles.status}>Next: {nextNumber}</span>
            <span className={styles.status}>Time: {elapsedTime.toFixed(1)}s</span>
          </>
        ) : (
          <span className={styles.status}>🎉 Completed in {elapsedTime.toFixed(1)}s!</span>
        )}
        <button type='button' className={styles.restartBtn} onClick={startNewGame}>Restart</button>
      </div>

      <div className={styles.grid}>
        {numbers.map((num) => (
          <button type='button'
            key={num}
            className={`${styles.cell} ${highlighted === num ? styles.highlight : ''}`}
            onClick={() => handleClick(num)}
          >
            {num}
          </button>
        ))}
      </div>

      {/* How to Play Section */}
        <div className={styles.instructions}>
        <h2>How Does the Game Work?</h2>
        <p>
            You need to click numbers from <strong>1 to 25</strong> in ascending order as fast as possible.
            The timer starts when you click 1 and stops when you click 25.
        </p>

        <h3>Shuffling Algorithm</h3>
        <p>
            The numbers are shuffled using the <strong>Fisher-Yates</strong> algorithm, ensuring each arrangement is random.
        </p>


        <h3>Timing Logic</h3>
        <ul>
            <li>A 0.1s interval continuously updates the timer after clicking 1.</li>
            <li>Timer stops automatically after 25 is clicked.</li>
        </ul>

        <h3>Visual Feedback</h3>
        <ul>
            <li>Correctly clicked numbers briefly highlight green.</li>
            <li>Incorrect numbers give no response.</li>
            <li>You can see the next number to be clicked at the top of the table.</li>
        </ul>

        <button
            className={styles.learnBtn}
            onClick={() => window.open('https://www.geeksforgeeks.org/dsa/shuffle-a-given-array-using-fisher-yates-shuffle-algorithm/', '_blank')}
        >
            Learn more about it
        </button>
        </div>

    </div>
  )
}

export default SchulteTable

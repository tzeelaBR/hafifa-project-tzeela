import React, { useState, useEffect } from "react";
import ReactConfetti from "react-confetti";
import styles from "./DefinitionScore.module.css";
import greenPlanet from "../../assets/img/planets/green-planet.svg";
import AstronautHi from "../../assets/img/astronaut-saying-hi.svg";

const TOTAL_QUESTIONS = 5;

const DefinitionScore = ({ failCount, onFinish }) => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const percentScore = Math.round((TOTAL_QUESTIONS / (TOTAL_QUESTIONS + failCount)) * 100);
  const handleFinishAndUnlock = () => {
    const currentProgress = Number(localStorage.getItem("userProgress") || 0);
    if (currentProgress < 2) {
      localStorage.setItem("userProgress", "2");
    }
    onFinish();
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3500);

    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.mainWrapper}>
        <header className={styles.header}></header>

        <main className={styles.mainContent}>
          <h1 className={styles.subjHeader}>הגדרה - <br />אז מהו אסטרואיד?</h1>

          <div className={styles.visualGroup}>
            <div className={styles.quizCard}>
              <p className={styles.feedbackTop}>כל הכבוד!</p>

              <div className={styles.scoreCircle}>
                <span className={styles.scoreNumber}>{percentScore}</span>
              </div>

              <p className={styles.feedbackBotton}>
                עברת את החידון עם <span className={styles.failHighlight}>{failCount}</span> טעויות!!!
              </p>
            </div>

            <img src={AstronautHi} alt="Astronaut Dani" className={styles.dani} />

            <div className={styles.planetContainer}>
              <img src={greenPlanet} alt="green planet" className={styles.greenHalf} />
            </div>

            <div className={styles.footer}>
              {/* עדכון ה-onClick לפונקציה החדשה שלנו */}
              <button className={styles.nextButton} onClick={handleFinishAndUnlock}>
                חזרה לחללית
              </button>
            </div>
          </div>
        </main>
      </div>

      {showConfetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={1000}
          recycle={false}
          gravity={0.2}
          initialVelocityY={25}
          initialVelocityX={10}
          tweenDuration={2000}
          colors={['#F47160', '#AFE2B1', '#AB479A', '#3A184B', '#FFFFFF', '#FFD700', '#00FFFF']}
          style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999, pointerEvents: 'none' }}
        />
      )}
    </div>
  );
};

export default DefinitionScore;
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AsteroidGame.module.css";
import gameData from "../../data/gameData.json";
import Grid from "../../assets/img/grid.svg";
import SpaceshipBase from "../../assets/img/spaceship-bubble.svg";
import AsteroidImg from "../../assets/img/asteroidcircle.svg";
import DaniHead from "../../assets/img/dani-head.svg";
import backBtn from "../../assets/img/back-btn.svg";
import PracticeLeave from "../PracticeLeave/PracticeLeave";
import FeedbackPopup from "../FeedbackPopup/FeedbackPopup";

export default function AsteroidGame({ onBack }) {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [popup, setPopup] = useState(null);
  const [showLeavePopup, setShowLeavePopup] = useState(false);
  const [daniMessage, setDaniMessage] = useState("אני סומך עליכם!");
  
  const currentAsteroid = gameData[currentIndex];

  const shuffledAnswers = useMemo(() => {
    if (!currentAsteroid) return [];
    const answers = [
      { text: currentAsteroid.correct, isCorrect: true },
      ...(currentAsteroid.wrongAnswers?.map(w => ({ text: w, isCorrect: false })) || [])
    ];
    return [...answers].sort(() => Math.random() - 0.5);
  }, [currentAsteroid]);

  useEffect(() => {
    if (!zoomed || popup) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setPopup("timeout");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [zoomed, popup]);

  const handleSelect = (clickedId) => {
    if (!currentAsteroid) return;
    if (clickedId === currentAsteroid.id) {
      setDaniMessage("פגעת בול!");
      setTimeout(() => setZoomed(true), 1000);
    } else {
      setDaniMessage("קצת פספסת...");
    }
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setPopup("correct");
    } else {
      setPopup("wrong");
    }
  };

  const nextLevel = () => {
    setPopup(null);
    setZoomed(false);
    setTimeLeft(60);
    setDaniMessage("אני סומך עליכם!");
    if (currentIndex + 1 < gameData.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      navigate("/end");
    }
  };

  if (!currentAsteroid) return null;

  return (
    <div className={styles.container}>
      <div className={styles.mainWrapper}>
        <header className={styles.header}>
          <img 
            src={backBtn} 
            alt="back" 
            className={styles.backButton} 
            onClick={() => setShowLeavePopup(true)} 
          />
        </header>

        <main className={styles.mainContent}>
          <h1 className={styles.subjHeader}>פיצוץ אסטרואידים - תרגול</h1>

          <div className={styles.visualGroup}>
            <div className={styles.gameCard}>
              <p className={styles.instructions}>
                לחצו על האסטרואיד עם הקואורדינטות שנשלחו אליכם מתחנת החלל למטה
              </p>

              <div className={styles.gridContainer}>
                <img src={Grid} alt="grid" className={styles.gridImage} />
                <div className={styles.gridSystem}>
                  {gameData.map((a) => (
                    <div
                      key={a.id}
                      className={styles.gridSlot}
                      style={{
                        gridColumn: 7 - a.y,
                        gridRow: 7 - a.x
                      }}
                      onClick={() => handleSelect(a.id)}
                    >
                      <img
                        src={AsteroidImg}
                        alt="asteroid"
                        className={styles.asteroidImg}
                        style={{ width: `${a.size || 40}px` }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.daniSpeechBubble}>
                  <img src={DaniHead} alt="dani" className={styles.daniHead} />
                <p className={styles.messageText}>{daniMessage}</p>
              </div>
            </div>
              <div className={styles.targetCoordsWrapper}>
                 <img src={SpaceshipBase} alt="spaceship" className={styles.spaceshipImg} />
                 <span className={styles.coordsLabel}>{currentAsteroid.x} , {currentAsteroid.y}</span>
              </div>
          </div>
        </main>

        {/*  השאלות  */}
        {zoomed && !popup && (
          <div className={styles.quizOverlay}>
            <div className={styles.timerContainer}>
              <div 
                className={styles.timerBar} 
                style={{ width: `${(timeLeft / 60) * 100}%` }}
              />
            </div>
            <h2 className={styles.questionText}>{currentAsteroid.question}</h2>
            <div className={styles.answersGrid}>
              {shuffledAnswers.map((ans, i) => (
                <button
                  key={i}
                  className={styles.answerBtn}
                  onClick={() => handleAnswer(ans.isCorrect)}
                >
                  {ans.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {popup && (
          <FeedbackPopup
            type={popup}
            onClose={nextLevel}
            onRetry={() => setPopup(null)}
            onBackToGrid={() => { setPopup(null); setZoomed(false); setTimeLeft(60); }}
          />
        )}

        {showLeavePopup && (
          <PracticeLeave
            onBack={() => setShowLeavePopup(false)}
            onConfirm={onBack}
          />
        )}
      </div>
    </div>
  );
}
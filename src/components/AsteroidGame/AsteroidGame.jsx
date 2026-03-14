import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AsteroidGame.module.css";
import gameData from "../../data/gameData.json";
import Grid from "../../assets/img/grid.svg";
import SpaceshipBase from "../../assets/img/spaceship-bubble.svg";
import AsteroidImg from "../../assets/img/asteroidcircle.svg";
import DaniHead from "../../assets/img/dani-head.svg";
import backBtn from "../../assets/img/back-btn.svg";
import AlienIcon from "../../assets/img/alien.svg";
import AirBalloons from "../../assets/img/air-balloons.svg";
import PracticeLeave from "../PracticeLeave/PracticeLeave";

export default function AsteroidGame({ onBack }) {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  // State חדש שאחראי רק על מה שמוצג בבועה של החללית ובטקסט של דני
  const [displayIndex, setDisplayIndex] = useState(0);

  const [zoomed, setZoomed] = useState(false);
  const [isZoomFinished, setIsZoomFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [popup, setPopup] = useState(null);
  const [showLeavePopup, setShowLeavePopup] = useState(false);
  const [daniMessage, setDaniMessage] = useState("אני סומך עליכם!");
  const [messageStatus, setMessageStatus] = useState("default");
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isExploding, setIsExploding] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [explodedAsteroids, setExplodedAsteroids] = useState(new Set());

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
    if (!isZoomFinished || popup || isExploding) return;
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
  }, [isZoomFinished, popup, isExploding]);

  const handleSelect = (clickedId) => {
    if (!currentAsteroid || isExploding) return;
    if (clickedId === currentAsteroid.id) {
      setDaniMessage("פגעת בול!");
      setMessageStatus("correct");
      setTimeout(() => {
        setZoomed(true);
        setTimeout(() => setIsZoomFinished(true), 700);
      }, 1000);
    } else {
      setDaniMessage("קצת פספסת...");
      setMessageStatus("wrong");
    }
  };

  const handleAnswer = (isCorrect, index) => {
    if (popup || isExploding) return;
    setSelectedAnswer(index);

    setTimeout(() => {
      if (isCorrect) {
        setPopup("correct");

        setTimeout(() => {
          setPopup(null);
          setIsShaking(true);
          setIsExploding(true);
          setTimeout(() => {
            setDaniMessage("אני סומך עליכם!");
            setMessageStatus("default");
            if (displayIndex + 1 < gameData.length) {
              setDisplayIndex(prev => prev + 1);
            }
          }, 300);

          setTimeout(() => setIsShaking(false), 600);

          setTimeout(() => {
            setIsExploding(false);
            setExplodedAsteroids(prev => new Set(prev).add(currentAsteroid.id));
            setZoomed(false);
            setIsZoomFinished(false);
            setTimeLeft(30);

            // רק בסוף הפיצוץ המלא מעדכנים את ה-currentIndex הלוגי
            if (currentIndex + 1 < gameData.length) {
              setCurrentIndex(prev => prev + 1);
            } else {
              localStorage.setItem("userProgress", "999");
              navigate("/end");
            }
          }, 1400);
        }, 1200);
      } else {
        setPopup("wrong");
      }
      setSelectedAnswer(null);
    }, 600);
  };

  const retryLevel = () => setPopup(null);

  const backToSpaceship = () => {
    setPopup(null);
    setZoomed(false);
    setIsZoomFinished(false);
    setTimeLeft(30);
    setDaniMessage("אני סומך עליכם!");
    setMessageStatus("default");
  };

  if (!currentAsteroid) return null;

  return (
    <div className={styles.container}>
      <div className={`${styles.mainWrapper} ${isShaking ? styles.screenShake : ""}`}>

          <img
            src={backBtn}
            alt="back"
            className={`${styles.backButton}`}
            onClick={() => setShowLeavePopup(true)}
          />

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
                        gridRow: 7 - a.x,
                        // המפה מתייחסת ל-currentIndex המקורי עד סוף הפיצוץ - זה מונע את הקפיצות!
                        visibility: (explodedAsteroids.has(a.id) || (isExploding && a.id === currentAsteroid.id)) ? 'hidden' : 'visible'
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
                <p className={`${styles.messageText} ${styles[messageStatus]}`}>
                  {daniMessage}
                </p>
              </div>
            </div>

            <div className={styles.targetCoordsWrapper}>
              <img src={SpaceshipBase} alt="spaceship" className={styles.spaceshipImg} />
              <span className={styles.coordsLabel}>
                {/* משתמשים ב-displayIndex כדי להראות את הקואורדינטות הבאות בלי להרוס את המפה */}
                {gameData[displayIndex].x} , {gameData[displayIndex].y}
              </span>
            </div>
          </div>

          {zoomed && (
            <div className={`${styles.quizOverlay} ${isExploding ? styles.exploding : ""}`}>
              <div className={styles.quizBackground}></div>

              {isZoomFinished && !isExploding && (
                <>
                  {!popup && (
                    <div className={styles.timerWrapper}>
                      <div className={styles.timerHeader}>
                        <span className={`${styles.timerText} ${timeLeft < 15 ? styles.lowTimeText : ""}`}>
                          חמצן
                        </span>
                        <div className={`${styles.balloonsIcon} ${timeLeft < 15 ? styles.lowTimeBalloons : ""}`} />
                      </div>
                      <div className={styles.timerContainer}>
                        <div
                          className={`${styles.timerBar} ${timeLeft < 15 ? styles.lowTimeBar : ""}`}
                          style={{ '--progress': `${(timeLeft / 30) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {(popup || !isExploding) && (
                    <div className={`${styles.quizCard} ${popup === 'correct' ? styles.correctCard : (popup === 'wrong' || popup === 'timeout') ? styles.wrongCard : ''}`}>
                      {popup === "correct" && (
                        <div className={styles.correctPopup}>
                          <h2 className={styles.popupTitle}>כל הכבוד, רואים שאתה טיל בחומר!</h2>
                          <img src={DaniHead} alt="correct" className={styles.popupIcon} />
                        </div>
                      )}

                      {popup === "wrong" && (
                        <div className={styles.wrongPopup}>
                          <h2 className={styles.popupTitle}>אוי לא, פוצצת משפחת חיזרים חפים משפע!</h2>
                          <img src={AlienIcon} alt="wrong" className={styles.popupIcon} />
                          <button onClick={retryLevel} className={styles.popupBtn}>לנסות שוב</button>
                        </div>
                      )}

                      {popup === "timeout" && (
                        <div className={styles.timeoutPopup}>
                          <h2 className={styles.popupTitle}>מלאי החמצן שלכם אזל, אולי תצליח פעם הבאה...</h2>
                          <img src={AirBalloons} alt="timeout" className={styles.popupIcon} />
                          <button onClick={backToSpaceship} className={styles.popupBtn}>חזרה לחללית</button>
                        </div>
                      )}

                      {!popup && (
                        <>
                          <h2 className={styles.questionText}>{currentAsteroid.question}</h2>
                          <div className={styles.answersGrid}>
                            {shuffledAnswers.map((ans, i) => (
                              <button
                                key={i}
                                className={`${styles.answerBtn} ${selectedAnswer === i ? (ans.isCorrect ? styles.btnCorrect : styles.btnWrong) : ""}`}
                                onClick={() => handleAnswer(ans.isCorrect, i)}
                              >
                                {ans.text}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </main>

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
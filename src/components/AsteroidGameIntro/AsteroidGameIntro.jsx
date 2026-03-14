import React from "react";
import styles from "./AsteroidGameIntro.module.css";
import bluePlanet from "../../assets/img/planets/blue-planet.svg";
import Astronaut from "../../assets/img/astronaut.svg";
import backBtn from "../../assets/img/back-btn.svg";

const AsteroidGameIntro = ({ onNext, onBack }) => {
    return (
        <div className={styles.container}>
            <div className={styles.mainWrapper}>
                <header className={styles.header}>
                    <img
                        src={backBtn}
                        alt="back"
                        className={styles.backButton}
                        onClick={onBack}
                    />
                </header>

                <main className={styles.mainContent}>
                    <h1 className={styles.subjHeader}>
                        פיצוץ אסטרואידים - <br /> תרגול
                    </h1>

                    <div className={styles.visualGroup}>
                        <div className={styles.quizCard}>
                            <h2 className={styles.cardHeaderLarge}>הגעתם לחלק האחרון של הלומדה!</h2>

                            <p className={styles.cardBodyText}>
                                אבל רגע, עדיין אי אפשר להתרגש - דליפת הגז הגיעה למצב קריטי שבו לא נוכל להשאר בחלל ליותר מדקה מבלי לחזור לתחנת החלל לחידוש החמצן.
                            </p>

                            <p className={styles.cardBodyText}>
                                תצטרכו לקבל את המידע מתחנת החלל, לכוון את משגר הפצצות על האסטרואיד מתחנת השיגור החללית ובמידה ופגעת גם לענות על שאלה לפני שמלאי החמצן שלכם יגמר...
                            </p>

                            <p className={styles.readyText}>מוכנים להציל את כדור הארץ?</p>

                            <button className={styles.startButton} onClick={onNext}>
                                <span>התחל</span>
                                {/* <div className={styles.arrowCircle}>»</div> */}
                            </button>
                        </div>

                        <img src={Astronaut} alt="Astronaut Dani" className={styles.dani} />

                        <div className={styles.planetContainer}>
                            <img src={bluePlanet} alt="blue planet" className={styles.blueHalf} />
                        </div>
{/* 
                        <div className={styles.footer}>
                            <p className={styles.miniTextQuiz}>עדיין לא מוכן?</p>
                            <button className={styles.nextButton} onClick={onBack}>לעמוד הקודם</button>
                        </div> */}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AsteroidGameIntro;
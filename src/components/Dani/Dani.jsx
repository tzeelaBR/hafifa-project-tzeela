import React from "react";
import Astronaut from "../../assets/img/astronaut-saying-hi.svg";
import backBtn from "../../assets/img/back-btn.svg";
import { useNavigate } from "react-router-dom";
import styles from "./Dani.module.css";
import Header from "../Header/Header";

const Dani = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.mainWrapper}>
                <Header />

                <main className={styles.mainContent}>
                    <img
                        src={backBtn}
                        alt="back"
                        className={styles.backButton}
                        onClick={() => navigate("/")}
                    />
                    <section className={`${styles.textSection} ${styles.fadeIn}`}>
                        <p>היי לכולם! </p>
                        <p> אני דני - נציג חלל ותיק.</p>
                        <p>קרה משהו נורא - כדור הארץ תחת מתקפת האסטרואידים הגרועה ביותר שהיא אי פעם חוותה!</p>
                        <p>דווקא ברגעים קשים אלו התחילה דליפה ממחסני הגז של החללית.</p>
                        <p>הזמן מוגבל והסכנה גבוהה, והחיים של כדור הארץ כולו תלוי בכם.</p>
                        <p>אנחנו קצרים בכוח אדם וממש צריכים אתכם. תוכלו לעזור לי לנטרל את איומי האסטרואידים?</p>
                    </section>

                    <div className={styles.visualGroup}>
                        <img src={Astronaut} alt="Dani" className={styles.astronaut} />
                        <div className={styles.planet}></div>
                    </div>
                    <button className={styles.startButton} onClick={() => navigate("/home")}>
                        בטח, אני מוכן להתחיל!
                    </button>
                </main>
            </div>
        </div>
    );
};

export default Dani;
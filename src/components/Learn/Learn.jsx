import React from "react";
import styles from "./Learn.module.css";
import pinkPlanet from "../../assets/img/planets/pink-planet.svg";
import Astronaut from "../../assets/img/astronaut.svg";
import backBtn from "../../assets/img/back-btn.svg";

const Learn = ({ onBack }) => {

    const handleFinish = () => {
        const currentProgress = Number(localStorage.getItem("userProgress") || 0);
        if (currentProgress < 1) {
            localStorage.setItem("userProgress", "1");
        }
        onBack();
    };

    return (
        <div className={styles.container}>
            <div className={styles.mainWrapper}>

                <img
                    src={backBtn}
                    alt="back"
                    className={styles.backButton}
                    onClick={onBack}
                />

                <main className={styles.mainContent}>
                    <h1 className={styles.subjHeader}>
                        מבוא - למה זה חשוב?
                    </h1>

                    <p className={styles.text}>
                        שיעור פיצוץ אסטרואיד ידוע בחשיבותו בגלל הסכנה היומיומית הנשקפת לכדור הארץ בלעדיו.
                        עשרות אלפי אסטרואידים נעים לכיוון הכוכב שלנו, ועליכן לדעת כיצד למנוע מהם להגיע אליו.
                    </p>

                    <div className={styles.visualGroup}>
                        <img src={Astronaut} alt="Astronaut Dani" className={styles.daniLearn} />
                        <div className={styles.planetContainer}>
                            <img src={pinkPlanet} alt="pink planet" className={styles.pinkHalf} />
                        </div>
                    </div>
                </main>

                <button className={`${styles.button} ${styles.nextButton}`} onClick={handleFinish}>
                    הבנתי!
                </button>
            </div>
        </div>
    );
};

export default Learn;
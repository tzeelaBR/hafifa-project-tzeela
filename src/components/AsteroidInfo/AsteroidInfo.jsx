import { useState } from "react";
import styles from "./AsteroidInfo.module.css";
import asteroidsData from "../../data/asteroidsData.json";
import purplePlanet from "../../assets/img/planets/purple-planet.svg";
import AstronautHi from "../../assets/img/astronaut-saying-hi.svg";
import SimpleAstroid from "../../assets/img/asteroidcircle.svg";
import AsteroidId from "../AsteroidId/AsteroidId";
import backBtn from "../../assets/img/back-btn.svg";

const AsteroidInfo = ({ onBack }) => {
  const [selectedAsteroid, setSelectedAsteroid] = useState(null);
  const [visited, setVisited] = useState([]);

  const handleSelect = (id) => {
    if (!visited.includes(id)) setVisited(prev => [...prev, id]);
    const asteroid = asteroidsData.find(a => a.id === id);
    setSelectedAsteroid(asteroid);
  };
  const handleFinishAndUnlock = () => {
    const currentProgress = Number(localStorage.getItem("userProgress") || 0);
    if (currentProgress < 3) {
      localStorage.setItem("userProgress", "3");
    }
    onBack();
  };

  if (selectedAsteroid) {
    return (
      <AsteroidId
        asteroid={selectedAsteroid}
        onBack={() => setSelectedAsteroid(null)}
        onFinish={visited.length === asteroidsData.length ? handleFinishAndUnlock : null}
      />
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.mainWrapper}>
        <header className={styles.header}>
          <img src={backBtn} alt="back" className={styles.backButton} onClick={onBack} />
        </header>

        <main className={styles.mainContent}>
          <h1 className={styles.subjHeader}>סוגי אסטרואידים - מול מי אנחנו נלחמים?</h1>
          <p className={styles.text}>
            יש שלושה סוגים מרכזיים של אסטרואידים.
            לחצו על האסטרואידים למטה כדי ללמוד עוד על כל אחד מהם.
          </p>

          <div className={styles.visualGroup}>
            <div className={styles.asteroidsMap}>
              {asteroidsData.map((asteroid, index) => (
                <div
                  key={asteroid.id}
                  className={`${styles.asteroidItem} ${styles[`pos${index}`]} ${!visited.includes(asteroid.id) ? styles.glow : ""}`}
                  onClick={() => handleSelect(asteroid.id)}
                >
                  <img src={SimpleAstroid} alt={asteroid.title} />
                  <p>{asteroid.title}</p>
                </div>
              ))}
            </div>

            <img src={AstronautHi} alt="Astronaut Dani" className={styles.daniHi} />
            <div className={styles.planetContainer}>
              <img src={purplePlanet} alt="purple planet" className={styles.purpleHalf} />
            </div>

            {visited.length === asteroidsData.length && (
              <div className={styles.footer}>
                <button className={styles.nextButton} onClick={handleFinishAndUnlock}>
                  חזרה לחללית
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AsteroidInfo;
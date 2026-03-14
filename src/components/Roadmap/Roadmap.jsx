import React, { useState, useEffect } from "react";
import styles from "./Roadmap.module.css";
import pinkPlanet from "../../assets/img/planets/pink-planet.svg";
import greenPlanet from "../../assets/img/planets/green-planet.svg";
import purplePlanet from "../../assets/img/planets/purple-planet.svg";
import bluePlanet from "../../assets/img/planets/blue-planet.svg";

const Roadmap = ({ onSelectPlanet }) => {
  const [unlockedLevel, setUnlockedLevel] = useState(0);

  useEffect(() => {
    const savedProgress = localStorage.getItem("userProgress");
    if (savedProgress) {
      setUnlockedLevel(parseInt(savedProgress, 10));
    }
  }, []);

  const checkUnlocked = (levelIndex) => {
    return unlockedLevel === 999 || levelIndex <= unlockedLevel;
  };

  const shouldGlow = (levelIndex) => {
    return unlockedLevel === levelIndex && unlockedLevel !== 999;
  };

  const handlePlanetClick = (planetKey, levelIndex) => {
    if (checkUnlocked(levelIndex)) {
      onSelectPlanet(planetKey);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainWrapper}>
        <div className={styles.mapArea}>

          {/* שלב 0 - ורוד */}
          <div
            className={`
              ${styles.planet} 
              ${styles.pink} 
              ${!checkUnlocked(0) ? styles.locked : ""} 
              ${shouldGlow(0) ? styles.isUnlocked : ""}
            `}
            onClick={() => handlePlanetClick("pink", 0)}
          >
            <img src={pinkPlanet} alt="pink" />
            <p>מבוא</p>
          </div>

          {/* שלב 1 - ירוק */}
          <div
            className={`
              ${styles.planet} 
              ${styles.green} 
              ${!checkUnlocked(1) ? styles.locked : ""} 
              ${shouldGlow(1) ? styles.isUnlocked : ""}
            `}
            onClick={() => handlePlanetClick("green", 1)}
          >
            <img src={greenPlanet} alt="green" />
            <p>הגדרה</p>
          </div>

          {/* שלב 2 - סגול */}
          <div
            className={`
              ${styles.planet} 
              ${styles.purple} 
              ${!checkUnlocked(2) ? styles.locked : ""} 
              ${shouldGlow(2) ? styles.isUnlocked : ""}
            `}
            onClick={() => handlePlanetClick("purple", 2)}
          >
            <img src={purplePlanet} alt="purple" />
            <p>סוגי אסטרואידים</p>
          </div>

          {/* שלב 3 - כחול */}
          <div
            className={`
              ${styles.planet} 
              ${styles.blue} 
              ${!checkUnlocked(3) ? styles.locked : ""} 
              ${shouldGlow(3) ? styles.isUnlocked : ""}
            `}
            onClick={() => handlePlanetClick("blue", 3)}
          >
            <img src={bluePlanet} alt="blue" />
            <p>פיצוץ אסטרואידים</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Roadmap;
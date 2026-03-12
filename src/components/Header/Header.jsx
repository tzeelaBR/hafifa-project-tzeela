import React from 'react';
import styles from './Header.module.css';
import logo from "../../assets/img/logo.svg";
import tilLogo from "../../assets/img/til-logo.svg";

const Header = () => {
    return (
        <header className={styles.headerBg}>
            <img src={tilLogo} alt="mador Til logo" className={styles.madorTilLogo}/>
            <p className={styles.title}>מלחמת אסטרואידים</p>
            <img src={logo} alt="logo" className={styles.logo}/>
        </header>
    );
};

export default Header;
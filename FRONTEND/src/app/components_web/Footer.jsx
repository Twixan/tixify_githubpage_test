'use client'

import React from 'react';

import styles from './styles/Footer.module.css';

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <h4 className={styles.footerTitle}>© 2023 Celebration Connect Inc.<br></br>Alla rättigheter förbehållna</h4>
    </div>
  );
};

export default Footer;
import React from 'react'
import styles from './styles.landingpage.module.css'

import Header from './components_web/Header.jsx'
import AnouncementBanner from './components_web/AnouncementBanner.jsx'
import Card1 from './components_web/cards/Card1.jsx'
import Card2 from './components_web/cards/Card2.jsx'
import Footer from  './components_web/Footer.jsx'


const PAGENAME = () => {
  return (
    <div className={styles.LandingContainer}>
      <div className={styles.LandingPageGradient}>
        <img src="https://storage.googleapis.com/xylex_images/cooking_bg.png" alt="landingpage_gradient" className={styles.BackgroundImage} />

      </div>

      

      <div className={styles.AnouncementBannerContainer}>
        <AnouncementBanner />
      </div>

      <div className={styles.CardsContainer}>
        <Card1 />
        <Card2 />
       
      </div>
      <Footer />
  
    </div>
  )
}

export default PAGENAME
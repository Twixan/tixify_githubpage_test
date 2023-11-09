// authenticated scanner page for tickets
'use client'

import React, {useState, useRef, useEffect} from 'react'
import styles from './styles.scan.module.css'

import {Chip} from "@nextui-org/react";


import Scanner from './components_scanner/Scanner.jsx'
import ScannerHeader from './components_scanner/HeaderScanner.jsx'

export default function ScanningPage() {
    const [scanned, setScanned] = useState(false)
    const [loadingData, setLoadingData] = useState(false)
    const [loading, setLoading] = useState(false)

    const [serverStatus, setServerStatus] = useState(false)

    const RedColorBadge = 'bg-red-100 text-red-800 border-red-400'
    const GreenColorBadge = 'bg-green-100 text-green-800 border-green-400'

    const GreenText = 'Ticket server online'
    const RedText = 'Ticket server offline'

    const [serverStatusBadge, setServerStatusBadge] = useState(GreenColorBadge)
    const [serverStatusText, setServerStatusText] = useState(GreenText)

    useEffect(() => {
        if(serverStatus) {
            setServerStatusBadge(GreenColorBadge);
            setServerStatusText(GreenText);
        } else {
            setServerStatusBadge(RedColorBadge);
            setServerStatusText(RedText);
        }
    }, [serverStatus]);


    return (
        <div className={styles.ScanningPageContainer}>
            <div className={styles.HeaderContainer}>
                <ScannerHeader />

            </div>

            <div className={styles.ScanContainer}>
                <div className={styles.ScannerServerStatus}>
                   <span className={`${GreenColorBadge} text-xs font-small px-8.5 py-0.5 rounded border pl-2 pr-2 ml-3`}>Ticket server online</span>
                </div>

                <Scanner />

            </div>


            <div className={styles.FooterContainer}>

            </div>
            
        </div>
    )
}
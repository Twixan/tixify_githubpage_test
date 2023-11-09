import React, { useRef, useState, useEffect } from 'react';
import QrScanner from 'qr-scanner';

import styles from './styles/styles.scanner.module.css';

import ScannerIcon from './ScannerIcon.jsx';

const Scanner = () => {
    const fileInputRef = useRef(null);
    const [logs, setLogs] = useState([]);
    const [scannedImage, setScannedImage] = useState(null); // Add this line

    useEffect(() => {
    const originalConsoleLog = console.log;
    console.log = (...args) => {
        originalConsoleLog(...args);
        setLogs(prevLogs => [...prevLogs, args.join(' ')]);
    };
    }, []);

    const handleScanButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            QrScanner.scanImage(file)
                .then(result => {
                    console.log('QR code data:', result);
        
                        const url = new URL(result);
                        url.searchParams.append('api_key', 'tix_v0sd9f9idkakfinsdszmv9');
                        fetchUpdatedURL(url.href);
                    })
                        .catch(error => {
                            console.error('No QR code found', error);
                        });
                }
            };
            

    const fetchUpdatedURL = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            // Handle the data from the GET request as needed
            console.log(data);
        } catch (error) {
            console.error('Failed to fetch the URL', error);
        }
    };

    return (
        <div className={styles.ScannerWrapper}>
        <div className={styles.ScannerIcon}>
            <ScannerIcon />
        </div>
        <div className={styles.ScannerText}>
            <h1 className={styles.ScannerText}>Scan the ticket QR code</h1>
        </div>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
            />
            {/* ... your button element */}
            <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mt-8"
                onClick={handleScanButtonClick} // Call the function when the button is clicked
            >
                Scan QR code
                <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </button>
                  <div className="debug-console">
                {logs.map((log, index) => (
                    <div className="text-white" key={index}>{log}</div>
                ))}
                {scannedImage && (
                    <img src={scannedImage} className={styles.ImageSize} alt="Scanned QR" />
                )}
            </div>
        </div>
    );
};

export default Scanner;

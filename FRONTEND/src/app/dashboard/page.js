'use client'

import React, { useState, useEffect } from 'react';
import styles from './styles.dashboard.module.css'
import dynamic from 'next/dynamic'

import axios from 'axios';

import LoadingSpinner from '../components_web/LoadingSpinner.jsx';
import PurchaserTable from '../components_web/PurchaserTable'; 


const TotalSalesChart = dynamic(
    () => import('../components_web/charts/TotalSalesChart.jsx'),
    { ssr: false }
);

const TotalSalesCounterEndpoint = 'https://tixify-production.up.railway.app/total/revenue'

const fetchTotalSales = async () => {
    
    try {
        const response = await axios.get(TotalSalesCounterEndpoint);
        return response.data.total_revenue;
    } catch (error) {
        console.error(error);
    }
}

const ActiveTicketsCountEndpoint = 'https://tixify-production.up.railway.app/total/sales'

const fetchActiveTicketsCount = async () => {
    try {
        const response = await axios.get(ActiveTicketsCountEndpoint);
        return response.data.active_tickets_count;
    } catch (error) {
        console.error(error);
    }
}


export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [totalSales, setTotalSales] = useState(null);
    const [activeTicketsCount, setActiveTicketsCount] = useState(null);

    useEffect(() => {
        setIsLoading(true); // Set loading to true before fetch starts
        fetchTotalSales().then(data => {
            setTotalSales(data);
            setIsLoading(false); // Set loading to false when fetch is complete
        });

        fetchActiveTicketsCount().then(data => {
            setActiveTicketsCount(data);
        });
    }, []);

    useEffect(() => {
        setIsLoading(true); // Set loading to true before fetch starts
        fetchTotalSales().then(data => {
            setTotalSales(data);
            setIsLoading(false); // Set loading to false when fetch is complete
        });
    }, []);

    return (
        <div className={styles.DashboardContainer}> 
            <div className={styles.Header}>
                Celebration Connect nigga
            </div>
            
            <div className={styles.SalesChartContainer}>
                <TotalSalesChart />
            </div>
    
            <div className={styles.PurchaserTableContainer}>
                <PurchaserTable /> {/* Use the PurchaserTable component */}
            </div>
    
            <div className={styles.SalesCounter}>
                <h1>
                    {totalSales}
                    {isLoading && < div className={styles.SalesCounterLoader}>
                        < LoadingSpinner />
                    </div>}
                </h1>
            </div>
        </div>
    )
}
'use client'

import { createClient } from '@supabase/supabase-js'

import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'



const SUPABASE_TOKEN_URL = 'https://lvrpwceetvgdwpzjidxm.supabase.co'
const SUPABASE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2cnB3Y2VldHZnZHdwemppZHhtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5ODc1NTIxOSwiZXhwIjoyMDE0MzMxMjE5fQ.rZ5dXoI3MR-lrXFJHLD_VqEQRMJmOI4KUX6lZ0ycHGs'
const supabase = createClient(SUPABASE_TOKEN_URL, SUPABASE_TOKEN)

const TotalSalesChart = () => {

    const [data, setData] = useState([])
    const [series, setSeries] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let { data: rows, error } = await supabase
                .from('active_tickets')
                .select('created_at')
                .order('created_at', { ascending: true })
    
            if (error) console.log("error", error)
            else setData(rows)
    
            const counts = rows.reduce((acc, row) => {
                const date = new Date(row.created_at).toISOString().split('T')[0]
                acc[date] = (acc[date] || 0) + 1
                return acc
            }, {})
    
            // Convert the data to the format needed by the chart
            const seriesData = Object.entries(counts).map(([date, count]) => ({ x: date, y: count }))
    
            // Update the series state
            setSeries([{ name: 'Total Sales', data: seriesData }])
        }
    
        fetchData()
    }, [])

    const options = {
        chart: {
            id: 'area-chart',
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            },
            events: {
                click: function(chartContext, {x, y}) {
                    return false;
                }
            }
        },
        xaxis: {
            type: 'datetime',
            labels: {
                show: true,
                datetimeFormatter: {
                    day: 'dd MMM',
                },
            },
        },
        yaxis: {
            labels: {
                show: false
            },
        },
        grid: {
            show: false
        },
        tooltip: {
            enabled: false
        },
        stroke: {
            colors: ['#703df1'],
            width: 1.5
        },
        fill : {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                gradientToColors: ['#7a51e0'],
                shadeIntensity: 1,
                type: 'vertical',
                opacityFrom: 0.3,
                opacityTo: 0.5,
                stops: [0, 100]
            }
        }
    };

    return (
        <div className="border border-red-200">
          <Chart options={options} series={series} type="area" height={300} width={1200} />
        </div>
    )
}

export default TotalSalesChart
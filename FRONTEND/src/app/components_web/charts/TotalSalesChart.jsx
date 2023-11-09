'use client'

import React from 'react'
import Chart from 'react-apexcharts'

const TotalSalesChart = () => {
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
                    return False;
                }
            }
        },
        xaxis: {
            labels: {
                show: false
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

    const series = [
        {
            name: 'Total Sales',
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
    ];

    return (
        <div className="border border-red-200">
          <Chart options={options} series={series} type="area" height={300} width={1200} />
        </div>
    )
}

export default TotalSalesChart
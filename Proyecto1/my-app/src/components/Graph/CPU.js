import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from 'axios'
import { useEffect, useState } from 'react'

ChartJS.register(ArcElement, Tooltip, Legend);

var usado = 0;
var libre = 0;

var options = {
    responsive : true,
    maintainAspectRatio: false,
};

export default function Pies() {
    const [cpuData, setCpuData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/cpu')
        .then(respuesta => {
        setCpuData(respuesta.data.data)
        usado = respuesta.data.data.cpu_usage;
        libre = 100 - usado;
        console.log(respuesta.data.data.process);
        })
        .catch(error => {
        console.log(error)
        });

    }, [])

    var data = {
        labels: ['Usado', 'Libre'],
        datasets: [
            {
                label: 'Popularidad en Navidad',
                data: [usado, libre],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return <Pie data={data} options={options} />
}
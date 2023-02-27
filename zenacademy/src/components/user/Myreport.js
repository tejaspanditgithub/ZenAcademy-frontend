import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar, Chart } from "react-chartjs-2";
import { Box } from "@mui/material";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function Myreport() {
    const labels = ['Java', 'React', 'C', 'Cpp', 'Angular', 'node js', 'python'];
    const data = {
        labels: labels,
        datasets: [{
            label: 'Skills Dataset(panel member)',
            data: [5, 4, 2, 1, 3, 1, 4],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 1
        }]
    };
    return (
        <>
            <h2 style={{ padding: '8px', marginTop: '10px', color: "#2C3333", fontSize: "30Px", textAlign: "center" }}>
                My Reports
            </h2>
            <Box style={{ width: "50%", marginTop: '5%',marginLeft: '20%', padding: '8px', itemAlign: "center" }}>
                <Bar data={data} style={{ fontSize: '100px' }} />
            </Box>
        </>
    );
}

export default Myreport;
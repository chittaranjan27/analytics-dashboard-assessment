import React, { useState, useEffect } from "react";
import { Grid, Box, Typography, Card, CardContent } from "@mui/material";
import { Line } from "react-chartjs-2";
import TopMetrics from "../components/TopMetrics";
import WordCloudChart from "../components/WordCloudChart";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = ({ data }) => {
  const [evUsageData, setEvUsageData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    if (data.length > 0) {
      analyzeEvUsage(data);
    }
  }, [data]);

  // Function to process EV data and prepare chart values
  const analyzeEvUsage = (data) => {
    const usageCount = { BEV: {}, PHEV: {} };

    data.forEach((row) => {
      const year = row["Model Year"];
      const vehicleType = row["Electric Vehicle Type"];

      // Exclude 2024 values
      if (year && year !== "2024") {
        if (vehicleType === "Battery Electric Vehicle (BEV)") {
          usageCount.BEV[year] = (usageCount.BEV[year] || 0) + 1;
        } else if (vehicleType === "Plug-in Hybrid Electric Vehicle (PHEV)") {
          usageCount.PHEV[year] = (usageCount.PHEV[year] || 0) + 1;
        }
      }
    });

    const labels = [
      ...new Set([
        ...Object.keys(usageCount.BEV),
        ...Object.keys(usageCount.PHEV),
      ]),
    ];

    const valuesBEV = labels.map((year) => usageCount.BEV[year] || 0);
    const valuesPHEV = labels.map((year) => usageCount.PHEV[year] || 0);

    setEvUsageData({
      labels,
      datasets: [
        {
          label: "Battery Electric Vehicle (BEV)",
          data: valuesBEV,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.4)",
          fill: true,
        },
        {
          label: "Plug-in Hybrid Electric Vehicle (PHEV)",
          data: valuesPHEV,
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.4)",
          fill: true,
        },
      ],
    });
  };

  // Chart options
  const chartOptions = {
    plugins: {
      legend: {
        labels: { color: "#fff5ff" },
      },
    },
  };

  return (
    <>
      {/* Top KPIs / Metrics Section */}
      <TopMetrics />

      {/* Main Content Section */}
      <Box sx={{ padding: "1em", mt: "1em" }}>
        <Grid container spacing={2} sx={{ height: "100%" }}>
          {/* EV Usage Chart */}
          <Grid item xs={12} sm={6}>
            <Card
              sx={{
                minHeight: "300px",
                height: "100%",
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                {evUsageData.labels.length > 0 ? (
                  <Line data={evUsageData} options={chartOptions} />
                ) : (
                  <Typography variant="body2">Loading data...</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Word Cloud + Market Share */}
          <Grid item xs={12} sm={6}>
            <Card
              sx={{
                minHeight: "300px",
                height: "100%",
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}
                >
                  Market Share in 2023
                </Typography>
                <WordCloudChart data={data} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;

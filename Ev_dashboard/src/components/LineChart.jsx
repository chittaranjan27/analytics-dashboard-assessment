import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ data }) => {
  const [teslaModelYearData, setTeslaModelYearData] = useState({});
  const [selectedMake, setSelectedMake] = useState('TESLA');
  const [uniqueMakes, setUniqueMakes] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      console.log("in linechart")
      analyzeDataByModelYear(data);
      setUniqueMakes([...new Set(data.map(row => row['Make']))]);
    }
  }, [data]);

  // Update charts when the county/year is selected
  useEffect(() => {
    if (data.length > 0) {
      analyzeDataByModelYear(data);
    }
  }, [selectedMake]);


  const analyzeDataByModelYear = (data) => {
    const modelYearCount = data
      .filter(row => row['Make'] === selectedMake)
      .reduce((acc, row) => {
        const modelYear = row['Model Year'];
        if (modelYear) {
          acc[modelYear] = (acc[modelYear] || 0) + 1;
        }
        return acc;
      }, {});

    setTeslaModelYearData(modelYearCount);
  };

  const chartData = {
    labels: Object.keys(teslaModelYearData).sort((a, b) => a - b), // Sort years
    datasets: [
      {
        label: 'Number of '+selectedMake+' Vehicles by Model Year',
        data: Object.keys(teslaModelYearData).sort((a, b) => a - b).map(year => teslaModelYearData[year]),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.4)',
        fill: false,
        tension: 0.1, 
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',  
        labels: {
          color: '#fff5ff', 
        } 
      },
      title: {
        display: true,
        text: 'Vehicles by Model Year',
        color: '#fff5ff',  
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Model Year',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Count',
        },
      },
    },
  };

  return (
    <Box sx={{ padding: '1em' }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <FormControl fullWidth sx={{ width:'50%' }}>
            <InputLabel id="makeId" sx={{color:'#ccc'}}>Filter by Make</InputLabel>
            <Select
              value={selectedMake}
              onChange={(e) => setSelectedMake(e.target.value)}
              label="Filter by Make"
              sx = {{ border: '1px solid #ccc', minWidth: '20em' , backgroundColor:'#6a78b2'}}
              labelId="makeId"
            >
              {uniqueMakes.map((make, index) => (
                <MenuItem key={index} value={make}>
                  {make}
                </MenuItem>
              ))}
          </Select>
          </FormControl>
      </Box>
      <Box sx={{ padding: '1em' }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Card sx={{ minHeight: '300px' }}>
              <CardContent>
                {Object.keys(teslaModelYearData).length > 0 ? (
                  <Line data={chartData} options={options} />
                ) : (
                  <p>Loading data...</p>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default LineChart;

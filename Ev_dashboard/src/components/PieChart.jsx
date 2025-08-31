import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Box, Card, CardContent, Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const [vehicleTypeAnalysis, setVehicleTypeAnalysis] = useState({});
  const [cafvAnalysis, setCafvAnalysis] = useState({});
  const backgroundColor = ['#4BC0C0', '#324b4b', '#95b1b0', '#a0acea', '#6a78b2'];
  const hoverBackgroundColor = ['#4BC0C0', '#324b4b', '#95b1b0', '#a0acea', '#6a78b2'];
  const [selectedCounty, setSelectedCounty] = useState('');
  const [uniqueCounties, setUniqueCounties] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [uniqueYears, setUniqueYears] = useState([]);
  const [selectedMake, setSelectedMake] = useState('');
  const [uniqueMakes, setUniqueMakes] = useState([]);

  useEffect(() => {
    
    if (data.length > 0) {
      analyzeDataByVehicleType(data);
      analyzeCafvData(data);
      setUniqueCounties([...new Set(data.map(row => row['County']))]);
      setUniqueYears([...new Set(data.map(row => row['Model Year']))]);
      setUniqueMakes([...new Set(data.map(row => row['Make']))]);
    }
  }, [data]);

  // Update charts when the county/year is selected
  useEffect(() => {
    if (data.length > 0) {
      analyzeDataByVehicleType(data);
      analyzeCafvData(data);
    }
  }, [selectedCounty, selectedYear, selectedMake]);

  const analyzeDataByVehicleType = (data) => {
    const filteredData = data.filter(row => 
      (selectedCounty ? row['County'] === selectedCounty : true) &&
      (selectedYear ? row['Model Year'] === selectedYear : true) &&
      (selectedMake ? row['Make'] === selectedMake : true)
    );
  
    const vehicleTypeCount = filteredData.reduce((acc, row) => {
      const vehicleType = row['Electric Vehicle Type'];
      if (vehicleType) {
        acc[vehicleType] = (acc[vehicleType] || 0) + 1;
      }
      return acc;
    }, {});
    setVehicleTypeAnalysis(vehicleTypeCount);
  };

  const analyzeCafvData = (data) => {
    const filteredData = data.filter(row => 
      (selectedCounty ? row['County'] === selectedCounty : true) &&
      (selectedYear ? row['Model Year'] === selectedYear : true) &&
      (selectedMake ? row['Make'] === selectedMake : true)
    );

    const cafvCount = filteredData.reduce((acc, row) => {
      const cafvType = row['Clean Alternative Fuel Vehicle (CAFV) Eligibility'];
      if (cafvType) {
        acc[cafvType] = (acc[cafvType] || 0) + 1;
      }
      return acc;
    }, {});
    setCafvAnalysis(cafvCount);
  };


  const vehicleTypeChartData = {
    labels: Object.keys(vehicleTypeAnalysis),
    datasets: [
      {
        data: Object.values(vehicleTypeAnalysis),
        backgroundColor: backgroundColor,
        hoverBackgroundColor: hoverBackgroundColor,
      },
    ],
  };

  const cafvChartData = {
    labels: Object.keys(cafvAnalysis),
    datasets: [
      {
        data: Object.values(cafvAnalysis),
        backgroundColor: backgroundColor,
        hoverBackgroundColor: hoverBackgroundColor,
      },
    ],
  };

  return (
    <Box sx={{ padding: '1em' }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <FormControl fullWidth sx={{ width:'33%' }} >
     
        <InputLabel id="countyId" sx={{color:'#ccc'}}>Filter by County</InputLabel>
          <Select
            value={selectedCounty}
            onChange={(e) => setSelectedCounty(e.target.value)}
            label="Filter by County"
            sx = {{ border: '1px solid #ccc', minWidth: '20em', backgroundColor:'#6a78b2' }}
            labelId="countyId"
          > 
            <MenuItem value="">
              <em>All Counties</em>
            </MenuItem>
            {uniqueCounties.map((county, index) => (
              <MenuItem key={index} value={county}>
                {county}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <FormControl fullWidth sx={{ width:'33%' }}>
          <InputLabel id="yearId" sx={{color:'#ccc'}}>Filter by Year</InputLabel>
          <Select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            label="Filter by Year"
            sx = {{ border: '1px solid #ccc', minWidth: '20em', backgroundColor:'#6a78b2'}}
            labelId="yearId"
          >
            <MenuItem value="">
              <em>All Model Years</em>
            </MenuItem>
            {uniqueYears.map((year, index) => (
              <MenuItem key={index} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ width:'33%' }}>
          <InputLabel id="makeId" sx={{color:'#ccc'}}>Filter by Make</InputLabel>
          <Select
            value={selectedMake}
            onChange={(e) => setSelectedMake(e.target.value)}
            label="Filter by Make"
            sx = {{ border: '1px solid #ccc', minWidth: '20em' , backgroundColor:'#6a78b2'}}
            labelId="makeId"
          >
            <MenuItem value="">
              <em>All Makes</em>
            </MenuItem>
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
        <Grid item xs={12} sm={6} md={6} >
        <Card sx={{ minHeight: '300px' }}>
            <CardContent sx={{ height:'100%', justifyContent: 'center', alignItems: 'center' }}>
                {Object.keys(vehicleTypeAnalysis).length > 0 ? (
                    <Pie data={ vehicleTypeChartData } options={{ plugins: { legend: { position: 'top', labels: { color: '#fff5ff'}}}, maintainAspectRatio: false }} height={300} />
                ) : (
                    <p>Loading data...</p>
                )}
            </CardContent>
        </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Card sx={{ minHeight: '300px' }}>
            <CardContent sx={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
              {Object.keys(cafvAnalysis).length > 0 ? (
                <Pie data={cafvChartData} options={{ plugins: { legend: { position: 'top', labels: { color: '#fff5ff'} } }, maintainAspectRatio: false }} height={300} />
              ) : (
                <p>Loading CAFV data...</p>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
    </Box>
  );
};

export default PieChart;

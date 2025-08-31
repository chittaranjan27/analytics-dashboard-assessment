import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Bar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,       
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({data}) => {

  const [countyAnalysis, setcountyAnalysis] = useState({});
  const [makeAnalysis, setMakeAnalysis] = useState({});
  const [vehicleTypeAnalysis, setVehicleTypeAnalysis] = useState({});
  const [selectedCounty, setSelectedCounty] = useState('');
  const [uniqueCounties, setUniqueCounties] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [uniqueYears, setUniqueYears] = useState([]);
  const [selectedMake, setSelectedMake] = useState('');
  const [uniqueMakes, setUniqueMakes] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      analyzeDataByCounty(data); // Call analyzeData only if data is available
      analyzeDataByMake(data);
      analyzeDataByVehicleType(data);
      setUniqueCounties([...new Set(data.map(row => row['County']))]);
      setUniqueYears([...new Set(data.map(row => row['Model Year']))]);
      setUniqueMakes([...new Set(data.map(row => row['Make']))]);
    }
  }, [data]);

  // Update charts when the county/year is selected
  useEffect(() => {
    if (data.length > 0) {
      analyzeDataByCounty(data);
      analyzeDataByMake(data);
      analyzeDataByVehicleType(data);
    }
  }, [selectedCounty, selectedYear, selectedMake]);

  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: '#fff5ff', 
        },
      },
    }
  };

const analyzeDataByCounty = (data) => {
  const filteredData = data.filter(row => 
    (selectedYear ? row['Model Year'] === selectedYear : true) &&
    (selectedMake ? row['Make'] === selectedMake : true)
  );

  const countyCount = filteredData.reduce((acc, row) => {
    const county = row['County'];
    if (county) {
      acc[county] = (acc[county] || 0) + 1;
    }
    return acc;
  }, {});
  
  setcountyAnalysis(countyCount);

  console.log('County Analysis:', countyCount); 
};

  // Prepare chart data
  const chartDataCounty = {
    labels: Object.keys(countyAnalysis),  
    datasets: [{
      label: 'Number of Electric Vehicles by County',
      data: Object.values(countyAnalysis),  // Count of vehicles by state
      //backgroundColor: 'rgba(75, 192, 192, 0.6)',
      backgroundColor: Object.keys(countyAnalysis).map(county => 
        (county === selectedCounty || selectedCounty === "") ?  'rgba(75, 192, 192, 0.6)' : 'rgba(50,75,75, 0.6)' 
      ),
    }],
  };


const analyzeDataByMake = (data) => {
  const filteredData = data.filter(row => 
    (selectedCounty ? row['County'] === selectedCounty : true) &&
    (selectedYear ? row['Model Year'] === selectedYear : true)
  );

  const makeCount = filteredData.reduce((acc, row) => {
    const make = row['Make'];
    if (make) {
      acc[make] = (acc[make] || 0) + 1;
    }
    return acc;
  }, {});
  setMakeAnalysis(makeCount);
  console.log(makeCount);
};

  // Prepare chart data
  const chartDataMake = {
    labels: Object.keys(makeAnalysis),  // Make
    datasets: [{
      label: 'Number of Electric Vehicles by Make',
      data: Object.values(makeAnalysis),  // Count of vehicles by state
      backgroundColor: Object.keys(makeAnalysis).map(make => 
        (make === selectedMake || selectedMake === "") ?  'rgba(75, 192, 192, 0.6)' : 'rgba(50,75,75, 0.6)' 
      ),
    }],

  };

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

  const chartDataVehicleType = {
    labels: Object.keys(vehicleTypeAnalysis),
    datasets: [{
      label: 'Number of Electric Vehicles by Type',
      data: Object.values(vehicleTypeAnalysis),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    }],
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
            <CardContent>
              {Object.keys(countyAnalysis).length > 0 ? (
                <Bar data={chartDataCounty} options={chartOptions} />
              ) : (
                <p>Loading data...</p>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={6}>
          <Card sx={{ minHeight: '300px' }}>
            <CardContent>
              {Object.keys(makeAnalysis).length > 0 ? (
                <Bar data={chartDataMake} options={chartOptions} />
              ) : (
                <p>Loading data...</p>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={6}>
          <Card sx={{ minHeight: '300px' }}>
            <CardContent>
              {Object.keys(vehicleTypeAnalysis).length > 0 ? (
                <Bar data={chartDataVehicleType} options={chartOptions} />
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

export default Chart;
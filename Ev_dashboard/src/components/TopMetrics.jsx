import React from 'react';
import { Grid, Card, Typography } from '@mui/material';

const metrics = [
  { label: 'State', value: 'Washington', change: '50000+ EV users' },
  { label: 'Most Used Electric Utility', value: 'Puget Sound Energy', change: '24K+ users' },
  { label: 'Most EV Users In', value: 'Seattle', change: '10427+' },
  { label: 'Most Used Make in 2023', value: 'Tesla', change: 'Model Y' },
];

const TopMetrics = () => (
  <>

<Grid container spacing={3} py={3}>
{metrics.map((metric, index) => (
  <Grid item xs={12} sm={6} md={3} key={index}>
    <Card
      sx={{
        padding: '1em',
        backgroundColor: '#1E2230',
        color: 'white',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between', 
        height: '100%', 
        boxShadow: '0 0 15px rgba(60, 70, 101, 0.5)',

      }}
    >
      <Typography variant="h6" sx={{ flexGrow: 1, display: 'flex' }}>
        {metric.label}
      </Typography>
      <Typography variant="h5" sx={{ flexGrow: 1, display: 'flex', fontWeight:'bold' }}>
        {metric.value}
      </Typography>
      <Typography variant="body2" color="success" sx={{ flexGrow: 1, display: 'flex'  }}>
        {metric.change}
      </Typography>
    </Card>
  </Grid>
))}
</Grid>
</>
);

export default TopMetrics;

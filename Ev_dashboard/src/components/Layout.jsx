import React from 'react';
import { AppBar, Drawer, Toolbar, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();

  const getListItemStyle = (path) => ({
    backgroundColor: location.pathname === path ? '#95b1b0' : 'transparent',
    borderRadius: '4px', 
    boxShadow: location.pathname === path ? '0 5px 5px rgba(60, 70, 101, 1)' : '0',
  });

  return (
    <div style={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box', backgroundColor: '#181C24', color: 'white' },
        }}
      >
        <Toolbar sx={{backgroundColor:'#6a78b2'}}>
            <Typography variant="h6" noWrap component="div" >
              Dashboard Charts
            </Typography>
        </Toolbar>
        <List >
          <ListItem button component={Link} to="/" sx={getListItemStyle('/')}>
            <ListItemText primary="Home" primaryTypographyProps={{fontWeight:'bold'}} />
          </ListItem>
          <ListItem button component={Link} to="/chart" sx={getListItemStyle('/chart')}>
            <ListItemText primary="Bar Chart" primaryTypographyProps={{fontWeight:'bold'}} />
          </ListItem>
          <ListItem button component={Link} to="/piechart" sx={getListItemStyle('/piechart')}>
            <ListItemText primary="Pie Chart" primaryTypographyProps={{fontWeight:'bold'}} />
          </ListItem>
          <ListItem button component={Link} to="/linechart" sx={getListItemStyle('/linechart')}>
              <ListItemText primary="Line Chart" primaryTypographyProps={{fontWeight:'bold'}} />
          </ListItem>
        </List>
      </Drawer>

      <div style={{ flexGrow: 1, padding: '20px' }}>
        <AppBar position="static" sx={{ backgroundColor: '#181C24', boxShadow: '0 0 15px rgba(60, 70, 101, 0.5)' }}>
          <Toolbar>
            <Typography variant="h6" noWrap component="div" sx={{fontWeight:'bold'}}>
              Electric Vehicle Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Layout;

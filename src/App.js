import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import logo from './resources/logo.png';
import LandForm from './components/LandForm';

const useStyles = makeStyles(theme => ({
  App: {
    textAlign: 'center',
  },  
  AppLogo: {
    height: '6rem',
    pointerEvents: 'none',
  },
  AppHeader: {
    backgroundColor: '#282c34',
  minHeight: '10vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  },
}));

function App() {
  const classes = useStyles();
  return (    
    <div className={classes.App}>
      <header className={classes.AppHeader}>
        <img src={logo} className={classes.AppLogo} alt="logo" />
        <Typography className={classes.heading} component="h3" variant="h3">
            Rainwater Harvesting Potential
        </Typography>
      </header>
      <Container maxWidth="sm">
        <LandForm />
      </Container>      
    </div>
  );
}

export default App;

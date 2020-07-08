import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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
  heading: {
    margin: '1em 0'
  }
}));

function App() {
  const classes = useStyles();
  return (    
    <div className={classes.App}>
      <Container maxWidth="sm">
        <LandForm />
      </Container>      
    </div>
  );
}

export default App;

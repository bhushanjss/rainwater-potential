import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card, CardContent, Typography, Grid} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import WavesIcon from '@material-ui/icons/Waves';
import LandscapeIcon from '@material-ui/icons/Landscape';
import PinDropIcon from '@material-ui/icons/PinDrop';

const useStyles = makeStyles(theme => ({
    backButton: {
        float: 'left'
    },
    card: {
        margin: '2em 0'
    },
    typography: {
        padding: '1em 0'
    },
  }));


export default function ShowResult(props) {
    const {area, areaUnit, volWaterRounded, waterUnit, coord} = props.data;
    const classes = useStyles();

    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <IconButton color="primary" className={classes.backButton} aria-label="back page" 
                    onClick={() => props.backpage()} component="span">
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography className={classes.typography} component="h5" variant="h5">
                        Rain Water Received (Yearly)
                    </Typography>
                    <Typography className={classes.typography} color="textSecondary">
                        <Grid item sm={12}><PinDropIcon fontSize="large" /></Grid>
                        <Grid item sm={12}><span className="text">{coord}</span></Grid>                        
                    </Typography>
                    <Typography className={classes.typography} color="textSecondary">
                        <Grid item sm={12}><WavesIcon fontSize="large" /></Grid>
                        <Grid item sm={12}><span className="text"> {volWaterRounded} {waterUnit}</span></Grid>
                    </Typography>
                    <Typography className={classes.typography} color="textSecondary">
                    <Grid item sm={12}><LandscapeIcon fontSize="large"/></Grid>
                    <Grid item sm={12}><span className="text"> {area} {areaUnit}</span></Grid>
                    </Typography>                    
                </CardContent>
            </Card>
        </div>
    )
}

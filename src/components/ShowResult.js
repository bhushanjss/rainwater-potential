import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card, CardContent, Typography, Grid} from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CloseIcon from '@material-ui/icons/Close';
import WavesIcon from '@material-ui/icons/Waves';
import LandscapeIcon from '@material-ui/icons/Landscape';
import PinDropIcon from '@material-ui/icons/PinDrop';
import bucketImgSrc from '../resources/water-tank.png';

const useStyles = makeStyles(theme => ({
    backButton: {
        float: 'left'
    },
    card: {
        margin: '2em 0'
    },
    typography: {
        padding: '1em 0',
        display: 'flex',
        justifyContent: 'space-between'
    },
    typographyIcon: {
        marginLeft: '2em'
    },
    media: {
        width: '4em',
        backgroundSize: 'contain',
        height: '4em'
      },
    icon: {
        fontSize: '4em',
    },
    flexView: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    volWaterTxt: {
        fontSize: '2em'
    }  
  }));

  

  const renderCoordinates = (props, classes) => {      
    const {data, stateSelected, district} = props;
    let location = '';
    console.log(JSON.stringify(stateSelected));
    if(district) {
        location = district + ', ' + stateSelected.state;
    } else if(stateSelected) {        
        location = stateSelected.state;
    } else {
        location = data.coord;
    }
    return (
        <Typography className={classes.typography} color="textSecondary">
            <PinDropIcon fontSize="large" className={classes.typographyIcon} />
            <span className="text">{location}</span>                        
        </Typography>
    )
  }


export default function ShowResult(props) {
    const classes = useStyles();
    const {area, areaUnit, volWaterRounded, waterUnit} = props.data;
   

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
                    <Typography className={classes.typography}>
                        {props.areaType}
                    </Typography>                    
                    {renderCoordinates(props, classes)}
                    <Typography className={classes.typography} color="textSecondary">
                        <LandscapeIcon fontSize="large" className={classes.typographyIcon} />
                        <span className="text"> {area} {areaUnit}</span>
                    </Typography>
                    <Typography className={classes.typography} color="textSecondary">
                        <WavesIcon fontSize="large" className={classes.typographyIcon} />
                        <span className="text"> {volWaterRounded} {waterUnit}</span>
                    </Typography>
                    
                    <Grid item sm={12} className={classes.flexView}>
                        <CardMedia
                            className={classes.media}
                            image={bucketImgSrc}
                            title="Bucket"
                        /> 
                        <CloseIcon className={classes.icon} />
                        <Typography className={classes.volWaterTxt}  variant="subtitle1" color="textSecondary">
                            { Math.round(volWaterRounded/1000) } 
                        </Typography>                           
                    </Grid>
                                                       
                </CardContent>
            </Card>
        </div>
    )
}

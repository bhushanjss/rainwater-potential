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
import bucketImgSrc from '../resources/water-tank.jpg';
import farmImgSrc from '../resources/wheat0.jpg';

const useStyles = makeStyles(theme => ({
    backButton: {
        float: 'left'
    },
    card: {
        margin: '2rem 0'
    },
    heading: {
        paddingBottom: '1rem',
        clear: 'left'
    },
    typography: {
        padding: '1em 0',
        display: 'flex',
        alignItems: 'center'
    },
    typographyIcon: {
        marginLeft: '4rem',
        marginRight: '6rem'
    },
    media: {
        float: 'left',
        marginLeft: '4rem',
        marginRight: '3rem',        
        backgroundSize: 'contain',
        width: '4rem',
        height: '4rem'
      },
    icon: {
        fontSize: '4rem',
        float: 'left',
        marginRight: '2rem'
    },
    flexView: {
        overflow: 'auto'
    },
    volWaterTxt: {
        fontSize: '2rem',
        float: 'left'
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
        <Typography className={classes.typography} component="div" color="textSecondary">
            <PinDropIcon fontSize="large" className={classes.typographyIcon} />
            <span className="text">{location}</span>                        
        </Typography>
    )
  }


export default function ShowResult(props) {
    const classes = useStyles();
    const {area, areaUnit, volWaterRounded, waterUnit} = props.data;   
    let imageSrc = props.areaType === 'Farm'? farmImgSrc : bucketImgSrc;

    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <IconButton color="primary" className={classes.backButton} aria-label="back page" 
                    onClick={() => props.backpage()} component="div">
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography className={classes.heading} component="h4" variant="h4">
                        Rainwater Received Yearly
                    </Typography>
                    <Typography className={classes.heading} component="h5" variant="h5">
                        {props.areaType}
                    </Typography>                   
                    {renderCoordinates(props, classes)}
                    <Typography className={classes.typography} component="div" color="textSecondary">
                        <LandscapeIcon fontSize="large" className={classes.typographyIcon} />
                        <span className="text"> {area} {areaUnit}</span>
                    </Typography>
                    <Typography className={classes.typography} component="div" color="textSecondary">
                        <WavesIcon fontSize="large" className={classes.typographyIcon} />
                        <span className="text"> {volWaterRounded} {waterUnit}</span>
                    </Typography>
                    
                    <Grid item sm={12} className={classes.flexView}>
                        <CardMedia
                            className={classes.media}
                            image={imageSrc}
                            title="Water"
                        /> 
                        <CloseIcon className={classes.icon} />
                        <Typography className={classes.volWaterTxt} component="div"  variant="subtitle1" color="textSecondary">
                            { Math.round(volWaterRounded/1000) } 
                        </Typography>                           
                    </Grid>
                                                       
                </CardContent>
            </Card>
        </div>
    )
}

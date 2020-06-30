import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { Grid, Button, Card, CardContent, InputLabel, MenuItem, FormControl, 
    Select  } from '@material-ui/core';  
import TextField from '@material-ui/core/TextField';  
import api from '../api';  
import ShowResult from './ShowResult';


const styles = theme => ({
    widthFull: {
        width: '100%'
    }
  });

class LandForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            landFormParams : {
                locationName: '',
                coords:'',
                length: '',
                lengthUnit: 'meter',
                width: '',
                widthUnit: 'meter',
                area: '' ,
                areaUnit: 'acre'
                               
            },
            result: null,
            resultValid: false
        }          
    }

    handleChange = (event) => {
        console.log(event);
        const key = event.target.id;
        console.log(key);
        switch(key) {
            case 'locationName':
                return this.setState({landFormParams: {...this.state.landFormParams, locationName: event.target.value}});
            case 'coords':
                return this.setState({landFormParams: {...this.state.landFormParams, coords: event.target.value}});
            case 'length':
                return this.setState({landFormParams: {...this.state.landFormParams, length: event.target.value}});
            case 'width':
                return this.setState({landFormParams: {...this.state.landFormParams, width: event.target.value}});                                    
            case 'area':
                return this.setState({landFormParams: {...this.state.landFormParams, area: event.target.value}});                                 
            default:
        }
        
    }

    handleAreaUnitChange = (event) => (
        this.setState({landFormParams: {...this.state.landFormParams, areaUnit: event.target.value}})
    );

    handleLenghtUnitChange = (event) => (
        this.setState({landFormParams: {...this.state.landFormParams, lengthUnit: event.target.value}})
    );

    handleWidthUnitChange = (event) => (
        this.setState({landFormParams: {...this.state.landFormParams, widthUnit: event.target.value}})
    );

    handleSubmit = async (event) => {
        event.preventDefault();
        console.log(this.state.landFormParams);
        const result = await api(this.state.landFormParams);   
        this.setState({result: result.data.message, resultValid: true});     
    }

    backPage = () => (
        this.setState({resultValid: false})
    );


    render() {    
        const { classes } = this.props;         
            if(this.state.resultValid) {
                return <ShowResult data={this.state.result} backpage={this.backPage.bind(this)} />
            } else {                
            return (<Card>
                <CardContent>
                    <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField className={classes.widthFull} label="Coordinates" id="coords" 
                                    value={this.state.landFormParams.coords} 
                                    onChange={this.handleChange.bind(this)}  />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField className={classes.widthFull} label="Location" id="locationName" 
                                value={this.state.landFormParams.locationName} 
                                onChange={this.handleChange.bind(this)}  /> 
                            </Grid>          
                            <Grid item xs={12}>
                                <TextField className={classes.widthFull}  label="Area" id="area" 
                                    value={this.state.landFormParams.area} onChange={this.handleChange.bind(this)}  
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"/>
                            </Grid>
                            <Grid item xs={12}>
                            <FormControl id="area-unit" className={classes.widthFull}>
                                <InputLabel id="areaUnit-select-label">Area Unit</InputLabel>
                                <Select
                                    labelId="areaUnit-select-label"
                                    id="areaUnit"
                                    value={this.state.landFormParams.areaUnit}
                                    onChange={this.handleAreaUnitChange.bind(this)} >
                                    <MenuItem value={'hectare'}>Hectares</MenuItem>
                                    <MenuItem value={'acre'}>Acres</MenuItem>
                                    <MenuItem value={'sqm'}>Square Meters</MenuItem>
                                    <MenuItem value={'sqkm'}>Square Kilometers</MenuItem>
                                    <MenuItem value={'sqmi'}>Square Miles</MenuItem>
                                </Select>
                            </FormControl>
                            </Grid>                 
                            <Grid item xs={12}>
                                <TextField className={classes.widthFull} label="Length" id="length" 
                                    value={this.state.landFormParams.length} onChange={this.handleChange.bind(this)}  
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"/>
                            </Grid> 
                            <Grid item xs={12}>
                            <FormControl className={classes.widthFull}>
                                <InputLabel id="lengthUnit-select-label">Length Unit</InputLabel>
                                <Select
                                    labelId="lengthUnit-select-label"
                                    id="lengthUnit"
                                    value={this.state.landFormParams.lengthUnit}
                                    onChange={this.handleLenghtUnitChange.bind(this)} >
                                    <MenuItem value={'meter'}>Meter</MenuItem>
                                    <MenuItem value={'feet'}>Feet</MenuItem>
                                    <MenuItem value={'km'}>Kilo Meter</MenuItem>
                                    <MenuItem value={'mile'}>Mile</MenuItem>
                                </Select>
                            </FormControl>
                            </Grid> 
                            <Grid item xs={12}>
                                <TextField className={classes.widthFull} label="Width" id="width" 
                                    value={this.state.landFormParams.width} onChange={this.handleChange.bind(this)}  
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"/>
                            </Grid> 
                            <Grid item xs={12}>
                            <FormControl className={classes.widthFull}>
                                <InputLabel id="lengthUnit-select-label">Width Unit</InputLabel>
                                <Select
                                    labelId="lengthUnit-select-label"
                                    id="widthUnit"
                                    value={this.state.landFormParams.widthUnit}
                                    onChange={this.handleWidthUnitChange.bind(this)} >
                                    <MenuItem value={'meter'}>Meter</MenuItem>
                                    <MenuItem value={'feet'}>Feet</MenuItem>
                                    <MenuItem value={'km'}>Kilo Meter</MenuItem>
                                    <MenuItem value={'mile'}>Mile</MenuItem>
                                </Select>
                                </FormControl>
                            </Grid>                            
                            <Grid item xs={12}><Button variant="contained" type="Submit" color="primary">Submit</Button></Grid>                    
                        </Grid>
                    </form>
                </CardContent>            
            </Card>);
            }                               
        }
}

export default withStyles(styles)(LandForm);

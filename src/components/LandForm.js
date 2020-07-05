import React, { Component } from 'react';
import {find, propEq} from 'ramda';
import { withStyles } from '@material-ui/styles';
import { Grid, Button, Card, CardContent, InputLabel, MenuItem, FormControl, 
    Select, Divider  } from '@material-ui/core';  
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import TextField from '@material-ui/core/TextField';  
import api from '../api';  
import ShowResult from './ShowResult';
import statesDist from '../resources/state-districts.json';


const styles = theme => ({
    widthFull: {
        width: '100%',
        margin: '2em 0'
    },
    coords: {
        display: 'flex'
    },
    divider: {
        margin: '2em 0'
    }
  });

class LandForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            landFormParams : {
                areaType:'farm',
                locationName: '',
                coords:'',
                length: '',
                lengthUnit: 'meter',
                width: '',
                widthUnit: 'meter',
                area: '' ,
                areaUnit: 'acre'
                               
            },
            stateSelected: '',
            selectedState: {},
            district: '',
            districtList: [],
            result: null,
            resultValid: false
        }          
    }

    componentDidMount() {   
    }

    detectMyLocation = () => {
        navigator.geolocation.getCurrentPosition( pos => {
            let lat = pos.coords.latitude;
            let lng = pos.coords.longitude;
            lat = Math.round(lat*100)/100;
            lng = Math.round(lng*100)/100;            
            this.setState({landFormParams: {...this.state.landFormParams, coords:`${lat},${lng}` }});
        });
    }

    handleChange = (event) => {
        console.log(event);
        const key = event.target.id;
        console.log(key);
        switch(key) {
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

    handleStateChange = (event) => {
        const selectedStateDetails = find(propEq('id', event.target.value), statesDist);
        if(selectedStateDetails.coords) {
            return this.setState({stateSelected: event.target.value, selectedStateDetails: selectedStateDetails, landFormParams: 
                {...this.state.landFormParams, coords: selectedStateDetails.coords, districtList: []}});
        }
        return this.setState({stateSelected: event.target.value, selectedStateDetails: selectedStateDetails,
             districtList: selectedStateDetails.districtData});
    };

    handleDistrictChange = (event) => {
        const selectedDist = find(propEq('id', event.target.value), this.state.districtList);
        const coords = selectedDist.coords;
        this.setState({district: event.target.value,landFormParams: {...this.state.landFormParams, coords: coords}});
        if(!coords) {
            console.log(`Coords Not found for District: ${selectedDist.name}`);
        }        
    }

    handleAreaUnitChange = (event) => (
        this.setState({landFormParams: {...this.state.landFormParams, areaUnit: event.target.value}})
    );

    handleAreaTypeChange = (event) => (
        this.setState({landFormParams: {...this.state.landFormParams, areaType: event.target.value}})
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

    renderDistrict = () => {
        const { classes } = this.props;
        if(this.state.districtList[0]) {
            return (
                <FormControl id="district-name-form" className={classes.widthFull}>
                    <InputLabel id="district-name-select-label">District</InputLabel>
                    <Select
                        labelId="district-name-select-label"
                        id="district-name"
                        value={this.state.district}
                        onChange={this.handleDistrictChange.bind(this)} >
                        { this.state.districtList.map( val => <MenuItem key={val.id} value={val.id}>{val.name}</MenuItem>) }
                    </Select>
                </FormControl>)
        }
    }

    render() {    
        const { classes } = this.props;         
            if(this.state.resultValid) {
                return <ShowResult data={this.state.result} areaType={this.state.landFormParams.areaType} 
                stateSelected={this.state.selectedStateDetails} district={this.state.district} backpage={this.backPage.bind(this)} />
            } else {                
            return (<Card>
                <CardContent>
                <Grid container spacing={3}>  
                    <Grid item xs={12}>
                    <form onSubmit={this.handleSubmit} noValidate autoComplete="off">                                              
                            <FormControl id="area-type" className={classes.widthFull}>
                                <InputLabel id="areaType-select-label">Area Type</InputLabel>
                                <Select
                                    labelId="areaType-select-label"
                                    id="areaType"
                                    value={this.state.landFormParams.areaType}
                                    onChange={this.handleAreaTypeChange.bind(this)} >
                                    <MenuItem value={'farm'}>Farm</MenuItem>
                                    <MenuItem value={'household'}>House</MenuItem>
                                    <MenuItem value={'residential'}>Residential Complex</MenuItem>
                                    <MenuItem value={'industrial'}>Industrial</MenuItem>
                                </Select>
                            </FormControl>
                            <Divider className={classes.divider} />
                            <Grid className={classes.coords} item xs={12}>
                                <Grid item xs={9}> 
                                <TextField className={classes.widthFull} label="Coordinates" id="coords" 
                                    value={this.state.landFormParams.coords} 
                                    onChange={this.handleChange.bind(this)}  />
                                </Grid>
                                <Grid item xs={3}>  
                                <IconButton color="primary" className={classes.backButton} aria-label="back page" 
                                 onClick={this.detectMyLocation.bind(this)} component="span">
                                     <Tooltip title="Find My Location"><MyLocationIcon /></Tooltip>
                                        
                                </IconButton>    
                                </Grid>
                            </Grid>               
                            <FormControl id="state-name-form" className={classes.widthFull}>
                                <InputLabel id="state-name-select-label">State</InputLabel>
                                <Select
                                    labelId="state-name-select-label"
                                    id="state-name"
                                    value={this.state.stateSelected}
                                    onChange={this.handleStateChange.bind(this)} >
                                    { statesDist.map( val => <MenuItem key={val.id} value={val.id}>{val.state}</MenuItem>) }
                                </Select>
                            </FormControl>
                            {this.renderDistrict()}
                            <Divider className={classes.divider} />        
                            <TextField className={classes.widthFull}  label="Area" id="area" 
                                value={this.state.landFormParams.area} onChange={this.handleChange.bind(this)}  
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"/>
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
                                <TextField className={classes.widthFull} label="Length" id="length" 
                                    value={this.state.landFormParams.length} onChange={this.handleChange.bind(this)}  
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"/>
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
                                <TextField className={classes.widthFull} label="Width" id="width" 
                                    value={this.state.landFormParams.width} onChange={this.handleChange.bind(this)}  
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"/>
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
                            <Divider className={classes.divider} />
                            <Button variant="contained" type="Submit" color="primary">Submit</Button>
                    </form>
                    </Grid>
                    </Grid>
                </CardContent>            
            </Card>);
            }                               
        }
}

export default withStyles(styles)(LandForm);

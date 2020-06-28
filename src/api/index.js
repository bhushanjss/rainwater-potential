
import axios from 'axios';
import config from '../config';

const API_ENDPOINT =  config.API_ENDPOINT;
const API_KEY = config.API_KEY;


const getWeatherData = async (params) => {
    const config = {
        method: 'get',
        url: API_ENDPOINT + '/calc',
        headers: { 'x-api-key':  API_KEY },
        params: params
      };
    const result = await axios(config);
    console.log(result);
    return result;
};

export default getWeatherData;
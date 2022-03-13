import axios from 'axios';
import configureService from './configure-service.js';
import logService from './log-service.js';

class WeatherService {
    
    getWeather = async (city) => {
        //const url = `api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
        const token = await configureService.getToken();
        if(!token){
            throw new Error('Token not definded. Set it with command -t [TOKEN]')
        }

        try{
            const { data, status } = await axios.get('https://api.openweathermap.org/data/2.5/weather',{
                params: {
                    q: city,
                    appid: token,
                    lang: 'ru',
                    units: 'metric'
                }}
            );                    
            return data;
        } catch(e) {
            logService.printError(e);
        }

        return undefined;

        // const url = new URL('https://api.openweathermap.org/data/2.5/weather');
        // url.searchParams.append('q', city);
        // url.searchParams.append('appid', token);
        // url.searchParams.append('lang', 'ru');
        // url.searchParams.append('units', 'metric');

        // https.get(url, (responce) => {
        //     let res = '';
        //     responce.on('data', chunk => {
        //         res += chunk;
        //     })

        //     responce.on('end', () => {
        //         logService.printSuccess(res);
        //     })

        //     responce.on('error', (err) => {
        //         logService.printError(err);
        //     })
        // })
    }

}

export default new WeatherService();
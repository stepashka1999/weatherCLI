#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import logService from "./services/log-service.js";
import configureService from "./services/configure-service.js";
import weatherService from "./services/weather-service.js";
import dedent from "dedent-js";

const initCli = async () => {
    console.log('Started');
    const args = getArgs(process.argv);

    if(args.h) {
        logService.printHelp();
    }

    if(args.s) {
        trySetKeyValue('city', args.s);
        return;
    }
    
    if(args.t) {
        trySetKeyValue('token', args.t);
        return;    
    }

    if(args.d){
        //TODO
    }

    const weather = await weatherService.getWeather(await configureService.getCity());
    printWeather(weather);
};

const printWeather = (data) => {
    const icon = data.weather[0].icon;
    logService.printSuccess(
        dedent(`\n
        Wheather in ${data.name}
        Desc: ${icon} ${data.weather[0].description}
        Temp: ${data.main.temp}
        Feels Like: ${data.main.feels_like}`)
    );
}

const trySetKeyValue = async (key, value) => {
    if(!value.length){
        logService.printError(`${key}'s value was boolean. Cant save value`)
        return;
    }

    try {
        await configureService.setKeyValue(key, value);
        logService.printSuccess(`${key} has been setted successfully`);
    } catch (e) {
        logService.printError(e);
    }
}

initCli();
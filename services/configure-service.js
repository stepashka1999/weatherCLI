import { homedir } from 'os';
import { join } from 'path'
import { promises } from 'fs';

class ConfigureService {

    configFilePath = join(homedir(), 'weather-data.json');

    setKeyValue = async (key, value) => {
        let data = {};
        if(await this.isExist(this.configFilePath)){
            const file = await promises.readFile(this.configFilePath);
            data = JSON.parse(file.toString())
        }
        
        data[key] = value;
        await promises.writeFile(this.configFilePath, JSON.stringify(data));
    }

    getValueByKey = async (key) => {
        if(!await this.isExist(this.configFilePath)){
            return undefined;
        }

        const file = await promises.readFile(this.configFilePath);
        const data = JSON.parse(file.toString());
        return data[key];
    }

    isExist = async (path) => {
        try{
            await promises.stat(path);
        } catch(e) {
            return false;
        }

        return true;
    }

    getToken = async () => {
        return this.getValueByKey('token');
    }

    getCity = async () => {
        return this.getValueByKey('city');
    }
}

export default new ConfigureService();
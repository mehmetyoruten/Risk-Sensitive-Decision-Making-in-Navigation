import { Body, Injectable } from "@nestjs/common";
// import { Config } from './config.model'
import { Config } from './config_dto'

@Injectable()
export class ConfigService {
private config: Config[] = [];

  /*
  async readConfig(){
      return [...this.config]
  }
  */

  async readConfig(){
    const fs = require('fs');
    return new Promise<Object>((resolve, reject) =>{
      fs.readFile('config.json', (err, data) => {
        if (err)
          return reject(err);
        resolve(JSON.parse(data));
      });
    });
  }

  async saveConfig(config: Config){
    console.log("Updated Config")
    console.log(config)
    const fs = require('fs');
    fs.writeFileSync('config.json', JSON.stringify(config))
  }
}


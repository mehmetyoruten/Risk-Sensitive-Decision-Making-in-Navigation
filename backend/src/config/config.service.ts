import { Body, Injectable } from "@nestjs/common";
import { Config } from './config.model'

@Injectable()
export class ConfigService {
private config: Config[] = [];

  async readConfig(){
      return [...this.config]
  }

  async saveConfig(
    time_limit:number, 
    max_practice:number, 
    max_moves:number,
    max_trials:number, 
    max_grids:number, 
    obs_x:number,
    obs_y:number
  )
    {
    console.log("Updated Config");      
    const newConfig = new Config(time_limit, max_practice, max_moves, max_trials, max_grids, obs_x, obs_y);   
    this.config.push(newConfig);  
    const fs = require('fs');
    fs.writeFileSync('config.json', JSON.stringify(newConfig))
  }
  
}

/*
saveConfig(
  time_limit:number, 
  max_practice:number, 
  max_moves:number,
  max_trials:number, 
  max_grids:number, 
  obs_x:number,
  obs_y:number)
  {
  console.log("Updated Config");     
  const newConfig = new Config(time_limit, max_practice, max_moves, max_trials, max_grids, obs_x, obs_y);
  this.config.push(newConfig);
  return newConfig;
}
*/

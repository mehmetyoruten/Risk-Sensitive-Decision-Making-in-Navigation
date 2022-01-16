import { Body, Controller, Get, Post } from "@nestjs/common";
import { ConfigService } from './config.service'
import { Config } from './config.model'


@Controller("config")
export class ConfigController {
    constructor(private readonly configService: ConfigService) {}
        
    @Get()
    loadConfig(){
      let config = this.configService.readConfig();
      console.log(config); 
      return config; 
    }

    
    @Post()
    saveConfig(
        @Body('time_limit') confLim: number,
        @Body('max_practice') confPrac: number,
        @Body('max_moves') confMov: number,
        @Body('max_trials') confTr: number,
        @Body('max_grids') confGr: number,
        @Body('obstacle_x') confX: number,
        @Body('obstacle_y') confY: number
    ) {
        this.configService.saveConfig(confLim, confPrac,confMov,confTr,confGr,confX, confY);
    }
    
}


import { Body, Controller, Get, Post } from "@nestjs/common";
import { ConfigService } from './config.service'
// import { Config } from './config.model'
import { Config } from './config_dto'


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
    saveConfig(@Body() config: Config) {
        this.configService.saveConfig(config);
    }
    
}

/*
@Post()
saveConfig(
    @Body('time_limit') confLim: number,
    @Body('max_practice') confPrac: number,
    @Body('max_moves') confMov: number,
    @Body('max_trials') confTr: number,
    @Body('max_grids') confGr: number
) {
    this.configService.saveConfig(confLim, confPrac,confMov,confTr,confGr);
}
*/
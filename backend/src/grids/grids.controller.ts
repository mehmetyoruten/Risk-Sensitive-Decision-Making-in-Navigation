import { Body, Controller, Get, Post, Param } from "@nestjs/common";
import { GridService } from './grids.service'
// import { Config } from './config.model'
import { Grid } from './grids_dto'


@Controller("grids")
export class GridController {
    constructor(private readonly gridService: GridService) {}
        
    @Get()
    loadGrid(){
      let grid = this.gridService.readGrid();
      console.log(grid); 
      return grid; 
    }
    
    @Get(':id')
    async getGrid(@Param('id') gridId: string) {
        return this.gridService.getSingleGrid(gridId)
    }

    
    @Post()
    saveGrid(@Body() grid: Grid) {
        this.gridService.saveGrid(grid);
    }
    
}
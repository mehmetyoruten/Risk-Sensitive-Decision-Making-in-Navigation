import { Body, Controller, Get, Post, Param, Patch } from "@nestjs/common";
import { GridService } from './grids.service'
import { Grid } from './grids.model'


@Controller("grids")
export class GridController {
    constructor(private readonly gridService: GridService) {}
    
        
    @Post()
    saveGrid(
        @Body('id') gridId: string,
        @Body('gridWorld') gridWorld: number,
        @Body('endLoc') gridEnd: number,
        @Body('startLoc') gridStart: number,
        @Body('player') gridPlayer: number,
        @Body('obstacleLoc') gridObst: number,
    ): any {
        this.gridService.saveGrid(
            gridId,
            gridWorld,
            gridEnd,
            gridStart,
            gridPlayer,
            gridObst
        );
    }
    
    @Get()
    async loadGrid(){
      let grid = this.gridService.readGrid();
      console.log(grid); 
      return grid; 
    }
    
    @Get(':id')
    async getGrid(@Param('id') gridId: string) {
        return this.gridService.getSingleGrid(gridId)
    }

    @Patch(':id')
    async updateGrid(
        @Param('id') gridId: string,
        @Body('gridWorld') gridWorld: number,
        @Body('endLoc') gridEnd: number,
        @Body('startLoc') gridStart: number,
        @Body('player') gridPlayer: number,
        @Body('obstacleLoc') gridObst: number,
    ) {
        this.gridService.updateGrid(gridId, gridWorld, gridEnd, gridStart, gridPlayer, gridObst)
        return "Grid Updated"
    }
}

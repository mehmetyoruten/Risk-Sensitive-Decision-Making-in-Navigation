import { Body, Injectable, NotFoundException } from "@nestjs/common";
import { Grid } from './grids.model'

@Injectable()
export class GridService {
  //private grids: Grid[] = [];  
  private grids: Grid[] = [];

  // try to call the grid with its Id
  /*
  async readGrid(){
    const fs = require('fs');
    return new Promise<Object>((resolve, reject) =>{
      fs.readFile('grids.json', (err, data) => {
        if (err)
          return reject(err);
        resolve(JSON.parse(data));
      });            
    });        
  }
*/

  async readGrid(){
    const fs = require('fs');
    const path = require('path');
    let rawdata = fs.readFileSync(path.resolve(__dirname, 'grids.json'));
    let data = JSON.parse(rawdata);
    console.log(data);  
  }

  async saveGrid(gridId: string, gridWorld: number, endLoc: number, startLoc: number, player: number, obstacleLoc: number){
    console.log("Updated Config")
    //console.log(grid)    

    const newGrid = new Grid(gridId, gridWorld, endLoc, startLoc, player, obstacleLoc);
    this.grids.push(newGrid);

    const fs = require('fs');
    fs.writeFileSync('grids.json', JSON.stringify(newGrid))
    return gridId;

  }

  async getSingleGrid(gridId: string) {
    console.log("Load grid "+ gridId);
    const grid = this.findGrid(gridId)[0]; 
    if (!grid) {
        throw new NotFoundException('Could not find grid.');
    }
    return {...grid}; 
  }

  updateGrid(gridId: string, gridWorld: number, endLoc: number, startLoc: number, player: number, obstacleLoc: number) {
    const [grid, index] = this.findGrid(gridId);

    const updatedGrid = {...grid};

    if (gridWorld) {
      updatedGrid.gridWorld = gridWorld;
    }
    if (endLoc) {
      updatedGrid.endLoc = endLoc;      
    }
    if (startLoc) {
      updatedGrid.startLoc = startLoc;      
    } 
    if (player) {
      updatedGrid.player = player;      
    }
    if (obstacleLoc) {
      updatedGrid.obstacleLoc = obstacleLoc;
    }
    this.grids[index] = updatedGrid;
  }

  private findGrid(id: string): [Grid, number] { 
    const gridIndex = this.grids.findIndex(grid => grid.id === id);

    const grid = this.grids[gridIndex];
    if (!grid) {
      throw new NotFoundException('Could not find grid.');
    }
    return [grid, gridIndex]
}

}


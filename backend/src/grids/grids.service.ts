import { Body, Injectable, NotFoundException } from "@nestjs/common";
import { Grid } from './grids.model'

@Injectable()
export class GridService {
private grids: Grid[] = [];

  // try to call the grid with its Id
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

  async saveGrid(grid: Grid){
    console.log("Updated Config")
    console.log(grid)
    const fs = require('fs');
    fs.writeFileSync('grids.json', JSON.stringify(grid))
  }

  async getSingleGrid(gridId: string) {
    const grid = this.findGrid(gridId)[0]; 
    if (!grid) {
        throw new NotFoundException('Could not find grid.');
    }
    return {...grid}; 
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


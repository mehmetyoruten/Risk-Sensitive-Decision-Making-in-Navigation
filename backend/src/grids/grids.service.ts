import { Body, Injectable } from "@nestjs/common";
import { Grid } from './grids_dto'

@Injectable()
export class GridService {
private grid: Grid[] = [];

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
}


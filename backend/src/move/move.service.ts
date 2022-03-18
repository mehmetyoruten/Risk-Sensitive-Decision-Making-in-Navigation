import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Move } from './move_dto'
import { SessionsService } from "../sessions/sessions.service"


@Injectable()
export class MoveService {
    private moves: Move[] = [];        
    async saveMove( move: Move) {                        
        const fs = require('fs');
        
        //SessionsService.readSession()

        // Read moves files
        this.readMoves();

        // Add new move to the file
        this.moves.push(move);
        let json = JSON.stringify(this.moves); // Convert object back to JSON
        
        fs.writeFile("./moves/moves.json", json, 'utf8', (err) => {
            if (err) {
              console.log(`Error writing file: ${err}`);
            } else {
              console.log(`Move is saved`);
            }
        });
    }


    async readMoves(){
        const fs = require('fs');    
        // Get content from file
        var contents = fs.readFileSync("./moves/moves.json");
        // Define to JSON type
        this.moves = JSON.parse(contents);        
    }


    getMoves() {
        return [...this.moves]; 
    }


    getSingleMove(move_n: string) { 
        const move = this.findMove(move_n)[0]; 
        if (!move) {
            throw new NotFoundException('Could not find session.');
        }
        return {...move}; 
    }

    private findMove(id: string): [Move, number] { 
        const moveIndex = this.moves.findIndex(move => move.move_n === id);
        const move = this.moves[moveIndex];
        if (!move) {
          throw new NotFoundException('Could not find move.');
        }
        return [move, moveIndex]
    }

}



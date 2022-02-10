import { Injectable, NotFoundException } from "@nestjs/common";
import { Move } from './move_dto'

@Injectable()
export class MoveService {
    private moves: Move[] = [];    

    async saveMove( move: Move) {                        
        this.moves.push(move);
        const fs = require('fs');
        fs.writeFileSync('moves.json', JSON.stringify(move))
        return console.log("Move saved...");
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



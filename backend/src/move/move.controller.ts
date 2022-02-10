import { Body, Controller, Get, Post, Param } from "@nestjs/common";
import { MoveService } from './move.service'
// import { Config } from './config.model'
import { Move } from './move_dto'


@Controller("move")
export class MoveController {
    constructor(private readonly moveService: MoveService) {}
        
    @Get()
    getMoves(){
      let moves = this.moveService.getMoves();
      console.log(moves); 
      return moves; 
    }

    @Get(':id')
    async getMove(@Param('id') move_n: string) {
        return this.moveService.getSingleMove(move_n)
    }
    
    @Post()
    saveMove(@Body() move: Move) {
        this.moveService.saveMove(move);
    }
    
}
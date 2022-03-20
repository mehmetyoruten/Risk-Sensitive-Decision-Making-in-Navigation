import { Body, Controller, Post, Get, Patch, Param } from "@nestjs/common";

import { SessionsService } from "./sessions.service";

@Controller('sessions')
export class SessionController{
    constructor(private readonly sessionsService: SessionsService) {}


    @Post()
    addSession(        
        @Body('id') sessId: string,
        @Body('start_time') sessStart: number,
        @Body('end_time') sessEnd: number,
        @Body('maps') sessMaps: number,
        @Body('results') sessResults: number,
        @Body('code_version') sessCode: string,
        @Body('comment') sessComm: string
    ): any {
        const generatedId = this.sessionsService.saveSession(             
            sessId,
            sessStart,
            sessEnd,
            sessMaps,
            sessResults,
            sessCode,
            sessComm
        );
        return {id: generatedId};  
    }

    @Get()
    async getAllSessions() {
        return this.sessionsService.getSessions();
    }

    @Get(':id')
    async getProduct(@Param('id') sessId: string) {
        return this.sessionsService.getSingleSession(sessId)
    }

    @Patch(':id')
    async updateProduct(
        @Param('id') sessId: string,
        @Body('start_time') sessStart: number,
        @Body('end_time') sessEnd: number,
        @Body('maps') sessMaps: number,
        @Body('results') sessResults: number,
        @Body('code_version') sessCode: string,
        @Body('comment') sessComm: string,
    ) {
        this.sessionsService.updateSession(sessId, sessStart, sessEnd, sessMaps, sessResults, sessCode, sessComm);
        return "Updated"
    }    

}
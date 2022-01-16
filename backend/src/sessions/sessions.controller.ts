import { Body, Controller, Post, Get, Patch, Param } from "@nestjs/common";

import { SessionsService } from "./sessions.service";

@Controller('sessions')
export class SessionController{
    constructor(private readonly sessionsService: SessionsService) {}


    @Post()
    addSession(        
        @Body('participant') sessPart: number,
        @Body('code_version') sessCode: string,
        @Body('comment') sessComm: string
    ): any {
        const generatedId = this.sessionsService.saveSession(             
            sessPart,
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
        @Body('participant') sessPart: number,
        @Body('code_version') sessCode: string,
        @Body('comment') sessComm: string,
    ) {
        this.sessionsService.updateSession(sessId, sessPart, sessCode, sessComm);
        return "Updated"
    }    

}
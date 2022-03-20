import { Module } from "@nestjs/common";
import { SessionsService } from "src/sessions/sessions.service";
import { MoveController } from "./move.controller"
import { MoveService } from "./move.service"

@Module({
    controllers: [MoveController],
    providers: [MoveService],
    imports: [SessionsService]
})

export class MoveModule {}
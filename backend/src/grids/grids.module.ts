import { Module } from "@nestjs/common";
import { GridController } from "./grids.controller"
import { GridService } from "./grids.service"

@Module({
    controllers: [GridController],
    providers: [GridService]
})

export class GridModule {}
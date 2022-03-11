/*
export class Grid {
    id: string;
    gridWorld: number;    
    endLoc: number;
    startLoc: number;
    player: number;
    obstacleLoc: number;
}
*/

export class Grid {
    constructor(
        public id: string,
        public gridWorld: number,
        public endLoc: number,
        public startLoc: number, 
        public player: number, 
        public obstacleLoc: number,
    ) {} 
}
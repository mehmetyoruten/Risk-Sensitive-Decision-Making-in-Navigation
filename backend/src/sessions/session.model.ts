export class Session {
    constructor(      
      public id: string,
      public start_time: number,
      public end_time: number,
      public maps: number,
      public results: number,
      public code_version: string,      
      public comment: string,
    ) {}
  }
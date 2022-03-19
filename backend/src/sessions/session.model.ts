export class Session {
    constructor(      
      public id: string,
      public participant: number,
      public code_version: string,      
      public comment: string,
    ) {}
  }
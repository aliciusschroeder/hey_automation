// ./src/types/types.ts

export interface JobType {
    jobtype: string;
    distance: number;
    pilot_allowed: boolean;
  }
  
  export interface Row {
    id: number;
    jobtype: string;
    embeddings: string;
    distance?: number;
    pilot_allowed?: boolean;
  }
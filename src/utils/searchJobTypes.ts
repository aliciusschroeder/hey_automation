// ./src/utils/searchJobTypes.ts

import path from 'path';
import { Database } from 'sqlite3';
import { jobsInPilotAllowed } from './pilotJobs';
import type { Row } from '../types/jobcategory';


function cosineSimilarity(a: number[], b: number[]): number {
  const dotProduct = a.reduce((acc, val, i) => acc + (val * (b[i] || 0)), 0);
  const magnitudeA = Math.sqrt(a.reduce((acc, val) => acc + val * val, 0));
  const magnitudeB = Math.sqrt(b.reduce((acc, val) => acc + val * val, 0));
  const similarity = dotProduct / (magnitudeA * magnitudeB);
  const MIN_SIMILARITY = 0.71;
  const MAX_SIMILARITY = 0.9;
  const MAX_PERCENTAGE = 100;

  if (similarity <= MIN_SIMILARITY) {
    return 0;
  }
  if (similarity >= MAX_SIMILARITY) {
    return MAX_PERCENTAGE;
  }
  const percentage = ((similarity - MIN_SIMILARITY) / (MAX_SIMILARITY - MIN_SIMILARITY)) * MAX_PERCENTAGE;
  
  return parseFloat(percentage.toFixed(1));
}

export async function searchJobTypes(embedding: number[]): Promise<Row[]> {
  return new Promise((resolve, reject) => {
    const db = new Database(path.resolve('./db/jobtypes-embeddings.db'));
    db.all('SELECT * FROM jobtypes', [], (err, rows: unknown) => {
      if (err) {
        reject(err);
      } else {
        const typedRows = rows as Row[];
        //console.log("Database rows: ", typedRows);  // log initial rows
        const distances = typedRows.map((row: Row) => {
          const jobEmbedding: number[] = JSON.parse(row.embeddings) as number[];
          const distance = cosineSimilarity(embedding, jobEmbedding);
          //console.log("Calculated distance: ", distance);  // log calculated distance

          const jobInPilot = jobsInPilotAllowed.find(job => job.jobtype === row.jobtype);
          const pilot_allowed = jobInPilot ? jobInPilot.pilot_allowed : false;

          return { ...row, distance, pilot_allowed };
        })
        .filter(row => typeof row.distance === 'number')
        .sort((a, b) => (b.distance) - (a.distance));
    
        db.close();
        resolve(distances.slice(0, 3));
      }
    });
  });
}

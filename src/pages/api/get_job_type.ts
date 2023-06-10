// ./src/pages/api/get_job_type.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import type {CreateEmbeddingResponse} from "openai";
import { Configuration, OpenAIApi} from "openai"; 
import type { AxiosResponse } from 'axios';
import { searchJobTypes } from '../../utils/searchJobTypes';

const openai_api_key = process.env.OPENAI_API_KEY;
const configuration = new Configuration({ apiKey: openai_api_key });
const openai = new OpenAIApi(configuration);

interface JobType {
  jobtype: string;
  distance: number;
}

interface Row {
  id: number;
  jobtype: string;
  embeddings: string;
  distance?: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<JobType[] | { error: string }>) {
  if (req.method === 'POST') {
    const { jobDescription } = req.body as { jobDescription: string };

    try {
      const adaResponse: AxiosResponse<CreateEmbeddingResponse> = await openai.createEmbedding({
        model: "text-embedding-ada-002",
        input: jobDescription,
      });

      const embedding: number[] | undefined = adaResponse.data?.data[0]?.embedding;

      if (!embedding) {
        throw new Error("Embedding failed");
      }

      const rows: Row[] = await searchJobTypes(embedding);

      console.log("Let's go:")
      console.log(rows[0]?.jobtype);

      const jobTypes: JobType[] = rows.map(row => ({jobtype: row.jobtype, distance: row.distance})) as JobType[];
      
      res.status(200).json(jobTypes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error generating job type' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}


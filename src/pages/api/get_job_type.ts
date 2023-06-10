// ./src/pages/api/get_job_type.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import type {CreateEmbeddingResponse} from "openai";
import { Configuration, OpenAIApi} from "openai"; //const { Configuration, OpenAIApi } = require("openai");
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
  job: string;
  embeddings: string;
  distance?: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const jobDescription: string = req.body.jobDescription;

    try {
      const adaResponse: CreateEmbeddingResponse = await openai.createEmbedding({
        model: "text-embedding-ada-002",
        input: jobDescription,
      }) as CreateEmbeddingResponse;

      const embedding: number[] = adaResponse.data.data[0].embedding;

      const jobTypes: JobType[] = (await searchJobTypes(embedding)) as JobType[];

      res.status(200).json(jobTypes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error generating job type' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
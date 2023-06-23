// ./src/pages/api/get_job_type.ts

import { parse } from 'cookie';

import { Configuration, OpenAIApi } from "openai";
import type { CreateEmbeddingResponse } from "openai";

import type { NextApiRequest, NextApiResponse } from "next";
import type { AxiosResponse } from "axios";

import { searchJobTypes } from "../../utils/searchJobTypes";
import type { JobType, Row } from "../../types/jobcategory";

export default async function handler(req: NextApiRequest, res: NextApiResponse<JobType[] | { error: string }>) {
  const cookies = parse(req.headers.cookie || '');
  const openai_api_key = cookies.API_KEY || process.env.OPENAI_API_KEY as string;
  const configuration = new Configuration({
    apiKey: openai_api_key,
  });      
  const openai = new OpenAIApi(configuration);

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
      const jobTypes: JobType[] = rows.map(row => ({jobtype: row.jobtype, distance: row.distance, pilot_allowed: row.pilot_allowed})) as JobType[];
      res.status(200).json(jobTypes);

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error generating job type' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}


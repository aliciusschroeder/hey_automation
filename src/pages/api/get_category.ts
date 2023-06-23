// ./src/pages/api/get_category.ts

import { parse } from 'cookie';

import { Configuration, OpenAIApi } from 'openai';
import type { CreateChatCompletionResponse } from 'openai';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { AxiosResponse } from 'axios';

import { COMPANY_TYPES } from '../../types/company_category';

type ResponseContent = {
  shortcut: string;
  category: string;
  reasoning: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = parse(req.headers.cookie || '');
  const openai_api_key = cookies.API_KEY || process.env.OPENAI_API_KEY as string;
  const configuration = new Configuration({
    apiKey: openai_api_key,
  });
  const openai = new OpenAIApi(configuration);
  
  if (req.method === 'POST') {
    const { companyName, companyDescription } = req.body as { companyName: string, companyDescription: string };  
    const shortcuts = COMPANY_TYPES.map(sc => `${sc.shortcut} = ${sc.category}`).join('\n');
    const prompt = `Weise dem Unternehmen "${String(companyName)}" das Kürzel zu das am besten passt. Wenn Du nicht sicher bist, antworte "??? = Nicht sicher". Erfinde KEINE neuen Kürzel! Benutze ausschließlich Kürzel aus der Liste. Antworte mit einem JSON Objekt mit 3 properties:
- "shortcut" = dem Kürzel
- "category" = die ausgeschriebene Kategorie
- "reasoning" = Der Begründung warum du dich so entschieden hast

Über das Unternehmen:
'''
${String(companyDescription)}
'''

Kürzel:
${shortcuts}`;   
    const response: AxiosResponse<CreateChatCompletionResponse> = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "user",
          "content": prompt
        }
      ]
    });

    if (!response.data.choices || !response.data.choices[0]) {
      res.status(500).json({ message: 'Invalid API response' });
      return;
    }

    const { shortcut, category, reasoning } = JSON.parse(response.data.choices?.[0]?.message?.content ?? '{}') as ResponseContent;
    res.status(200).json({ shortcut, category, reasoning });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

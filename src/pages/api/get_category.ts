// pages/api/get_category.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from "openai";
import type { AxiosResponse } from 'axios';
import type { CreateChatCompletionResponse } from "openai";

const openai_api_key = process.env.OPENAI_API_KEY as string;

const configuration = new Configuration({
  apiKey: openai_api_key,
});
const openai = new OpenAIApi(configuration);

type ResponseContent = {
  shortcut: string;
  category: string;
  reasoning: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { companyName, companyDescription } = req.body as { companyName: string, companyDescription: string };

    
    const prompt = `Weise dem Unternehmen "${String(companyName)}" das Kürzel zu das am besten passt. Wenn Du nicht sicher bist, antworte "??? = Nicht sicher". Antworte mit einem JSON Objekt mit 3 properties:
    - "shortcut" = dem Kürzel
    - "category" = die ausgeschriebene Kategorie
    - "reasoning" = Der Begründung warum du dich so entschieden hast
    
    Über das Unternehmen:
    '''
    ${String(companyDescription)}
    '''
    
    Kürzel:
    PF = Pflege
    KH = Krankenhaus
    PRO = Produktion
    RET = Retail
    BA = Bank
    ÖFF = Öffentlicher Dienst (Stadt/ Landkreis)
    IND = Industrie
    PER = Personaldienstleister
    SER = Service, Dienstleistungen
    BIL = Bildung
    VER = Versicherung
    LOG = Logistik
    AGT = Agentur
    STU = Start Up`
    
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

    //const { shortcut, category, reasoning } = JSON.parse(response.data.choices[0].message.content) as ResponseContent;
    const { shortcut, category, reasoning } = JSON.parse(response.data.choices?.[0]?.message?.content ?? '{}') as ResponseContent;


    res.status(200).json({ shortcut, category, reasoning });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

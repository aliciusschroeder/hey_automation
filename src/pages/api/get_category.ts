// pages/api/get_category.ts

import type { NextApiRequest, NextApiResponse } from 'next';
//import { openai_api_key } from '../../../config/api_keys';
const openai_api_key = process.env.OPENAI_API_KEY;

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: openai_api_key,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { companyName, companyDescription } = req.body;
    
    const prompt = `Weise dem Unternehmen "${companyName}" das Kürzel zu das am besten passt. Wenn Du nicht sicher bist, antworte "??? = Nicht sicher". Antworte mit einem JSON Objekt mit 3 properties:
    - "shortcut" = dem Kürzel
    - "category" = die ausgeschriebene Kategorie
    - "reasoning" = Der Begründung warum du dich so entschieden hast
    
    Über das Unternehmen:
    '''
    ${companyDescription}
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
    
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "user",
          "content": prompt
        }
      ]
    });

    const { shortcut, category, reasoning } = JSON.parse(response.data.choices[0].message.content);

    res.status(200).json({ shortcut, category, reasoning });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

//src/pages/get-category/index.tsx
/* eslint-disable @typescript-eslint/no-misused-promises */

import { useState, type FormEvent } from 'react';
import axios, { type AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { type Shortcut, COMPANY_TYPES } from '../../types/company_category';

interface Result {
  shortcut: string;
  category: string;
  reasoning: string;
}

export default function Home() {
  const [companyName, setCompanyName] = useState<string>("");
  const [result, setResult] = useState<Result | null>(null);

  const [companyDescription] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const res: AxiosResponse<Result> = await axios.post('/api/get_category', {
        companyName: companyName,
        companyDescription: companyDescription,
    });

    setResult(res.data);
  };
  
  const getShortcut = (shortcut: Shortcut, chosenShortcut: string | undefined) => (
    <p key={shortcut.category} className={`text-gray-700 hover:bg-gray-200 ${shortcut.shortcut === chosenShortcut ? 'bg-indigo-100 font-bold' : ''}`}>
      {`${shortcut.shortcut} = ${shortcut.category}`}
    </p>
  );
  
  const router = useRouter();


  return (
    <div className="container mx-auto px-4 grid grid-cols-5 gap-6">
      <div className="col-span-1 bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200">
        <button 
              className="inline-block mb-4 rounded px-4 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-200 shadow-md"
              onClick={() => router.push('..')}
        >
              Back
        </button>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="companyName" className="block text-lg font-bold text-gray-700">Company Name:</label>
            <input id="companyName" type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 p-2" />
          </div>
          <div>
            <button type="submit" className="inline-block rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 mt-4 hover:from-blue-600 hover:to-purple-600 transition-colors duration-200 shadow-lg">Submit</button>
          </div>
        </form>
      </div>
      <div className="col-span-2 bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200">
        <h2 className="font-bold text-2xl mb-2">Result:</h2>
        <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-inner">
          {result ? 
            <div className="p-4 bg-green-200 text-green-800 border border-green-400 rounded-lg shadow-inner">
              <p className="font-semibold"><strong>Shortcut:</strong> {result.shortcut}</p>
              <p className="font-semibold"><strong>Category:</strong> {result.category}</p>
              <p className="font-semibold"><strong>Reasoning:</strong> {result.reasoning}</p>
            </div> 
            : 
          'Your output will appear here.'
        }
        </div>
      </div>
      <div className="col-span-2 bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200" style={{ cursor: 'default' }}>
        <h2 className="font-bold text-2xl mb-2">Possible shortcuts:</h2>
        <div className="space-y-1">
          {COMPANY_TYPES.map(shortcut => getShortcut(shortcut, result?.shortcut))}
        </div>
    </div>
    </div>
  );
}

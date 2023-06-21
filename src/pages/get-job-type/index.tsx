// ./src/pages/get-job-type/index.tsx
import { useState } from 'react';
import type { FormEvent } from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

interface JobType {
  jobtype: string;
  distance: number;
  pilot_allowed: boolean;
}

const GetJobType = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState<JobType[] | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post<JobType[]>('/api/get_job_type', { jobDescription });

      setResult(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const router = useRouter();


  return (
    <div className="flex flex-col lg:flex-row gap-6 container mx-auto px-4">
      <div className="flex-grow lg:w-7/12 w-full bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200">
        <button 
          className="inline-block mb-4 rounded px-4 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-200 shadow-md"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={async () => await router.push('..')}
        >
          Back
        </button>
        <form 
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit} className="space-y-4"
        >
          <div>
            <label htmlFor="jobDescription" className="block text-lg font-bold text-gray-700">Job Description:</label>
            <textarea id="jobDescription" value={jobDescription} onChange={e => setJobDescription(e.target.value)} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 p-2 h-48"></textarea>
          </div>
          <div>
            <button type="submit" className="inline-block rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 mt-4 hover:from-blue-600 hover:to-purple-600 transition-colors duration-200 shadow-lg">Submit</button>
          </div>
        </form>
      </div>
  
      <div className="flex-grow lg:w-5/12 w-full bg-gray-50 p-6 rounded-lg shadow-lg flex flex-col">
        <h2 className="mb-4 text-xl font-bold text-gray-700">Output:</h2>
        <div className="bg-white p-4 rounded-lg shadow-inner flex-grow overflow-y-auto">
          {result ? 
            result.map((jobType, i) => 
              <div key={i} className={`flex justify-between items-start p-4 ${jobType.pilot_allowed ? 'bg-green-200 text-green-800 border border-green-400' : 'bg-red-200 text-red-900 border border-red-400'} rounded-lg shadow-inner mb-4`}>
                <div className="flex-grow pr-4">
                  <p className="font-semibold"><strong>Job Type:</strong> {jobType.jobtype}</p>
                  <p className="font-semibold"><strong>Probability:</strong> {jobType.distance}%</p>
                </div>
                <div className={`w-8 p-2 pr-4 rounded-lg bg-${jobType.pilot_allowed ? 'green' : 'red'}-200 text-end flex items-start justify-end`}>
                  <FontAwesomeIcon icon={jobType.pilot_allowed ? faCheck : faTimes} size="2x" className={`${jobType.pilot_allowed ? 'text-green-500' : 'text-red-500'} transform scale-125`} />
                </div>
                <div className="w-24 text-left">
                  <p className="font-bold text-xs text-gray-600 mt-2">
                    {jobType.pilot_allowed ? (
                      <span>
                        Im Piloten <span className="font-bold text-green-700">erlaubt</span>
                      </span>
                    ) : (
                      <span>
                        <span className="font-bold text-red-700">Nicht</span> im <br /> Piloten erlaubt
                      </span>
                    )}
                  </p>
                </div>
              </div>) 
            : 
          <div className="h-full flex items-center justify-center">
            Your output will appear here.
          </div>}
        </div>
        <p className="mt-4 text-right text-xs text-gray-600">Job difficulty data basis: <Link href="https://docs.google.com/spreadsheets/d/1C_4iYsNGcnMN2EIQnVWPvWjB8YQmlaiwR9k_CsHULz8/" className="text-blue-600 dark:text-blue-500 hover:underline" target="_blank">HeyJobs</Link> | Last Updated: 12th May 2023</p>
      </div>
    </div>
  );
};

export default GetJobType;

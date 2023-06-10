// ./src/pages/get-job-type/index.tsx
import { useState } from 'react';
import type { FormEvent } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

interface JobType {
  jobtype: string;
  distance: number;
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
      <div className="flex-grow bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200">
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
  
      <div className="lg:w-1/3 bg-gray-50 p-6 rounded-lg shadow-lg flex flex-col">
        <h2 className="mb-4 text-xl font-bold text-gray-700">Output:</h2>
        <div className="bg-white p-4 rounded-lg shadow-inner flex-grow overflow-y-auto">
          {result ? 
            result.map((jobType, i) => 
              <div key={i} className="p-4 bg-green-200 text-green-800 border border-green-400 rounded-lg shadow-inner mb-4">
                <p className="font-semibold"><strong>Job Type:</strong> {jobType.jobtype}</p>
                <p className="font-semibold"><strong>Probability:</strong> {jobType.distance}%</p>
              </div>) 
            : 
          <div className="h-full flex items-center justify-center">
            Your output will appear here.
          </div>}
        </div>
      </div>
    </div>
  );
};

export default GetJobType;

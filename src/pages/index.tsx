//src/pages/index.tsx

import Cookies from "js-cookie";
import { CSSTransition } from 'react-transition-group';
import { useEffect, useState } from "react";
import Link from "next/link";
import { type NextPage } from "next";


const Home: NextPage = () => {
  const [showAlert, setShowAlert] = useState(true);
  const [apiKey, setApiKey] = useState<string | null>(null);

  useEffect(() => {
    const savedKey = localStorage.getItem('API_KEY');
    setApiKey(savedKey);
  }, []);

  const storeApiKey = () => {
    const key = window.prompt("Please enter your API key");
    if (key) {
      localStorage.setItem('API_KEY', key);
      Cookies.set('API_KEY', key, { secure: true, sameSite: 'strict', expires: 7 });
      setApiKey(key);
    }
  }

  const removeApiKey = () => {
    localStorage.removeItem('API_KEY');
    Cookies.remove('API_KEY');
    setApiKey(null);
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-500 to-blue-600 p-10">
      <main className="flex-grow">
        <div className="text-center py-10 space-y-6 w-full max-w-2xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-10">
            Welcome to HeyAutomation
          </h1>
          {showAlert && !apiKey && (
            <div className="bg-blue-200 text-blue-900 rounded-md px-6 py-4 mb-6 text-sm sm:text-base shadow-lg relative">
              Please note that certain functions of this project may not work as expected outside of the development environment because the API keys required for full functionality are not shipped with the public production version.<br />
              <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200" onClick={storeApiKey}>
                Enter API Key
              </button>
              <button className="absolute top-2 right-2 text-xl" onClick={() => setShowAlert(false)}>&times;</button>
            </div>
          )}
          {apiKey && (
            <div className="bg-green-200 text-green-900 rounded-md px-6 py-4 mb-6 text-sm sm:text-base shadow-lg relative">
              Locally saved API key will be used<br />
              <button className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200" onClick={removeApiKey}>
                Remove locally stored keys
              </button>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
              <div className="transition-all transform hover:scale-110 duration-200 ease-in-out">
                <Link href="/get-category" className="block rounded-lg bg-white shadow-lg p-10 text-blue-500 hover:text-blue-600 transition-colors duration-200">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-blue-500 animate-pulse"></div>
                    <p className="text-xl font-bold mt-4">
                      Kürzel-Finder
                    </p>
                </Link>
              </div>
            </CSSTransition>
            <CSSTransition in={true} appear={true} timeout={700} classNames="fade">
              <div className="transition-all transform hover:scale-110 duration-200 ease-in-out">
                <Link href="/get-job-type" className="block rounded-lg bg-white shadow-lg p-10 text-blue-500 hover:text-blue-600 transition-colors duration-200">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-blue-500 animate-pulse"></div>
                    <p className="text-xl font-bold mt-4">
                      Jobtyp bestimmen
                    </p>
                </Link>
              </div>
            </CSSTransition>
          </div>
        </div>
      </main>
      <footer className="text-center text-white mt-10">
        <p>
          © 2023 Alicius Schröder |&nbsp;
          <a 
            href="https://github.com/aliciusschroeder/hey_automation" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-300 hover:text-blue-100 underline"
          >
            Visit GitHub repo
          </a>
        </p>
      </footer>
    </div>
  );
}

<style jsx global>{`
.fade-enter {
  opacity: 0;
  transform: scale(0.9);
}
.fade-enter.fade-enter-active {
  opacity: 1;
  transform: scale(1);
  transition: opacity 500ms, transform 500ms;
}
.fade-exit {
  opacity: 1;
}
.fade-exit.fade-exit-active {
  opacity: 0;
  transition: opacity 300ms;
}
`}</style>

export default Home;
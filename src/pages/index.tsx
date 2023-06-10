//src/pages/index.tsx

//import styles from "./index.module.css";
//import Head from "next/head";

import { type NextPage } from "next";
import Link from "next/link";
import { CSSTransition } from 'react-transition-group';
import { useState } from "react";


const Home: NextPage = () => {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center p-10">
      <div className="text-center py-10 space-y-6 w-full max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-10">
          Welcome to HeyJobs - Automations
        </h1>
        {showAlert && (
          <div className="bg-blue-200 text-blue-900 rounded-md px-6 py-4 mb-6 text-sm sm:text-base shadow-lg relative">
            Please note that certain functions of this project may not work as expected outside of the development environment because the API keys required for full functionality are not shipped with the public production version.
            <button className="absolute top-2 right-2 text-xl" onClick={() => setShowAlert(false)}>&times;</button>
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

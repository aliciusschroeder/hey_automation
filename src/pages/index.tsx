//import styles from "./index.module.css";
import { type NextPage } from "next";
//import Head from "next/head";
import Link from "next/link";

import { CSSTransition } from 'react-transition-group';

const Home: NextPage = () => {



  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold text-white mb-8">
          Welcome to HeyJobs - Automations
        </h1>
        <div className="space-y-6">
          <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
            <div className="transition-all transform hover:scale-110 duration-200 ease-in-out">
              <Link href="/get-category" className="block rounded-lg bg-white shadow-lg p-10 text-blue-500 hover:text-blue-600 transition-colors duration-200">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-blue-500"></div>
                <p className="text-xl font-bold mt-4">
                  Kürzel-Finder
                </p>
              </Link>
            </div>
          </CSSTransition>
          <CSSTransition in={true} appear={true} timeout={700} classNames="fade">
            <div className="transition-all transform hover:scale-110 duration-200 ease-in-out">
              <Link href="/get-job-type" className="block rounded-lg bg-white shadow-lg p-10 text-blue-500 hover:text-blue-600 transition-colors duration-200">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full border-t-2 border-blue-500"></div>
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


// Define your fade transition
<style jsx global>{`
.fade-enter {
  opacity: 0.01;
}
.fade-enter.fade-enter-active {
  opacity: 1;
  transition: opacity 500ms ease-in;
}
.fade-exit {
  opacity: 1;
}
.fade-exit.fade-exit-active {
  opacity: 0.01;
  transition: opacity 300ms ease-in;
}
`}</style>


export default Home;

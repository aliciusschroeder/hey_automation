import { type AppType } from "next/dist/shared/lib/utils";
import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
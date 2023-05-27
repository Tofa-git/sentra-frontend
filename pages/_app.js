import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import "react-calendar/dist/Calendar.css";
import CombinedContextProvider from "../context/";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <CombinedContextProvider>
      <Component {...pageProps} />
    </CombinedContextProvider>
  );
}

export default MyApp;

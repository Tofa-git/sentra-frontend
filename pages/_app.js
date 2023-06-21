import { useEffect } from "react";
import CombinedContextProvider from "../context/";

import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import "react-calendar/dist/Calendar.css";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import "react-datetime/css/react-datetime.css";

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

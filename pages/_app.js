import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [token, setToken] = useState(0);

  const checkToken = async () => {
    const myToken = await localStorage.getItem("usrkey");
    setToken(myToken);
    if (token !== 0 && token == null) {
      router.push("/authentication/login");
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  if (token == 0) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  } else {
    return <Component {...pageProps} keys={token} />;
  }
}

export default MyApp;

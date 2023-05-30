import { AuthContextProvider } from "./auth/reducer";
import { CountryContextProvider } from "./country/reducer";
import { CityContextProvider } from "./city/reducer";

export default function CombinedContextProvider({ children }) {
  return (
    <AuthContextProvider>
      <CountryContextProvider>
        <CityContextProvider>{children}</CityContextProvider>
      </CountryContextProvider>
    </AuthContextProvider>
  );
}

import { AuthContextProvider } from "./auth/reducer";
import { CountryContextProvider } from "./country/reducer";
import { CityContextProvider } from "./city/reducer";
import { NationalityContextProvider } from "./nationality/reducer";

export default function CombinedContextProvider({ children }) {
  return (
    <AuthContextProvider>
      <CountryContextProvider>
        <CityContextProvider>
          <NationalityContextProvider>{children}</NationalityContextProvider>
        </CityContextProvider>
      </CountryContextProvider>
    </AuthContextProvider>
  );
}

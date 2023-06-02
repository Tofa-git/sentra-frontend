import { AuthContextProvider } from "./auth/reducer";
import { CountryContextProvider } from "./country/reducer";
import { CityContextProvider } from "./city/reducer";
import { NationalityContextProvider } from "./nationality/reducer";
import { CityLocationContextProvider } from "./cityLocation/reducer";

export default function CombinedContextProvider({ children }) {
  return (
    <AuthContextProvider>
      <CountryContextProvider>
        <CityContextProvider>
          <NationalityContextProvider>
            <CityLocationContextProvider>
              {children}
            </CityLocationContextProvider>
          </NationalityContextProvider>
        </CityContextProvider>
      </CountryContextProvider>
    </AuthContextProvider>
  );
}

import { AuthContextProvider } from "./auth/reducer";
import { CountryContextProvider } from "./country/reducer";
import { CityContextProvider } from "./city/reducer";
import { NationalityContextProvider } from "./nationality/reducer";
import { CityLocationContextProvider } from "./cityLocation/reducer";
import { HotelContextProvider } from "./hotel/reducer";

export default function CombinedContextProvider({ children }) {
  return (
    <CityLocationContextProvider>
      <NationalityContextProvider>
        <CountryContextProvider>
          <AuthContextProvider>
            <CityContextProvider>
              <HotelContextProvider>{children}</HotelContextProvider>
            </CityContextProvider>
          </AuthContextProvider>
        </CountryContextProvider>
      </NationalityContextProvider>
    </CityLocationContextProvider>
  );
}

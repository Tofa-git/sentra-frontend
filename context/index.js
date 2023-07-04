import { AuthContextProvider } from "./auth/reducer";
import { CountryContextProvider } from "./country/reducer";
import { CityContextProvider } from "./city/reducer";
import { NationalityContextProvider } from "./nationality/reducer";
import { CityLocationContextProvider } from "./cityLocation/reducer";
import { HotelContextProvider } from "./hotel/reducer";
import { BookContextProvider } from "./book/reducer";
import { FacilityContextProvider } from "./facility/reducer";

export default function CombinedContextProvider({ children }) {
  return (
    <CityLocationContextProvider>
      <NationalityContextProvider>
        <CountryContextProvider>
          <AuthContextProvider>
            <CityContextProvider>
              <BookContextProvider>
                <HotelContextProvider>
                  <FacilityContextProvider>{children}</FacilityContextProvider>
                </HotelContextProvider>
              </BookContextProvider>
            </CityContextProvider>
          </AuthContextProvider>
        </CountryContextProvider>
      </NationalityContextProvider>
    </CityLocationContextProvider>
  );
}

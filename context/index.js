import { AuthContextProvider } from "./auth/reducer";
import { CountryContextProvider } from "./country/reducer";
import { MappingCountryContextProvider } from "./mappingCountry/reducer";
import { MappingCityContextProvider } from "./mappingCity/reducer";
import { CityContextProvider } from "./city/reducer";
import { NationalityContextProvider } from "./nationality/reducer";
import { CityLocationContextProvider } from "./cityLocation/reducer";
import { HotelContextProvider } from "./hotel/reducer";
import { OperatorManContextProvider } from "./operatorMan/reducer";
import { SalesOfficeContextProvider } from "./salesOffice/reducer";
import { SupplierContextProvider } from "./supplier/reducer";
import { BookContextProvider } from "./book/reducer";
import { FacilityContextProvider } from "./facility/reducer";
import { BreakfastContextProvider } from "./breakfast/reducer";
import { MealContextProvider } from "./meal/reducer";
import { BedTypeContextProvider } from "./bedType/reducer";
import { CurrencyContextProvider } from "./currency/reducer";
import { MappingHotelContextProvider } from "./mappingHotel/reducer";

export default function CombinedContextProvider({ children }) {
  return (
    <CityLocationContextProvider>
      <NationalityContextProvider>
        <CountryContextProvider>
          <AuthContextProvider>
            <CityContextProvider>
              <BookContextProvider>
                <HotelContextProvider>
                  <FacilityContextProvider>
                    <BreakfastContextProvider>
                      <MealContextProvider>
                        <OperatorManContextProvider>
                          <SalesOfficeContextProvider>
                            <CurrencyContextProvider>
                              <SupplierContextProvider>
                                <MappingCountryContextProvider>
                                  <MappingCityContextProvider>
                                    <MappingHotelContextProvider>
                                      <BedTypeContextProvider>
                                        {children}
                                      </BedTypeContextProvider>
                                    </MappingHotelContextProvider>
                                  </MappingCityContextProvider>
                                </MappingCountryContextProvider>
                              </SupplierContextProvider>
                            </CurrencyContextProvider>
                          </SalesOfficeContextProvider>
                        </OperatorManContextProvider>
                      </MealContextProvider>
                    </BreakfastContextProvider>
                  </FacilityContextProvider>
                </HotelContextProvider>
              </BookContextProvider>
            </CityContextProvider>
          </AuthContextProvider>
        </CountryContextProvider>
      </NationalityContextProvider>
    </CityLocationContextProvider>
  );
}

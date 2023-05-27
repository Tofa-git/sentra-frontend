import { AuthContextProvider } from "./auth/reducer";
import { CountryContextProvider } from "./country/reducer";

export default function CombinedContextProvider({ children }) {
  return (
    <AuthContextProvider>
      <CountryContextProvider>{children}</CountryContextProvider>
    </AuthContextProvider>
  );
}

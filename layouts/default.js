import { useState, useEffect, useContext } from "react";
import Headers from "../components/layouts/header";
import Ribbons from "../components/layouts/ribbon";
import Footers from "../components/layouts/footer";
import { AuthContext } from "../context/auth/reducer";
import { useRouter } from "next/router";
import { AUTH_401, AUTH_LOGOUT, AUTH_SUCCESS } from "../context/constant";
import "material-icons/iconfont/material-icons.css";
import { CountryContext } from "../context/country/reducer";
import { getAllCountry, getCurrencies } from "../context/country/actions";
import { getAllCurrency } from "../context/currency/action";
import { CurrencyContext } from "../context/currency/reducer"
import { getAllCity } from "../context/city/actions";
import { CityContext } from "../context/city/reducer";
import Swal from "sweetalert2";
import { CityLocationContext } from "../context/cityLocation/reducer";
import { getAllCityLocation } from "../context/cityLocation/actions";
import { getAllNationality } from "../context/nationality/actions";
import { NationalityContext } from "../context/nationality/reducer";

const Layout = ({ children, selectId }) => {
  const { state, dispatch } = useContext(AuthContext);
  const { state: countryState, dispatch: countryDispatch } =
    useContext(CountryContext);
  const { state: currencyState, dispatch: currencyDispatch } =
    useContext(CurrencyContext);
  const { state: cityState, dispatch: cityDispatch } = useContext(CityContext);
  const { state: cityLocationState, dispatch: cityLocationDispatch } =
    useContext(CityLocationContext);
  const router = useRouter();
  const { dispatch: authDispatch } = useContext(AuthContext);
  const { state: nationalityState, dispatch: nationalityDispatch } =
    useContext(NationalityContext);

  const recheckToken = () => {
    const token = localStorage.getItem("AUTH_TOKEN");
    if (token) {
      dispatch({ type: AUTH_SUCCESS });
    }

    if (!state.isAuthenticated && !token) {
      router.push("/authentication/login");
    }
  };

  const getMasterData = () => {
    if (!countryState.hasOwnProperty("dropdownData") ||
      countryState?.dropdownData.length === 0) {
      getMaster("country");
    }

    if (
      !cityState.hasOwnProperty("dropdownData") ||
      cityState?.dropdownData.length === 0
    ) {
      getMaster("city");
    }

    if (
      !countryState.hasOwnProperty("currencyData") ||
      countryState.currencyData.length === 0
    ) {
      getMaster("currency");
    }

    if (
      !currencyState.hasOwnProperty("dropdownData") ||
      currencyState.dropdownData.length === 0
    ) {
      getMaster("curr");
    }
    if (
      !nationalityState.hasOwnProperty("dropdownData") ||
      nationalityState.dropdownData.length === 0
    ) {
      getMaster("nationality");
    }

    // if (cityLocationState.dropdownData.length === 0) {
    //   getMaster("cityLocation");
    // }
  };

  const getMaster = async (name) => {
    let data = null;
    if (name === "country") {
      data = await getAllCountry(countryDispatch, true);
    } else if (name === "city") {
      data = await getAllCity(cityDispatch, true);
    } else if (name === "currency") {
      data = await getCurrencies(countryDispatch);
    } else if (name === "curr") {
      data = await getAllCurrency(currencyDispatch, true);
    } else if (name === "cityLocation") {
      data = await getAllCityLocation(cityLocationDispatch, true);
    } else if (name === "nationality") {
      data = await getAllNationality(nationalityDispatch, true);
    }

    if (data?.status === 401) {
      handle401();
    }
  };

  const handle401 = () => {
    authDispatch({ type: AUTH_401 });
    authDispatch({ type: AUTH_LOGOUT });
    Swal.fire("Token has been Expired", "Please Login Again", "warning");
    router.push("/authentication/login");
  };

  useEffect(() => {
    recheckToken();
    setTimeout(() => {
      const token = localStorage.getItem("AUTH_TOKEN");
      if (token) {
        getMasterData();
      }

    }, 5000);
  }, []);

  return (
    <>
      <div
        className="d-flex flex-column flex-fill min-vh-100"
        style={{ backgroundColor: "#dddddd" }}
      >
        <Headers />
        <Ribbons selected={selectId} />
        <main className="flex-grow-1">{children}</main>
        <Footers />
      </div>
    </>
  );
};

export default Layout;

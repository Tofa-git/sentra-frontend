import { createContext, useReducer } from "react";

import {
    CURRENCY_FAILED,
    CURRENCY_PROCESS,
    CURRENCY_SUCCESS,
} from "../constant";

const CurrencyContext = createContext();

const initialState = {
    isLoading: false,
    isError: false,
    errorMessage: null,
    data: {
        rows: [],
        limit: 2,
        page: 1,
        totalPage: 0,
        hasNext: false,
        hasPreviouse: false,
    },
    dropdownData: [],
};

function reducer(state, action) {        
    switch (action.type) {            
        case CURRENCY_PROCESS:
            return {
                ...state,
                isLoading: true,
            };
        case CURRENCY_SUCCESS:
            const changedState = {
                isLoading: false,
                isError: false,
                errorMessage: null,
            };                     
            if (action.payload.isDropDown) {
                return {
                    ...state,
                    ...changedState,
                    dropdownData: action.payload.data,
                };
            } else {                      
                return {
                    ...state,
                    ...changedState,
                    data: action.payload.data,
                };
            }
        case CURRENCY_FAILED:
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: action.payload,
            };
        default:
            return state;
    }
}

function CurrencyContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <CurrencyContext.Provider value={{ state, dispatch }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export { CurrencyContext, CurrencyContextProvider };

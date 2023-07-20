import { createContext, useReducer } from "react";

import {
    SALES_OFFICE_FAILED,
    SALES_OFFICE_PROCESS,
    SALES_OFFICE_SUCCESS,
} from "../constant";

const SalesOfficeContext = createContext();

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
        case SALES_OFFICE_PROCESS:
            return {
                ...state,
                isLoading: true,
            };
        case SALES_OFFICE_SUCCESS:
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
        case SALES_OFFICE_FAILED:
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

function SalesOfficeContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <SalesOfficeContext.Provider value={{ state, dispatch }}>
            {children}
        </SalesOfficeContext.Provider>
    );
}

export { SalesOfficeContext, SalesOfficeContextProvider };

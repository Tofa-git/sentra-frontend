import { createContext, useReducer } from "react";

import {
    SUPPLIER_FAILED,
    SUPPLIER_PROCESS,
    SUPPLIER_SUCCESS,
} from "../constant";

const SupplierContext = createContext();

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
        case SUPPLIER_PROCESS:
            return {
                ...state,
                isLoading: true,
            };
        case SUPPLIER_SUCCESS:
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
        case SUPPLIER_FAILED:
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

function SupplierContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <SupplierContext.Provider value={{ state, dispatch }}>
            {children}
        </SupplierContext.Provider>
    );
}

export { SupplierContext, SupplierContextProvider };

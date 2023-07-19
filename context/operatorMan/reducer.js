import { createContext, useReducer } from "react";

import {
    OPERATOR_MANAGEMENT_FAILED,
    OPERATOR_MANAGEMENT_PROCESS,
    OPERATOR_MANAGEMENT_SUCCESS,
} from "../constant";

const OperatorManContext = createContext();

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
        case OPERATOR_MANAGEMENT_PROCESS:
            return {
                ...state,
                isLoading: true,
            };
        case OPERATOR_MANAGEMENT_SUCCESS:
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
                console.log(action.payload.data)          
                console.log(changedState)
                console.log(state)
                return {
                    ...state,
                    ...changedState,
                    data: action.payload.data,
                };
            }
        case OPERATOR_MANAGEMENT_FAILED:
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

function OperatorManContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <OperatorManContext.Provider value={{ state, dispatch }}>
            {children}
        </OperatorManContext.Provider>
    );
}

export { OperatorManContext, OperatorManContextProvider };

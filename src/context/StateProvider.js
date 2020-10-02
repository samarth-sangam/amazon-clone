import React, { createContext, useContext, useReducer } from 'react';

// Prepare the data layer
export const StateContext = createContext();

// Wrapper with StateContext Provider HOC 
export const StateProvider = ( { reducer, initialState, children } ) => (
    <StateContext.Provider value={ useReducer( reducer, initialState ) }>
        {children }
    </StateContext.Provider>
);

// pull information from the data layer
export const useStateValue = () => useContext( StateContext );
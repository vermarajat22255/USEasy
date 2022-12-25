import React, { useContext, useReducer, useState } from "react";
import { CLEAR_ALERT, DISPLAY_ALERT, REGISTER_USER_BEGIN, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR } from "./actions";
import reducer from './reducer'
import axios from 'axios'

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: '',
    token: '',
    userLocation: '',
    jobLocation: ''
}

const AppContext = React.createContext()

const AppProvider = ( { children } ) => {
    const [ state, dispatch ] = useReducer( reducer, initialState )

    const displayAlert = () => {
        dispatch( { type: DISPLAY_ALERT } )
        clearAlert()
    }
    const clearAlert = () => {
        setTimeout( () => {
            dispatch( { type: CLEAR_ALERT } )
        }, 3000 )
    }
    const registerUser = async ( currentUser ) => {
        dispatch( { type: REGISTER_USER_BEGIN } )
        try {
            const resp = await axios.post( '/api/v1/auth/register', currentUser )
            console.log( resp );
            const { user, token, location } = resp.data
            dispatch( { type: REGISTER_USER_SUCCESS, payload: { user, token, location } } )
            // add to local storage

        }
        catch ( error ) {
            console.log( error.response );
            dispatch( { type: REGISTER_USER_ERROR, payload: { msg: error.response.data.msg } } )
        }
        clearAlert()
    }
    return (
        <AppContext.Provider value={ { ...state, displayAlert, clearAlert, registerUser } } >
            { children }
        </AppContext.Provider>
    )
}

const useAppContext = () => {
    return useContext( AppContext )
}
export { AppProvider, initialState, useAppContext }
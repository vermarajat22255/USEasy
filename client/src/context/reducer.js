import {
    DISPLAY_ALERT, CLEAR_ALERT, REGISTER_USER_BEGIN, REGISTER_USER_ERROR,
    REGISTER_USER_SUCCESS, LOGIN_USER_BEGIN, LOGIN_USER_ERROR, LOGIN_USER_SUCCESS,
    SETUP_USER_BEGIN, SETUP_USER_SUCCESS, SETUP_USER_ERROR
} from "./actions";
const reducer = ( state, action ) => {
    if ( action.type === DISPLAY_ALERT ) {
        return ( {
            ...state,
            showAlert: true,
            alertText: 'Please provide all the values',
            alertType: 'danger'
        } )
    }
    if ( action.type === CLEAR_ALERT ) {
        return ( {
            ...state,
            showAlert: false,
            alertText: '',
            alertType: ''
        } )
    }
    if ( action.type === REGISTER_USER_BEGIN ) {
        return ( {
            ...state,
            isLoading: true
        } )
    }
    if ( action.type === REGISTER_USER_SUCCESS ) {
        return ( {
            ...state,
            isLoading: false,
            token: action.payload.token,
            user: action.payload.user,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
            showAlert: true,
            alertText: 'Register User Success, redirecting...',
            alertType: 'success'
        } )
    }
    if ( action.type === REGISTER_USER_ERROR ) {
        return ( {
            ...state,
            isLoading: false,
            showAlert: true,
            alertText: action.payload.msg,
            alertType: 'danger'
        } )
    }
    if ( action.type === LOGIN_USER_BEGIN ) {
        return ( {
            ...state,
            isLoading: true
        } )
    }
    if ( action.type === LOGIN_USER_SUCCESS ) {
        return ( {
            ...state,
            isLoading: false,
            token: action.payload.token,
            user: action.payload.user,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
            showAlert: true,
            alertText: 'Login User Success, redirecting...',
            alertType: 'success'
        } )
    }
    if ( action.type === LOGIN_USER_ERROR ) {
        return ( {
            ...state,
            isLoading: false,
            showAlert: true,
            alertText: action.payload.msg,
            alertType: 'danger'
        } )
    }
    if ( action.type === SETUP_USER_BEGIN ) {
        return ( {
            ...state,
            isLoading: true
        } )
    }
    if ( action.type === SETUP_USER_SUCCESS ) {
        return ( {
            ...state,
            isLoading: false,
            token: action.payload.token,
            user: action.payload.user,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
            showAlert: true,
            alertText: action.payload.alertText,
            alertType: 'success'
        } )
    }
    if ( action.type === SETUP_USER_ERROR ) {
        return ( {
            ...state,
            isLoading: false,
            showAlert: true,
            alertText: action.payload.msg,
            alertType: 'danger'
        } )
    }
    throw new Error( `no such actions : ${ action.type }` )
}

export default reducer;
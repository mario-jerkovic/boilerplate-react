import { fetch } from '../../utils';

const LOAD = 'application-name/auth/LOAD';
const LOAD_SUCCESS = 'application-name/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'application-name/auth/LOAD_FAIL';
const LOGIN = 'application-name/auth/LOGIN';
const LOGIN_SUCCESS = 'application-name/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'application-name/auth/LOGIN_FAIL';
const LOGOUT = 'application-name/auth/LOGOUT';
const LOGOUT_SUCCESS = 'application-name/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'application-name/auth/LOGOUT_FAIL';

const initialState = {
    loaded: false,
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case LOAD:
            return {
                ...state,
                loading: true,
            };
        case LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                user: action.payload.user,
            };
        case LOAD_FAIL:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.payload.error,
            };
        case LOGIN:
            return {
                ...state,
                loggingIn: true,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loggingIn: false,
                user: action.payload.user,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                loggingIn: false,
                user: null,
                loginError: action.payload.error,
            };
        case LOGOUT:
            return {
                ...state,
                loggingOut: true,
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                loggingOut: false,
                user: null,
            };
        case LOGOUT_FAIL:
            return {
                ...state,
                loggingOut: false,
                logoutError: action.payload.error,
            };
        default:
            return state;
    }
}

export function isLoaded(globalState) {
    return globalState.auth && globalState.auth.loaded;
}

export function load() {
    return async (dispatch) => {
        try {
            dispatch({ type: LOAD });

            const user = await fetch('/loadAuth', 'GET');

            dispatch({ type: LOAD_SUCCESS, payload: { user } });
        } catch (error) {
            dispatch({ type: LOAD_FAIL, payload: { error } });
        }
    };
}

export function login({ username, password }) {
    return async (dispatch) => {
        try {
            dispatch({ type: LOGIN });

            const user = await fetch('/login', 'POST', { username, password });

            dispatch({ type: LOGIN_SUCCESS, payload: { user } });
        } catch (error) {
            dispatch({ type: LOGIN_FAIL, payload: { error } });
        }
    };
}

export function logout() {
    return async (dispatch) => {
        try {
            dispatch({ type: LOGOUT });

            await fetch('/logout', 'GET');

            dispatch({ type: LOGOUT_SUCCESS });
        } catch (error) {
            dispatch({ type: LOGOUT_FAIL, payload: { error } });
        }
    };
}

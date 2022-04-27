import { loginConstants } from '../constants/login.constants'

export function login_request(auth) {
    return {
        type: loginConstants.LOGIN_REQUEST,
        payload: auth
    }
}
export function login_success(auth) {
    return {
        type: loginConstants.LOGIN_SUCCESS,
        payload: auth
    }
}
export function login_failure(error) {
    return {
        type: loginConstants.LOGIN_FAILURE,
        error: error
    }
}

export function logout_request(details) {
    return {
        type: loginConstants.LOGOUT_REQUEST,
        payload: details
    }
}
export function logout_success(details) {
    return {
        type: loginConstants.LOGOUT_SUCCESS,
        payload: details
    }
}
export function logout_failure(error) {
    return {
        type: loginConstants.LOGOUT_FAILURE,
        payload: error
    }
}
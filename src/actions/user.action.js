import { userConstants } from '../constants/user.constants'

export function getUsers_request(users) {
    return {
        type: userConstants.GETUSERS_REQUEST,
        payload: users
    }
}
export function getUsers_success(users) {
    return {
        type: userConstants.GETUSERS_SUCCESS,
        payload: users
    }
}
export function getUsers_failure(error) {
    return {
        type: userConstants.GETUSERS_FAILURE,
        payload: error
    }
}
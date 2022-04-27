import { loginConstants } from "../constants/login.constants"

const initialState = {
    user : [],
    error: ''
}

export default function loignReducer(state = initialState, action) {
    switch(action.type) {
        case loginConstants.LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            }
        case loginConstants.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
                error: ''
            }
        case loginConstants.LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case loginConstants.LOGOUT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case loginConstants.LOGOUT_SUCCESS:
            return {
                ...state,
                user: []
            }
        case loginConstants.LOGOUT_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}
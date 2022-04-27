import { reportConstants } from '../constants/report.constants'
import { userConstants } from '../constants/user.constants'

const initialState = {
    invoices: [],
    items: [],
    users: []
}

export default function reportReducer(state = initialState, action) {
    switch(action.type) {
        case reportConstants.GETDAILYREPORT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case reportConstants.GETDAILYREPORT_SUCCESS:
            return {
                ...state,
                loading: false,
                invoices: action.payload,
                items: []
            }
        case reportConstants.GETDAILYREPORT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case reportConstants.GETITEMSFORINVOICE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case reportConstants.GETITEMSFORINVOICE_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload
            }
        case reportConstants.GETITEMSFORINVOICE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case reportConstants.RESET_REDUCER_DETAILS:
            return {
                ...state,
                invoices: [],
                items: [],
                users: []
            }
        //get all users for report
        case userConstants.GETUSERS_REQUEST:
        case userConstants.GETUSERS_SUCCESS:
            return {
                ...state,
                users: action.payload,
            }
        case userConstants.GETUSERS_FAILURE:
        default:
            return state
    }
}
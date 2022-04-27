import { invoiceConstants } from '../constants/invoice.constants'

const initialState = {
    id: 0,
    shoppingCartItems: [],
    isWritten: false
}

export default function invoiceReducer(state = initialState, action) {
    switch(action.type) {
        case invoiceConstants.GETID_REQUEST:
            return {
                ...state,
                loading: true
            }
        case invoiceConstants.GETID_SUCCESS:
            return {
                ...state,
                loading: false,
                id: action.payload
            }
        case invoiceConstants.GETID_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case invoiceConstants.SETINVOICEHEADER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case invoiceConstants.SETINVOICEHEADER_SUCCESS:
            return {
                ...state,
                loading: false,
                shoppingCartItems: action.payload
            }
        case invoiceConstants.SETINVOICEHEADER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case invoiceConstants.ADDITEMS_REQUEST:
        case invoiceConstants.ADDITEMS_SUCCES:
            return {
                ...state,
                isWritten: true
            }
        case invoiceConstants.ADDITEMS_FAILURE:
        case invoiceConstants.RESETWRITTENVALUE:
            return {
                ...state,
                isWritten: false
            }
        default:
            return state
    }
}
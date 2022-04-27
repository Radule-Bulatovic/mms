import { financeConstants } from "../constants/finance.constants"

const initialState = {
    analyticCard: [],
    balanceDetails: "",
    balanceOutDetails: ""
}

export default function financeReducer(state = initialState, action) {
    switch(action.type) {
        //actions for balance(saldo) all of time
        case financeConstants.GETBALANCE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case financeConstants.GETBALANCE_SUCCESS:
            return {
                ...state,
                loading: false,
                balanceDetails: action.payload
            }
        case financeConstants.GETBALANCE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        //get binance(saldo) for out of time
        case financeConstants.GETBALANCEOUT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case financeConstants.GETBALANCEOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                balanceOutDetails: action.payload
            }
        case financeConstants.GETBALANCEOUT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        //actions for get analytic card for supplier and konto
        case financeConstants.GETANALYTICALCARD_REQUEST:
            return {
                ...state,
                loading: true
            }
        case financeConstants.GETANALYTICALCARD_SUCCESS:
            return {
                ...state,
                loading: false,
                analyticCard: action.payload
            }
        case financeConstants.GETANALYTICALCARD_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}
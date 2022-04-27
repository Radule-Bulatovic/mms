import { financeConstants } from "../constants/finance.constants";


//get balance(saldo) for all
export function getBalance_request(details) {
    return {
        type: financeConstants.GETBALANCE_REQUEST,
        payload: details
    }
}
export function getBalance_success(details) {
    return {
        type: financeConstants.GETBALANCE_SUCCESS,
        payload: details
    }
}
export function getBalance_failure(error) {
    return {
        type: financeConstants.GETBALANCE_FAILURE,
        payload: error
    }
}

//get balance(saldo) for out of time
export function getBalance_out_request(details) {
    return {
        type: financeConstants.GETBALANCEOUT_REQUEST,
        payload: details
    }
}
export function getBalance_out_success(details) {
    return {
        type: financeConstants.GETBALANCEOUT_SUCCESS,
        payload: details
    }
}
export function getBalance_out_failure(error) {
    return {
        type: financeConstants.GETBALANCEOUT_FAILURE,
        payload: error
    }
}

//get analytic card for SUPPLIER and 'konto'
export function getAnalyticalCard_request(details) {
    return {
        type: financeConstants.GETANALYTICALCARD_REQUEST,
        payload: details
    }
}
export function getAnalyticalCard_success(details) {
    return {
        type: financeConstants.GETANALYTICALCARD_SUCCESS,
        payload: details
    }
}
export function getAnalyticalCard_failure(error) {
    return {
        type: financeConstants.GETANALYTICALCARD_FAILURE,
        payload: error
    }
}
//end
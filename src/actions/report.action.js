import { reportConstants } from "../constants/report.constants";

export function getDailyReport_request(invoices) {
    return {
        type: reportConstants.GETDAILYREPORT_REQUEST,
        payload: invoices
    }
}
export function getDailyReport_success(invoices) {
    return {
        type: reportConstants.GETDAILYREPORT_SUCCESS,
        payload: invoices
    }
}
export function getDailyReport_failure(error) {
    return {
        type: reportConstants.GETDAILYREPORT_FAILURE,
        payload: error
    }
}

export function getItemsForInvoice_request(items) {
    return {
        type: reportConstants.GETITEMSFORINVOICE_REQUEST,
        payload: items
    }
}
export function getItemsForInvoice_success(items) {
    return {
        type: reportConstants.GETITEMSFORINVOICE_SUCCESS,
        payload: items
    }
}
export function getItemsForInvoice_failure(error) {
    return {
        type: reportConstants.GETITEMSFORINVOICE_FAILURE,
        payload: error
    }
}
export function resetReducerReport(details) {
    return {
        type: reportConstants.RESET_REDUCER_DETAILS,
        payload: details
    }
}


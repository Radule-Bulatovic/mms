import { invoiceConstants } from '../constants/invoice.constants'

export function getId_request(id) {
    return {
        type: invoiceConstants.GETID_REQUEST,
        payload: id
    }
}
export function getId_success(id) {
    return {
        type: invoiceConstants.GETID_SUCCESS,
        payload: id
    }
}
export function getId_failure(error) {
    return {
        type: invoiceConstants.GETID_FAILURE,
        payload: error
    }
}

//set invoice header actions
export function setInvoiceHeader_request(action){
    return {
        type: invoiceConstants.SETINVOICEHEADER_REQUEST,
        payload: action
    }
}
// id,user_id,company_id,shop_id,date,kni,storno,preuzeto,datetime,brfak
export function setInvoiceHeader_success(action){
    return {
        type: invoiceConstants.SETINVOICEHEADER_SUCCESS,
        payload: action
    }
}
export function setInvoiceHeader_failure(error){
    return {
        type: invoiceConstants.SETINVOICEHEADER_FAILURE,
        payload: error
    }
}
//
//actions for adding items in invoice
 export function addItems_request(items){
     return {
         type: invoiceConstants.ADDITEMS_REQUEST,
         payload: items
     }
 }
 export function addItems_success(items){
    return {
        type: invoiceConstants.ADDITEMS_SUCCES,
        payload: items
    }
}
export function addItems_failure(error) {
    return {
        type: invoiceConstants.ADDITEMS_FAILURE,
        payload: error
    }
}

export function resetIsWrittenValueItem(item) {
    return {
        type: invoiceConstants.RESETWRITTENVALUE,
        payload: item
    }
}   
import { takeEvery, put, call} from 'redux-saga/effects'
import { reportConstants } from '../constants/report.constants'
import { getDailyReport_failure, getDailyReport_success, getItemsForInvoice_failure, getItemsForInvoice_success } from '../actions/report.action'
import { getInvoicesForData_api, getItemsForInvoice_api, getUsersForReport_api } from '../api/test.api'
import { userConstants } from '../constants/user.constants'
import { getUsers_failure, getUsers_success } from '../actions/user.action'

//saga for get balance(saldo) for all time
export function* getDailyReport(action) {
    const response = yield call(getInvoicesForData_api, action.payload)
    if(!response && (!response.data || !response.message)) {
        return yield put(getDailyReport_failure('Internal server error for loading daily invoices'))
    }
    if(response.status === 200) {
        return yield put(getDailyReport_success(response.data))
    } 
    else {
        return yield put(getDailyReport_failure('Error for loading daily invoices'))
    }
}

export function* getItemsForInvoice(action) {
    const response = yield call(getItemsForInvoice_api, action.payload)
    if(!response && (!response.data || !response.message)) {
        return yield put(getItemsForInvoice_failure("Internal server error for loading items for invoice"))
    }
    if(response.status === 200) {
        return yield put(getItemsForInvoice_success(response.data))
    } 
    else {
        return yield put(getItemsForInvoice_failure("Error for loading items for invoice"))
    }
}

export function* getUsersForReport() {
    const response = yield call(getUsersForReport_api)
    if(!response && (!response.data || !response.message)) {
        return yield put(getUsers_failure("Internal server error for loading users for report"))
    }
    if(response.status === 200) {
        return yield put(getUsers_success(response.data))
    } 
    else {
        return yield put(getUsers_failure("Error for loading users for report"))
    }
}

export function* reportSaga() {
    yield takeEvery(reportConstants.GETDAILYREPORT_REQUEST, getDailyReport)
    yield takeEvery(reportConstants.GETITEMSFORINVOICE_REQUEST, getItemsForInvoice)
    yield takeEvery(userConstants.GETUSERS_REQUEST, getUsersForReport)
}
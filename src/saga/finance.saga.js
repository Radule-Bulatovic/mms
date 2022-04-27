import { takeEvery, put, call} from 'redux-saga/effects'
import { financeConstants } from '../constants/finance.constants'
import { getAnalyticCard_api, getBalance_api, getBalanceOut_api } from '../api/test.api'
import { getAnalyticalCard_failure, getAnalyticalCard_success, getBalance_failure, getBalance_success, getBalance_out_failure, getBalance_out_success } from '../actions/finance.action';

//saga for get balance(saldo) for all time
export function* getBalance(action) {
    const response = yield call(getBalance_api, action.payload)
    if(!response && (!response.data || !response.message)) {
        return yield put(getBalance_failure('Internal server error for loading balance for all time'))
    }
    if(response.status === 200) {
        return yield put(getBalance_success(response.data))
    } 
    else {
        return yield put(getBalance_failure('Error for loading balance for all time'))
    }
}
//saga for get balance out of time - van valute
export function* getBalance_out(action) {
    const response = yield call(getBalanceOut_api, action.payload)
    if(!response && (!response.data || !response.message)) {
        return yield put(getBalance_out_failure('Internal server error for loading balance out of time'))
    }
    if(response.status === 200) {
        return yield put(getBalance_out_success(response.data))
    } 
    else {
        return yield put(getBalance_out_failure('Error for loading balance out of time'))
    }
}

export function* getAnalyticCard(action) {
    const response = yield call(getAnalyticCard_api, action.payload)
    if(!response && (!response.data || !response.message)) {
        return yield put(getAnalyticalCard_failure('Internal server error for loading analytic card'))
    }
    if(response.status === 200) {
        return yield put(getAnalyticalCard_success(response.data))
    } 
    else {
        return yield put(getAnalyticalCard_failure('Error for loading analytic card'))
    }
}

export function* financeSaga() {
    yield takeEvery(financeConstants.GETBALANCE_REQUEST, getBalance)
    yield takeEvery(financeConstants.GETBALANCEOUT_REQUEST, getBalance_out)
    yield takeEvery(financeConstants.GETANALYTICALCARD_REQUEST, getAnalyticCard)
}
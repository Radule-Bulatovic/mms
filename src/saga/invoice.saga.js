import { takeEvery, put, call} from 'redux-saga/effects'
import { invoiceConstants } from '../constants/invoice.constants'
import { getMaxInvoiceId_api } from '../api/test.api'
import { getId_failure, getId_success, setInvoiceHeader_failure, setInvoiceHeader_success, addItems_failure } from '../actions/invoice.action'
import { setInvoiceHeader_api, setInvoiceItem_api } from '../api/test.api'
import { addItem_success } from '../actions/shoppingCart.action'

export function* getMaxId() {
    const response = yield call(getMaxInvoiceId_api)
    if(!response && (!response.data || !response.message)) {
        return yield put(getId_failure('Internal server error for loading max invoice id'))
    }
    if(response.status === 200) {
        return yield put(getId_success(response.data))
    } else {
        return yield put(getId_failure('Error for loading max invoice id'))
    }
}

export function* setInvoiceHeader(action) {
    // console.log('action in saga--------------------:'+ action);
    const response = yield call(setInvoiceHeader_api, action)
    if(!response && (!response.data || !response.message)) {
        return yield put(setInvoiceHeader_failure('Internal server error for set invoice header'))
    }
    if(response.status === 200) {
        return yield put(setInvoiceHeader_success(response.data))
    } else {
        return yield put(setInvoiceHeader_failure('Error for set invoice header'))
    }
}

export function* setInvoiceItem(action) {
    const response = yield call(setInvoiceItem_api, action)
    if(!response && (!response.data || !response.message)) {
        return yield put(addItems_failure('Internal server error for adding items in invoice'))
    }
    if(response.status === 200) {
        // localStorage.setItem('isWrittenInvoiceItem', response.data)
        return yield put(addItem_success(response.data))
    } else {
        return yield put(addItems_failure('Error for adding items in invoice'))
    }
}

export function* invoiceSaga() {
    yield takeEvery(invoiceConstants.GETID_REQUEST, getMaxId)
    yield takeEvery(invoiceConstants.SETINVOICEHEADER_REQUEST, setInvoiceHeader)
    yield takeEvery(invoiceConstants.ADDITEMS_REQUEST, setInvoiceItem)
} 
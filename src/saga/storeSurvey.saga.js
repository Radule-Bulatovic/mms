import { takeEvery, put, call} from 'redux-saga/effects'
import { getSSforComercAndDateAndCmpAndShop_failure, getSSforComercAndDateAndCmpAndShop_success, getSSforComercAndDate_failure, getSSforComercAndDate_success, getStoreSurveyAdmin_failure, getStoreSurveyAdmin_success, getStoreSurvey_failure, getStoreSurvey_success,postStoryServeyAdmin_failure,postStoryServeyAdmin_success,postStoryServey_failure, postStoryServey_success } from '../actions/storeSurvey.action'
import { getSSforComercAndDataAndCmpAndShop_api, getSSforComercAndData_api, getStoreSurveyAdmin_api, getStoreSurvey_api, postStoreSurveyAdmin_api, postStoreSurvey_api } from '../api/test.api'
import { storeSurvey } from '../constants/storeSurvey.constants'

export function* getStoreSurvey() {
    const response = yield call(getStoreSurvey_api)
    if(!response && (!response.data || !response.message)) {
        return yield put(getStoreSurvey_failure("Internal server error for loading shops for user"))
    }
    if(response.status === 200) {
        return yield put(getStoreSurvey_success(response.data))
    } else {
        return yield put(getStoreSurvey_failure("Error for loading shops for user"))
    }
}

export function* postStoreSurvey(action) {
    const response = yield call(postStoreSurvey_api, action)
    if(!response && (!response.data || !response.message)) {
        return yield put(postStoryServey_failure("Internal server error for writting date for store survey"))
    }
    if(response.status === 200) {
        // localStorage.setItem('isWrittenStoreSurvey', response.data)
        return yield put(postStoryServey_success(response.data))
    } else {
        return yield put(postStoryServey_failure("Error for writting date for store survey"))
    }
}

export function* postAdminStoreSurvey(action) {
    const response = yield call(postStoreSurveyAdmin_api, action)
    if(!response && (!response.data || !response.message)) {
        return yield put(postStoryServeyAdmin_failure("Internal server error for writting admin store survey history"))
    }
    if(response.status === 200) {
        return yield put(postStoryServeyAdmin_success(response.data))
    } else {
        return yield put(postStoryServeyAdmin_failure("Error for writting admin store survey history"))
    }
}

export function* getStoreSurveyAdmin() {
    const response = yield call(getStoreSurveyAdmin_api)
    if(!response && (!response.data || !response.message)) {
        return yield put(getStoreSurveyAdmin_failure("Internal server error for loading store survey for admin"))
    }
    if(response.status === 200) {
        return yield put(getStoreSurveyAdmin_success(response.data))
    } else {
        return yield put(getStoreSurveyAdmin_failure("Error for loading store survey for admin"))
    }
}

export function* getSSforComercAndDate(action) {
    const response = yield call(getSSforComercAndData_api, action)
    if(!response && (!response.data || !response.message)) {
        return yield put(getSSforComercAndDate_failure("Internal sever error for loading store survey"))
    }
    if(response.status === 200) {
        let _items = []
        for(var i=0; i<=response.data.length; i++) {
            if (response.data[i] === undefined) {
                break;
            }
            let exists = false;
            for(var j=0; j<_items.length;j++) {
                if (response.data[i].company_id === _items[j].company_id && response.data[i].shop_id === _items[j].shop_id) {
                    exists = true;
                    break;
                }
            }
            if (!exists) {
                _items.push(response.data[i]);
            }
        }
        // return yield put(getSSforComercAndDate_success(response.data))
        return yield put(getSSforComercAndDate_success(_items))
    } else {
        return yield put(getSSforComercAndDate_failure("Error for loading store survey"))
    }
}

export function* getSSforComercAndDateAndCmpAndShop(action) {
    const response = yield call(getSSforComercAndDataAndCmpAndShop_api, action)
    if(!response && (!response.data || !response.message)) {
        return yield put(getSSforComercAndDateAndCmpAndShop_failure("Internal sever error for loading store survey"))
    }
    if(response.status === 200) {
        return yield put(getSSforComercAndDateAndCmpAndShop_success(response.data))
    } else {
        return yield put(getSSforComercAndDateAndCmpAndShop_failure("Error for loading store survey"))
    }
}
export function* storeSurveySaga() {
    yield takeEvery(storeSurvey.GETSTORESURVEY_REQUEST, getStoreSurvey)
    yield takeEvery(storeSurvey.POSTSTORESURVEY_REQUEST, postStoreSurvey)
    yield takeEvery(storeSurvey.GETSTORESURVEYADMIN_REQUEST, getStoreSurveyAdmin)
    yield takeEvery(storeSurvey.POSTSTORESURVEYADMIN_REQUEST, postAdminStoreSurvey)
    yield takeEvery(storeSurvey.GETSSFORDATEANDCOM_REQUEST, getSSforComercAndDate)
    yield takeEvery(storeSurvey.GETSSFORDATEANDCOMANDCMPANDSHOP_REQUEST, getSSforComercAndDateAndCmpAndShop)
}
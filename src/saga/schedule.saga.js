import { takeEvery, put, call} from 'redux-saga/effects'
import { checkScheduleForVendorDate_failure, checkScheduleForVendorDate_success, writeScheduleHist_failure, writeScheduleHist_success } from '../actions/schedule.action'
import { checkScheduleVendorDate_api, postScheduleHist_api } from '../api/test.api'
import { scheduleConstants } from '../constants/schedule.constants'

export function* writeScheduleHist(action) {
    const response = yield call(postScheduleHist_api, action)
    if(!response && (!response.data || !response.message)) {
        return yield put(writeScheduleHist_failure("Internal server error for adding row in shedule history"))
    }
    if(response.status === 200) {
        // localStorage.setItem('isWrittenSchedule', response.data)
        return yield put(writeScheduleHist_success(response.data))
    } else {
        return yield put(writeScheduleHist_failure("Error for adding row in shedule history"))
    }
}

export function* checkScheduleVendorDate(action) {
    const response = yield call(checkScheduleVendorDate_api, action)
    if(!response && (!response.data || !response.message)) {
        return yield put(checkScheduleForVendorDate_failure('Internal server error for loading schedule history'))
    }
    if(response.status === 200) {
        return yield put(checkScheduleForVendorDate_success(response.data))
    } else {
        return yield put(checkScheduleForVendorDate_failure('Internal server error for loading schedule history'))
    }
}

export function* scheduleSaga() {
    yield takeEvery(scheduleConstants.WRITE_SCHEDULE_HIST_REQUEST, writeScheduleHist)
    yield takeEvery(scheduleConstants.CHECKSCHEDULEFORVENDORANDDATE_REQUEST, checkScheduleVendorDate)
}
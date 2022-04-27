import { takeEvery, put, call} from 'redux-saga/effects'
import { groupConstants } from '../constants/group.constants'
import { getGroups_api } from '../api/test.api'
import { getGroups_failure, getGroups_success } from '../actions/group.action'


export function* getGroups() {
    const response = yield call(getGroups_api)
    if(!response && (!response.data || !response.message)) {
        return yield put(getGroups_failure('Internal server error for loading groups for small company'))
    }
    if(response.status === 200) {
        return yield put(getGroups_success(response.data))
    } else {
        return yield put(getGroups_failure('Error for loading groups for small company'))
    }
}

export function* groupSaga() {
    yield takeEvery(groupConstants.GETGROUP_REQUEST, getGroups)
}
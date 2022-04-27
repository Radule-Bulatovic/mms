import { takeEvery, put, call} from 'redux-saga/effects'
import { loginConstants } from '../constants/login.constants';
import { login_failure, login_success, logout_failure, logout_success } from '../actions/login.actions';
import { login_api, logout_api } from '../api/test.api';

export function* login(action) {
    const response = yield call(login_api, action)
    if(!response && (!response.data || !response.message)) {
        return yield put(login_failure('Internal server error for login user'))
    }
    if(response.status === 200) {
        // localStorage.setItem('user', response.data.user.name)
        // localStorage.setItem('operater', response.data.user.operater)
        localStorage.setItem('token', response.data.token)
        return yield put(login_success(response.data))
    } 
    if(response.status_code === 403) {
        return yield put(login_failure('Neuspješan login!'))
    }
    else {
        return yield put(login_failure('Error for login user'))
    }
}

export function* logout() {
    const response = yield call(logout_api)
    if(!response && (!response.data || !response.message)) {
        return logout_failure('Internal server error for logout')
    }
    if(response.status === 200) {
        localStorage.removeItem('token')
        return logout_success(response.data)
    } 
    else {
        return logout_failure('Error for logout')
    }
}

export function* loginSaga() {
    yield takeEvery(loginConstants.LOGIN_REQUEST, login)
    yield takeEvery(loginConstants.LOGOUT_REQUEST, logout)
}
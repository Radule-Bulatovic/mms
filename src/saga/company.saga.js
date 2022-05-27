import { takeEvery, put, call } from "redux-saga/effects";
import {
  getCompany_api,
  getShopsForCompany_api,
  getShopsForUser_api,
  getSuppForCmp_api,
} from "../api/test.api";
import {
  getCompany_failure,
  getCompany_success,
  getShopsForCompany_request,
  getShopsForCompany_success,
  getShopsForUser_failure,
  getShopsForUser_success,
} from "../actions/company.actions";
import { companyConstants } from "../constants/company.constants";
import {
  getSuppForCmp_failure,
  getSuppForCmp_success,
} from "../actions/category.actions";
import { categoryConstants } from "../constants/category.constants";

export function* getCompany() {
  const response = yield call(getCompany_api);
  if (!response && (!response.data || !response.message)) {
    return yield put(
      getCompany_failure("Internal server error for loading company")
    );
  }
  if (response.status === 200) {
    return yield put(getCompany_success(response.data));
  } else {
    return yield put(getCompany_failure("Error for get company"));
  }
}

export function* getShopsForCompany(action) {
  const response = yield call(getShopsForCompany_api, action.payload);
  if (!response && (!response.data || !response.message)) {
    return yield put(
      getShopsForCompany_request("Internal server error for loading shops")
    );
  }
  if (response.status === 200) {
    return yield put(getShopsForCompany_success(response.data));
  } else {
    return yield put(getShopsForCompany_request("Error for loading shops"));
  }
}

export function* getShopsForUser(action) {
  const response = yield call(getShopsForUser_api, action.payload);
  if (!response && (!response.data || !response.message)) {
    return yield put(
      getShopsForUser_failure(
        "Internal server error for loading shops for user"
      )
    );
  }
  if (response.status === 200) {
    return yield put(getShopsForUser_success(response.data));
  } else {
    return yield put(
      getShopsForUser_failure("Error for loading shops for user")
    );
  }
}

export function* getSuppForCmp(action) {
  const response = yield call(getSuppForCmp_api, action.payload);
  if (!response && (!response.data || !response.message)) {
    return yield put(
      getSuppForCmp_failure(
        "Internal server error for loading suppliers for company"
      )
    );
  }
  if (response.status === 200) {
    return yield put(getSuppForCmp_success(response.data));
  } else {
    return yield put(
      getSuppForCmp_failure("Rrror for loading suppliers for company")
    );
  }
}

export function* companySaga() {
  yield takeEvery(companyConstants.GETCOMPANY_REQUEST, getCompany);
  yield takeEvery(
    companyConstants.GETSHOPSFORCOMPANY_REQUEST,
    getShopsForCompany
  );
  yield takeEvery(companyConstants.GETSHOPSFORUSER_REQUEST, getShopsForUser);
  yield takeEvery(categoryConstants.GETSUPPFORCMP_REQUEST, getSuppForCmp);
}

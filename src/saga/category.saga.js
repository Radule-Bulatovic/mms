import { takeEvery, put, call} from 'redux-saga/effects'
import { categoryConstants } from '../constants/category.constants'
import { getSuppForCmp_api, getCategoryForSuppAndCmp_api } from '../api/test.api'
import {getCategoryForSuppCmp_failure, getCategoryForSuppCmp_success, getSuppForCmp_failure, getSuppForCmp_success} from '../actions/category.actions'



export function* getSuppliersForCompany(action) {
    const response = yield call(getSuppForCmp_api, action.payload)
    if(!response && (!response.data || !response.message)) {
        return yield put(getSuppForCmp_failure('Internal server error for loading company'))
    }
    if(response.status === 200) {
        let _suppliers = []
        for(var i=0; i<=response.data.length; i++) {
            if (response.data[i] === undefined) {
                break;
            }
            let exists = false;
            for(var j=0; j<_suppliers.length;j++) {
                if (response.data[i].supplier_id === _suppliers[j].supplier_id) {
                    exists = true;
                    break;
                }
            }
            if (!exists) {
                _suppliers.push(response.data[i]);
            }
        }
        return yield put(getSuppForCmp_success(_suppliers))
    } 
    else {
        return yield put(getSuppForCmp_failure('Error for get company'))
    }
}

//get groups for supplier categoru, Lakovic->Kozmetik-> grupe
export function* getCategoryForSuppCmp(action) {
    if (!action.payload || !action.cat) {
        return yield put(getCategoryForSuppCmp_success([]));
    }
    const response = yield call(getCategoryForSuppAndCmp_api, action.payload, action.cat)
    if(!response && (!response.data || !response.message)) {
        return yield put(getCategoryForSuppCmp_failure('Internal server error for loading category for suppliers and company'))
    }
    if(response.status === 200) {
        let _categories = []
        for(var i=0; i<=response.data.length; i++) {
            if (response.data[i] === undefined) {
                break;
            }
            let exists = false;
            for(var j=0; j<_categories.length;j++) {
                if (response.data[i].group_id === _categories[j].group_id) {
                    exists = true;
                    break;
                }
            }
            if (!exists) {
                _categories.push(response.data[i]);
            }
        }
        return yield put(getCategoryForSuppCmp_success(_categories))
    } 
    else {
        return yield put(getCategoryForSuppCmp_failure('Error for loading category for suppliers and company'))
    }
}

export function* categorySaga() {
    yield takeEvery(categoryConstants.GETSUPPFORCMP_REQUEST, getSuppliersForCompany)
    yield takeEvery(categoryConstants.GETCATFORSUPPCMP_REQUEST, getCategoryForSuppCmp)
}
import { storeSurvey } from "../constants/storeSurvey.constants";
//
//get store survey for stores
//
export function getStoreSurvey_request(stores) {
    return {
        type: storeSurvey.GETSTORESURVEY_REQUEST,
        payload: stores
    }
}
export function getStoreSurvey_success(stores) {
    return {
        type: storeSurvey.GETSTORESURVEY_SUCCESS,
        payload: stores
    }
}
export function getStoreSurvey_failure(error) {
    return {
        type: storeSurvey.GETSTORESURVEY_FAILURE,
        payload: error
    }
}
//
//end
//

//
// post store survey for store/user/date
//
export function postStoryServey_request(details) {
    return {
        type: storeSurvey.POSTSTORESURVEY_REQUEST,
        payload: details
    }
}
export function postStoryServey_success(details) {
    return {
        type: storeSurvey.POSTSTORESURVEY_SUCCESS,
        payload: details
    }
}
export function postStoryServey_failure(error) {
    return {
        type: storeSurvey.POSTSTORESURVEY_FAILURE,
        payload: error
    }
}
//
//end
//

//
//get store survey for stores - ADMIN
//
export function getStoreSurveyAdmin_request(stores) {
    return {
        type: storeSurvey.GETSTORESURVEYADMIN_REQUEST,
        payload: stores
    }
}
export function getStoreSurveyAdmin_success(stores) {
    return {
        type: storeSurvey.GETSTORESURVEYADMIN_SUCCESS,
        payload: stores
    }
}
export function getStoreSurveyAdmin_failure(error) {
    return {
        type: storeSurvey.GETSTORESURVEYADMIN_FAILURE,
        payload: error
    }
}
//
//end
//

//
// post store survey for store/user/date - ADMIN
//
export function postStoryServeyAdmin_request(details) {
    return {
        type: storeSurvey.POSTSTORESURVEYADMIN_REQUEST,
        payload: details
    }
}
export function postStoryServeyAdmin_success(details) {
    return {
        type: storeSurvey.POSTSTORESURVEYADMIN_SUCCESS,
        payload: details
    }
}
export function postStoryServeyAdmin_failure(error) {
    return {
        type: storeSurvey.POSTSTORESURVEYADMIN_FAILURE,
        payload: error
    }
}
//
//end
//

export function resetIsWrittenValueStore(item) {
    return {
        type: storeSurvey.RESETWRITTENVALUE,
        payload: item
    }
}

//get all ss for comer. and date
export function getSSforComercAndDate_request(item) {
    return {
        type: storeSurvey.GETSSFORDATEANDCOM_REQUEST,
        payload: item
    }
}
export function getSSforComercAndDate_success(item) {
    return {
        type: storeSurvey.GETSSFORDATEANDCOM_SUCCESS,
        payload: item
    }
}
export function getSSforComercAndDate_failure(error) {
    return {
        type: storeSurvey.GETSSFORDATEANDCOM_FAILURE,
        payload: error
    }
}

// get all for comer. date shop and company
export function getSSforComercAndDateAndCmpAndShop_request(item){
    return {
        type: storeSurvey.GETSSFORDATEANDCOMANDCMPANDSHOP_REQUEST,
        payload: item
    }
}
export function getSSforComercAndDateAndCmpAndShop_success(item){
    return {
        type: storeSurvey.GETSSFORDATEANDCOMANDCMPANDSHOPT_SUCCESS,
        payload: item
    }
}
export function getSSforComercAndDateAndCmpAndShop_failure(error){
    return {
        type: storeSurvey.GETSSFORDATEANDCOMANDCMPANDSHOP_FAILURE,
        payload: error
    }
}
export function resetStoreSurveyValues(item) {
    return {
        type: storeSurvey.RESETSTORESURVEYVALUE,
        payload: item
    }
}
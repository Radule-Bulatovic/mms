import { storeSurvey } from "../constants/storeSurvey.constants";

const initialState = {
    stores: [],
    isWritten: false,
    storesForComAndDate: [],
    storesForComAndDateAndCmpAndSop: [],
    isLoadedData: false
}

export default function storeSurveyReducer(state = initialState, action) {
    switch(action.type) {
        case storeSurvey.GETSTORESURVEY_REQUEST:
        case storeSurvey.GETSTORESURVEY_SUCCESS:
            return {
                ...state,
                stores: action.payload,
                isLoadedData: true
            }
        case storeSurvey.GETSTORESURVEY_FAILURE:
            break;
        //post
        case storeSurvey.POSTSTORESURVEY_REQUEST:
            return {
                ...state,
                // isWritten: action.payload
                isWritten: false
            }
        case storeSurvey.POSTSTORESURVEY_SUCCESS:
            return {
                ...state,
                // isWritten: action.payload
                isWritten: true,
                isLoadedData: true

            }
        case storeSurvey.POSTSTORESURVEY_FAILURE:
            return {
                ...state,
                // isWritten: action.payload
                isWritten: false
            }
        case storeSurvey.GETSTORESURVEYADMIN_REQUEST:
        case storeSurvey.GETSTORESURVEYADMIN_SUCCESS:
            return {
                ...state,
                stores: action.payload,
                isLoadedData: true

            }
        case storeSurvey.GETSTORESURVEYADMIN_FAILURE:
        case storeSurvey.POSTSTORESURVEYADMIN_SUCCESS:
            return {
                ...state,
                // isWritten: action.payload
                isWritten: true
            }
        case storeSurvey.RESETWRITTENVALUE:
            return {
                ...state,
                isWritten: false
            }
        case storeSurvey.GETSSFORDATEANDCOM_REQUEST:
            return {
                ...state,
            }
        case storeSurvey.GETSSFORDATEANDCOM_SUCCESS:
            return {
                ...state,
                storesForComAndDate: action.payload,
                isLoadedData: true
            }
        case storeSurvey.GETSSFORDATEANDCOM_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case storeSurvey.GETSSFORDATEANDCOMANDCMPANDSHOP_REQUEST:
        case storeSurvey.GETSSFORDATEANDCOMANDCMPANDSHOPT_SUCCESS:
            return {
                ...state,
                storesForComAndDateAndCmpAndSop: action.payload,
                isLoadedData: true

            }
        case storeSurvey.GETSSFORDATEANDCOMANDCMPANDSHOP_FAILURE:
        case storeSurvey.RESETSTORESURVEYVALUE:
            return {
                ...state,
                stores: [],
                storesForComAndDate: [],
                storesForComAndDateAndCmpAndSop: []
            }
        default:
            return state
    }
}

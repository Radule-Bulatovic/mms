import { combineReducers } from "redux";
import  loginReducer  from './loignReducer'
import companyReducer from './companyReducer'
import orderReducer from './orderReducer'
import shoppingCartReducer from './shoppingCartReducer'
import articleReducer from './articleReducer'
import groupReducer from './groupReducer'
import invoiceReducer from './invoiceReducer'
import financeReducer from './financeReducer'
import reportReducer from './reportReducer'
import storeSurveyReducer from './storeSurveyReducer'
import scheduleReducer from "./scheduleReducer";

export default combineReducers({
    loginReducer,
    companyReducer,
    orderReducer,
    shoppingCartReducer,
    articleReducer,
    groupReducer,
    invoiceReducer,
    financeReducer,
    reportReducer,
    storeSurveyReducer,
    scheduleReducer
})
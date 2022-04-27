import { all } from 'redux-saga/effects'
import { loginSaga } from './login.saga'
import { companySaga } from './company.saga'
import { categorySaga } from './category.saga'
import { articleSaga } from './article.saga' 
import { groupSaga } from './group.saga'
import { invoiceSaga } from './invoice.saga' 
import { financeSaga } from './finance.saga'
import { reportSaga } from './report.saga'
import { storeSurveySaga } from './storeSurvey.saga'
import { scheduleSaga } from './schedule.saga'

export default function* rootSaga() {
    yield all([
        loginSaga(),
        companySaga(),
        categorySaga(),
        articleSaga(),
        groupSaga(),
        invoiceSaga(),
        financeSaga(),
        reportSaga(), 
        storeSurveySaga(),
        scheduleSaga(),
    ])
}
import { takeEvery, put, call} from 'redux-saga/effects'
import { articleContants } from '../constants/article.constants'
import { getArticlesForCmp_api, getArticles_api, getArticlesForGroup_api, searchAllArticles_api, searchArticlesForCmp_api, getArticlesForGroupSuppCmp_api } from '../api/test.api'
import { getArticleForCompany_failure, getArticleForCompany_success, getArticles_failure, getArticles_success, getArticlesForGroup_failure, getArticlesForGroup_success, searchAllArticle_failure, searchAllArticle_success, searchArticleForCmp_failure, searchArticleForCmp_success, getArticlesForGroupSuppCmp_falire, getArticlesForGroupSuppCmp_success } from '../actions/article.action'

//get articles for company(Lakovic)
export function* getArticleForCom(action) {
    const response = yield call(getArticlesForCmp_api, action.payload, action.page)
    if(!response && (!response.data || !response.message)) {
        return yield put(getArticleForCompany_failure('Internal server error for loading articles for company'))
    }
    if(response.status === 200) {
        return yield put(getArticleForCompany_success(response.data))
    } else {
        return yield put(getArticleForCompany_failure('Error for loading articles for company'))
    }
}

export function* getArticles(action) {
    const response = yield call(getArticles_api, action.payload)
    if(!response && (!response.data || !response.message)) {
        return yield put(getArticles_failure('Internal server error for loading articles'))
    }
    if(response.status === 200) {
        return yield put(getArticles_success(response.data))
    } else {
        return yield put(getArticles_failure('Error for loading articles'))
    }
}

//get articles for group - small company
export function* getArticlesForGroup(action) {
    const response = yield call(getArticlesForGroup_api, action.payload, action.page)    
    if(!response && (!response.data || !response.message)) {
        return yield put(getArticlesForGroup_failure('Internal server error for loadings articles group of small company'))
    }
    if(response.status === 200) {
        return yield put(getArticlesForGroup_success(response.data))
    } else {
        return yield put(getArticlesForGroup_failure('Rrror for loadings articles group of small company'))
    }
}

//GET article for group -> supplier -> company
export function* getArticlesForGroupSuppCmp(action) {
    const response = yield call(getArticlesForGroupSuppCmp_api, action.payload, action.supplier_id, action.group_id, action.page)    
    if(!response && (!response.data || !response.message)) {
        return yield put(getArticlesForGroupSuppCmp_falire('Internal server error for loading articles for group and supplier and company'))
    }
    if(response.status === 200) {
        let _articles = {
            data: []
        }
        for(var i=0; i<=response.data.data.length; i++) {
            if (response.data.data[i] === undefined) {
                break;
            }
            let exists = false;
            for(var j=0; j<_articles.data.length;j++) {
                if (response.data.data[i].article_id === _articles.data[j].article_id) {
                    exists = true;
                    break;
                }
            }
            if (!exists) {
                _articles.data.push(response.data.data[i]);
            }
        }
        return yield put(getArticlesForGroupSuppCmp_success(_articles))
    } else {
        return yield put(getArticlesForGroupSuppCmp_falire('Internal server error for loading articles for group and supplier and company'))
    }
}


//search all article-small company
export function* searchAllArticle(action) {
    const response = yield call(searchAllArticles_api, action.payload, action.page)
    if(!response && (!response.data || !response.message)) {
        return yield put(searchAllArticle_failure('Internal server error for search all article'))
    }
    if(response.status === 200) {
        return yield put(searchAllArticle_success(response.data))
    } else {
        return yield put(searchAllArticle_failure('Error for search all article'))
    }
}
//search article for company
export function* searchArticleForCmp(action) {
    const response = yield call(searchArticlesForCmp_api,action.payload, action.art, action.page)
    if(!response && (!response.data || !response.message)) {
        return yield put(searchArticleForCmp_failure('Internal server error for search article in company'))
    }
    if(response.status === 200) {
        return yield put(searchArticleForCmp_success(response.data))
    } else {
        return yield put(searchArticleForCmp_failure('Error for search article in company'))
    }
}

export function* articleSaga() {
    yield takeEvery(articleContants.GETARTICLEFORCOMPANY_REQUEST, getArticleForCom)
    yield takeEvery(articleContants.GETARTICLE_REQUEST, getArticles)
    yield takeEvery(articleContants.GETARTICLEFORGROUP_REQUEST, getArticlesForGroup)
    yield takeEvery(articleContants.SEARCHARTICLE_REQUEST, searchAllArticle)
    yield takeEvery(articleContants.SEARCHARTICLEFORCMP_REQUEST, searchArticleForCmp)
    yield takeEvery(articleContants.GETARTICLEFORGROUPSUPPCMP_REQUEST, getArticlesForGroupSuppCmp)
}
import { articleContants } from '../constants/article.constants'

export function getArticleForCompany_request(company, page) {
    return {
        type: articleContants.GETARTICLEFORCOMPANY_REQUEST,
        payload: company, page
    }
}

export function getArticleForCompany_success(company, page) {
    return {
        type: articleContants.GETARTICLEFORCOMPANY_SUCCESS,
        payload: company, page
    }
}

export function getArticleForCompany_failure(error) {
    return {
        type: articleContants.GETARTICLEFORCOMPANY_FAILURE,
        payload: error
    }
}

//get articles for small companies
export function getArticles_request(articles,page) {
    return {
        type: articleContants.GETARTICLE_REQUEST,
        payload: articles, page
    }
}
export function getArticles_success(articles, page) {
    return {
        type: articleContants.GETARTICLE_SUCCESS,
        payload: articles, page
    }
}
export function getArticles_failure(error) {
    return {
        type: articleContants.GETARTICLE_FAILURE,
        payload: error
    }
}

//small company
//get articles for group and small company
export function getArticlesForGroup_request(articles, page) {
    return {
        type: articleContants.GETARTICLEFORGROUP_REQUEST,
        payload: articles, page
    }
}
export function getArticlesForGroup_success(articles, page) {
    return {
        type: articleContants.GETARTICLEFORGROUP_SUCCESS,
        payload: articles, page
    }
}
export function getArticlesForGroup_failure(error) {
    return {
        type: articleContants.GETARTICLEFORGROUP_FAILURE,
        payload: error
    }
}

//GET article for group -> supplier -> company
export function getArticlesForGroupSuppCmp_request(company_id, supplier_id, group_id, page) {
    return {
        type: articleContants.GETARTICLEFORGROUPSUPPCMP_REQUEST,
        payload: company_id, supplier_id, group_id, page
    }
}
export function getArticlesForGroupSuppCmp_success(company_id, supplier_id, group_id, page) {
    return {
        type: articleContants.GETARTICLEFORGROUPSUPPCMP_SUCCESS,
        payload: company_id, supplier_id, group_id, page
    }
}
export function getArticlesForGroupSuppCmp_falire(error) {
    return {
        type: articleContants.GETARTICLEFORGROUPSUPPCMP_FAILURE,
        payload: error
    }
}
//

//search article for small cmp
export function searchAllArticle_request(art, page) {
    return {
        type: articleContants.SEARCHARTICLE_REQUEST,
        payload: art, page
    }
}
export function searchAllArticle_success(art, page) {
    return {
        type: articleContants.SEARCHARTICLE_SUCCESS,
        payload: art, page
    }
}
export function searchAllArticle_failure(error) {
    return {
        type: articleContants.SEARCHARTICLE_FAILURE,
        payload: error
    }
}
//seacrh article for big cmp
export function searchArticleForCmp_request(cmp, art, page) {
    return{
        type: articleContants.SEARCHARTICLEFORCMP_REQUEST,
        payload: cmp, art, page
    }
}
export function searchArticleForCmp_success(cmp, art, page) {
    return{
        type: articleContants.SEARCHARTICLEFORCMP_SUCCESS,
        payload: cmp, art, page
    }
}
export function searchArticleForCmp_failure(error) {
    return{
        type: articleContants.SEARCHARTICLEFORCMP_FAILURE,
        payload: error
    }
}
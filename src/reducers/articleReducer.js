import { articleContants } from '../constants/article.constants'

const initialState = {
    articles: []
}

export default function articleReducer(state = initialState, action) {
    switch(action.type) {
        case articleContants.GETARTICLEFORCOMPANY_REQUEST:
            return {
                ...state,
                loading: true
            }
        case articleContants.GETARTICLEFORCOMPANY_SUCCESS:
            return {
                ...state,
                loading: false,
                articles: action.payload
            }
        case articleContants.GETARTICLEFORCOMPANY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case articleContants.GETARTICLE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case articleContants.GETARTICLE_SUCCESS:
            return {
                ...state,
                loading: false,
                articles: action.payload
            }
        case articleContants.GETARTICLE_FAILURE:
            return {
                loading: false,
                error: action.payload
            }
        //articles for group - small company
        case articleContants.GETARTICLEFORGROUP_REQUEST:
            return {
                ...state,
                loading: true
            }
        case articleContants.GETARTICLEFORGROUP_SUCCESS:
            return {
                ...state,
                loading: false,
                articles: action.payload
            }
        case articleContants.GETARTICLEFORGROUP_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        //end

        //GET article for group -> supplier -> company
        case articleContants.GETARTICLEFORGROUPSUPPCMP_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case articleContants.GETARTICLEFORGROUPSUPPCMP_SUCCESS:
            return {
                ...state,
                loading: false,
                articles: action.payload
            }
        case articleContants.GETARTICLEFORGROUPSUPPCMP_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        //end

        //search article - all
        case articleContants.SEARCHARTICLE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case articleContants.SEARCHARTICLE_SUCCESS:
            return {
                ...state,
                loading: false,
                articles: action.payload
            }
        case articleContants.SEARCHARTICLE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        //end
        //search article for cmp
        case articleContants.SEARCHARTICLEFORCMP_REQUEST:
            return {
                ...state,
                loading: true
            }
        case articleContants.SEARCHARTICLEFORCMP_SUCCESS:
            return {
                ...state,
                loading: false,
                articles: action.payload
            }
        case articleContants.SEARCHARTICLEFORCMP_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        //end
        default:
            return state
    }
}
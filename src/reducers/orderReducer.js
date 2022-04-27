import { categoryConstants } from "../constants/category.constants"

const initialState = {
    articles: [],
    suppliers: [],
    categories: []
}

export default function orderReducer(state = initialState, action) {
    switch(action.type) {
        // Actions for get suppliers, category, items

        //get suppliers for company
        case categoryConstants.GETSUPPFORCMP_REQUEST:
            return{
                ...state,
                loading: true
            }
        case categoryConstants.GETSUPPFORCMP_SUCCESS:
            return {
                ...state,
                loading: false,
                suppliers: action.payload
            }
        case categoryConstants.GETSUPPFORCMP_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        //end

        //get category/groups for exact supplier and company
        case categoryConstants.GETCATFORSUPPCMP_REQUEST:
            return {
                ...state,
                loading: true
            }
        case categoryConstants.GETCATFORSUPPCMP_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: action.payload
            }
        case categoryConstants.GETCATFORSUPPCMP_FAILURE:
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
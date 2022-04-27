import { categoryConstants } from "../constants/category.constants";


//get all suppliers
export function getSuppliers_request(suppliers) {
    return {
        type: categoryConstants.GETSUPPLIERS_REQUEST,
        payload: suppliers
    }
}
export function getSuppliers_success(suppliers) {
    return {
        type: categoryConstants.GETSUPPLIERS_SUCCESS,
        payload: suppliers
    }
}
export function getSuppliers_failure(error) {
    return {
        type: categoryConstants.GETSUPPLIERS_FAILURE,
        payload: error
    }
}

//get category for exact supplier
export function getCategoryForSupp_request(cat) {
    return {
        type: categoryConstants.GETCATFORSUP_REQUEST,
        payload: cat
    }
}
export function getCategoryForSupp_success(cat) {
    return {
        type: categoryConstants.GETCATFORSUP_SUCCESS,
        payload: cat
    }
}
export function getCategoryForSupp_failure(error) {
    return {
        type: categoryConstants.GETCATFORSUP_FAILURE,
        payload: error
    }
}

//get sub category for exact cat
// export function getSubCat_request(sub) {
//     return {
//         type: categoryConstants.GETSUBCATFORSUP_REQUEST,
//         payload: sub
//     }
// }
// export function getSubCat_success(sub) {
//     return {
//         type: categoryConstants.GETSUBCATFORSUP_FAILURE,
//         payload: sub
//     }
// }
// export function getSubCat_failure(error) {
//     return {
//         type: categoryConstants.GETSUBCATFORSUP_FAILURE,
//         payload: error
//     }
// }


//get supplier for company - main sidebar
export function getSuppForCmp_request(cmp) {
    return {
        type: categoryConstants.GETSUPPFORCMP_REQUEST,
        payload: cmp
    }
}
export function getSuppForCmp_success(cmp) {
    return {
        type: categoryConstants.GETSUPPFORCMP_SUCCESS,
        payload: cmp
    }
}
export function getSuppForCmp_failure(error) {
    return {
        type: categoryConstants.GETSUPPFORCMP_FAILURE,
        payload: error
    }
}
//end

//get category for supplier and company
export function getCategoryForSuppCmp_request(supp, cat) {
    return {
        type: categoryConstants.GETCATFORSUPPCMP_REQUEST,
        payload: supp, cat
    }
}
export function getCategoryForSuppCmp_success(supp, cat) {
    return {
        type: categoryConstants.GETCATFORSUPPCMP_SUCCESS,
        payload: supp, cat
    }
}
export function getCategoryForSuppCmp_failure(error) {
    return {
        type: categoryConstants.GETCATFORSUPPCMP_FAILURE,
        payload: error
    }
}
//end
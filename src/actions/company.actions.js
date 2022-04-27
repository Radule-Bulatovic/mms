import { companyConstants } from "../constants/company.constants";

//get all companies
export function getCompany_request(company) {
    return {
        type: companyConstants.GETCOMPANY_REQUEST,
        payload: company
    }
}
export function getCompany_success(company) {
    return {
        type: companyConstants.GETCOMPANY_SUCCESS,
        payload: company
    }
}
export function getCompany_failure(error) {
    return {
        type: companyConstants.GETCOMPANY_FAILURE,
        payload: error
    }
}

//add company to state
export function addCompany_success(company) {
    return {
        type: companyConstants.ADDCOMPANY_SUCCESS,
        payload: company
    }
}
////////end/////////



//shops for company
export function getShopsForCompany_request(shops) {
    return {
        type: companyConstants.GETSHOPSFORCOMPANY_REQUEST,
        payload: shops
    }
}
export function getShopsForCompany_success(shops) {
    return {
        type: companyConstants.GETSHOPSFORCOMPANY_SUCCESS,
        payload: shops
    }
}
export function getShopsForCompany_failure(error) {
    return {
        type: companyConstants.GETSHOPSFORCOMPANY_FAILURE,
        payload: error
    }
}
//add company to state
export function addShop_success(company) {
    return {
        type: companyConstants.ADDSHOP_SUCCESS,
        payload: company
    }
}
////////end/////////


//get shops for user 
export function getShopsForUser_request(shops) {
    return {
        type: companyConstants.GETSHOPSFORUSER_REQUEST,
        payload: shops
    }
}

export function getShopsForUser_success(shops) {
    return {
        type: companyConstants.GETSHOPSFORUSER_SUCCESS,
        payload: shops
    }
}

export function getShopsForUser_failure(error) {
    return {
        type: companyConstants.GETSHOPSFORUSER_FAILURE,
        payload: error
    }
}
////////end/////////


//reset selected company and cart
export function resetSelectedCompany_success(cmp) {
    return {
        type: companyConstants.RESETSELECTEDCOMPANY_SUCCESS,
        payload: cmp
    }
}
export function resetSelectedShop_success(shop) {
    return {
        type: companyConstants.RESETSELECTEDSHOP_SUCCESS,
        payload: shop
    }
}
//
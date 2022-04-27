import { orderConstants } from "../constants/order.constants";

export function addToCart_request(item) {
    return {
        type: orderConstants.ADDITEMTOCART_REQUEST,
        payload: item
    }
}

export function addToCart_success(item) {
    return {
        type: orderConstants.ADDITEMTOCART_SUCCESS,
        payload: item
    }
}

export function addToCart_failure(error) {
    return {
        type: orderConstants.ADDITEMTOCART_FAILURE,
        payload: error
    }
}
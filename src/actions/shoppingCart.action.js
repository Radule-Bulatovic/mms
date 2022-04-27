import { shoppingCart } from "../constants/shoppingCart.constants";

//add item do cart
export function addItem_request(item) {
    return {
        type: shoppingCart.ADDITEM_REQUEST,
        payload: item
    }
}
export function addItem_success(item) {
    return {
        type: shoppingCart.ADDITEM_SUCCESS,
        payload: item
    }
}
export function addItem_failure(error) {
    return {
        type: shoppingCart.ADDITEM_FAILURE,
        payload: error
    }
}


//remove items from cart
export function deleteItem_request(item) {
    return {
        type: shoppingCart.DELETEITEM_REQUEST,
        payload: item
    }
}
export function deleteItem_success(item) {
    return {
        type: shoppingCart.DELETEITEM_SUCCESS,
        payload: item
    }
}
export function deleteItem_failure(error) {
    return {
        type: shoppingCart.DELETEITEM_FAILURE,
        payload: error
    }
}

//change quantity actions
export function changeQuantity_request(quantity) {
    return {
        type: shoppingCart.CHANGEQUANTITY_REQUEST,
        payload: quantity
    }
}
export function changeQuantity_success(quantity){
    return {
        type: shoppingCart.CHANGEQUANTITY_SUCCESS,
        payload: quantity
    }
}
export function changeQuantity_failure(error) {
    return {
        type: shoppingCart.CHANGEQUANTITY_FAILURE,
        payload: error
    }
}


export function checkItemSC_success(item) {
    return {
        type: shoppingCart.CHECKITEM_SUCCESS,
        payload: item
    }
}

//reset shopping cart
export function resetShoppingCart_success(cart) {
    return {
        type: shoppingCart.RESETSHOPPINGCART_SUCCESS,
        payload: cart
    }
}
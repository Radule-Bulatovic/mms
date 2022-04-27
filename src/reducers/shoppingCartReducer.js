import { shoppingCart } from "../constants/shoppingCart.constants"

const initialState = {
    items: [],
    total: 0,
    allow: true
}

export default function shoppingCartReducer(state = initialState, action) {
    switch(action.type) {
        //add item to cart
        case shoppingCart.ADDITEM_REQUEST:
            return {
                ...state,
                loading: true
            }
        case shoppingCart.ADDITEM_SUCCESS:
            var _allowedToAddInCart = true
            var _test = JSON.parse(localStorage.getItem('cart'))
            if(_test !== null) {
                if(_test.length === 0) {
                    _allowedToAddInCart = true
                } else {
                    _test.map(item => {   
                        if(item.article_id === action.payload.article_id) {
                            _allowedToAddInCart = false
                        } 
                        return _allowedToAddInCart
                    })
                }
            }
            
            if(_allowedToAddInCart) {
                var _itm
                if(action.payload === true) {
                    _itm = []
                } else {
                    var _items = JSON.parse(localStorage.getItem('cart'))
                    if(_items !== null) {
                        _itm = _items.concat([action.payload])
                        localStorage.setItem('cart',JSON.stringify(_itm))
                    } else {
                        _itm = state.items.concat([action.payload])
                        localStorage.setItem('cart',JSON.stringify(_itm))
                    }
                }
                return {
                    ...state,
                    loading: false,
                    allow: true,
                    items: _itm
                }
            } else {
                return {
                    ...state,
                    loading: false,
                    allow: false,
                    items: state.items,
                }
            }
        case shoppingCart.ADDITEM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        //change quantity in cart
        case shoppingCart.CHANGEQUANTITY_REQUEST:
        case shoppingCart.CHANGEQUANTITY_SUCCESS:
            var _total
            var items = JSON.parse(localStorage.getItem('cart'))

            const editedItems = items.map(item => {
                if(item.article_id === action.payload.id) {
                    return Object.assign({}, item, {
                        article_id: action.payload.id,
                        article_name: action.payload.name,
                        quantity: action.payload.quantity,
                        price: action.payload.price,
                        discount: action.payload.discount
                    })
                }
                return item
            })

            localStorage.setItem('cart',JSON.stringify(editedItems))

            return {
                items: editedItems,
                total: _total
            }
        // case shoppingCart.CHANGEQUANTITY_FAILURE:
        // //delete item from cart
        // case shoppingCart.DELETEITEM_REQUEST:
        case shoppingCart.DELETEITEM_SUCCESS:
            var storageItems = JSON.parse(localStorage.getItem('cart'))
            _items = storageItems.filter(item => item.article_id !== action.payload.article_id)
            localStorage.setItem('cart', JSON.stringify(_items))
            return {
                ...state,
                items: _items
                // localStorage.setItem('company',JSON.stringify(_items))
            }
        case shoppingCart.DELETEITEM_FAILURE:
        case shoppingCart.RESETSHOPPINGCART_SUCCESS:
            return {
                ...state,
                items: []
            }
        default:
            return state
    }
}
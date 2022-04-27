import { connect } from 'react-redux'
import { changeQuantity_success } from '../actions/shoppingCart.action'
import ShoppingCartItem from '../components/singleComponent/ShoppingCartItem'

const mapStateToProps = state => ({
    items: state.shoppingCartReducer.items,
    total: state.shoppingCartReducer.total
})

const mapDispatchToProps = dispatch => ({
    editQuantity: (item) => dispatch(changeQuantity_success(item))
})

const ShoppingCartItemCnt = connect(
    mapStateToProps,
    mapDispatchToProps
)(ShoppingCartItem)

export default ShoppingCartItemCnt
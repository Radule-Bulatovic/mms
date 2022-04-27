import { connect } from 'react-redux'
import Article from '../components/singleComponent/Article'
import { addItem_success, checkItemSC_success } from '../actions/shoppingCart.action'

const mapStateToProps = state => ({
    // allow: state.shoppingCartReducer.allow,
    items: state.shoppingCartReducer.items
})

const mapDispatchToProps = dispatch => ({
    addItem: (item) => dispatch(addItem_success(item)),
    checkItem: (item) => dispatch(checkItemSC_success(item))
})

const ArticleCnt = connect(
    mapStateToProps,
    mapDispatchToProps
)(Article)

export default ArticleCnt
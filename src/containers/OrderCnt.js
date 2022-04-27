import { connect } from 'react-redux'
import Order from '../components/Order'
// import { addToCart_success } from '../actions/order.actions'
import { getArticleForCompany_request, getArticles_request, getArticlesForGroup_request, searchAllArticle_request, searchArticleForCmp_request, getArticlesForGroupSuppCmp_request } from '../actions/article.action'
import { getSuppForCmp_request, getCategoryForSuppCmp_request } from '../actions/category.actions'
import { getGroups_request } from '../actions/group.action'
// import { checkItemSC_success } from '../actions/shoppingCart.action'

const mapStateToProps = state => ({
    user: state.loginReducer.user,
    company: state.companyReducer.selectedCompany,
    shop: state.companyReducer.selectedShop,
    articles: state.articleReducer.articles,
    suppliers: state.orderReducer.suppliers,
    categories: state.orderReducer.categories,
    allGroups: state.groupReducer.groups
})

const mapDispatchToProps = dispatch => ({
    getArticlesForCompany: (id, page) => dispatch(getArticleForCompany_request(id, page)),
    getSuppliersForCompany: (id) => dispatch(getSuppForCmp_request(id)),
    getCategoriesForSuppCmp: (company_id,supplier_id) => dispatch(getCategoryForSuppCmp_request(company_id, supplier_id)),
    getArticles: (page) => dispatch(getArticles_request(page)),
    getArticlesForGroupSuppCmp: (company_id, supplier_id, group_id, page) => dispatch(getArticlesForGroupSuppCmp_request(company_id, supplier_id, group_id, page)),
    getAllGroups: () => dispatch(getGroups_request()),
    getArticlesForGroup: (group_id, page) => dispatch(getArticlesForGroup_request(group_id, page)),
    searchAllArticles : (art, page) => dispatch(searchAllArticle_request(art, page)),
    searchArticleForCmp: (cmp, art, page) => dispatch(searchArticleForCmp_request(cmp, art, page))
})

const OrderCnt = connect(
    mapStateToProps,
    mapDispatchToProps
)(Order)

export default OrderCnt
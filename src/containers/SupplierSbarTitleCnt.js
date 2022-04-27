import { connect } from 'react-redux'
import SupplierSbarTitle from '../components/singleComponent/SupplierSbarTitle'
import { getArticlesForGroupSuppCmp_request } from '../actions/article.action'

const mapStateToProps = state => ({
    // user: state.loginReducer.user[0],
    company: state.companyReducer.selectedCompany,
    // shop: state.companyReducer.selectedShop,
    articles: state.articleReducer.articles,
    suppliers: state.orderReducer.suppliers,
    categories: state.orderReducer.categories,
    // allGroups: state.groupReducer.groups
})

const mapDispatchToProps = dispatch => ({
    getArticlesForGroupSuppCmp: (company_id, supplier_id, group_id, page) => dispatch(getArticlesForGroupSuppCmp_request(company_id, supplier_id, group_id, page)),
})

const SupplierSbarTitleCnt = connect(
    mapStateToProps,
    mapDispatchToProps
)(SupplierSbarTitle)

export default SupplierSbarTitleCnt
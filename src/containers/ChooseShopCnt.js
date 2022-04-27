import { connect } from 'react-redux'
import ChooseShop from '../components/ChooseShop'
import { getCompany_request, getShopsForCompany_request, addCompany_success, addShop_success } from '../actions/company.actions'
import { resetShoppingCart_success } from '../actions/shoppingCart.action'

const mapStateToProps = state => ({
    user: state.loginReducer.user,
    companies: state.companyReducer.companies,
    shops: state.companyReducer.shops,
    selectedCompany: state.companyReducer.selectedCompany,
    selectedShop: state.companyReducer.selectedShop
})

const mapDispatchToProps = dispatch => ({
    getCompany: () => dispatch(getCompany_request()),
    getShops: (id) => dispatch(getShopsForCompany_request(id)),
    addCompany: (company) => dispatch(addCompany_success(company)),
    addShop: (company) => dispatch(addShop_success(company)),
    resetShoppingCart: () => dispatch(resetShoppingCart_success()),
})

const ChooseShopCnt = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChooseShop)

export default ChooseShopCnt
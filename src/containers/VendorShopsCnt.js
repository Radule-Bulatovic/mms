import { connect } from 'react-redux'
import { getCompany_request, getShopsForCompany_request, getShopsForUser_request, addCompany_success, addShop_success } from '../actions/company.actions'
import VendorShops from '../components/VendorShops'
import { resetShoppingCart_success } from '../actions/shoppingCart.action'

const mapStateToProps = state => ({
    user: state.loginReducer.user,
    companies: state.companyReducer.companies,
    shops: state.companyReducer.shopsVendor,
    selectedCompany: state.companyReducer.selectedCompany,
    selectedShop: state.companyReducer.selectedShop
})

const mapDispatchToProps = dispatch => ({
    getCompany: () => dispatch(getCompany_request()),
    getShops: () => dispatch(getShopsForCompany_request()),
    addCompany: (company) => dispatch(addCompany_success(company)),
    addShop: (shop) => dispatch(addShop_success(shop)),
    getShopsForUser: (userId) => dispatch(getShopsForUser_request(userId)),
    resetShoppingCart: () => dispatch(resetShoppingCart_success()),
})

const VendorShopsCnt = connect(
    mapStateToProps,
    mapDispatchToProps
)(VendorShops)

export default VendorShopsCnt
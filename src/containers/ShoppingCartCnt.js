import { connect } from 'react-redux'
import ShoppingCart from '../components/ShoppingCart'
import { deleteItem_success, changeQuantity_success, resetShoppingCart_success } from '../actions/shoppingCart.action'
import { getId_request, setInvoiceHeader_request, addItems_request, resetIsWrittenValueItem } from '../actions/invoice.action'
import { logout_request } from '../actions/login.actions'
import { resetSelectedCompany_success, resetSelectedShop_success } from '../actions/company.actions'
import { postStoryServey_failure, postStoryServey_request, resetIsWrittenValueStore } from '../actions/storeSurvey.action'
import { resetIsWrittenValue, writeScheduleHist_request } from '../actions/schedule.action'

const mapStateToProps = state => ({
    items: state.shoppingCartReducer.items,
    total: state.shoppingCartReducer.total,
    id: state.invoiceReducer.id,
    shoppingCartItems: state.invoiceReducer.shoppingCartItems,
    //details for invoice
    user: state.loginReducer.user,
    company: state.companyReducer.selectedCompany,
    shop: state.companyReducer.selectedShop,

    isWrittenStoreSurvey: state.storeSurveyReducer.isWritten,
    isWrittenSchedule: state.scheduleReducer.isWritten,
    isWrittenInvoiceItem: state.invoiceReducer.isWritten
})

const mapDispatchToProps = dispatch => ({
    deleteItem: (item) => dispatch(deleteItem_success(item)),
    editQuantity: (item) => dispatch(changeQuantity_success(item)),
    getInvoiceId: () => dispatch(getId_request()),
    setInvoiceHeader: (header) => dispatch(setInvoiceHeader_request(header)),
    setInvoiceItems: (items) => dispatch(addItems_request(items)),
    resetShoppingCart: () => dispatch(resetShoppingCart_success()),
    resetSelectedCompany: () => dispatch(resetSelectedCompany_success()),
    resetSelectedShop: () => dispatch(resetSelectedShop_success()),
    logout: () => dispatch(logout_request()),
    storeSurvey: (detials) => dispatch(postStoryServey_request(detials)),
    writeScheduleHist: (details) => dispatch(writeScheduleHist_request(details)),
    //reset store survey status
    resetStoreSurvey: () => dispatch(postStoryServey_failure()),


    resetIsWrittenSchedule: () => dispatch(resetIsWrittenValue()),
    resetIsWrittenStore: () => dispatch(resetIsWrittenValueStore()),
    resetIsWrittenItem: () => dispatch(resetIsWrittenValueItem())
})

const ShoppingCartCnt = connect(
    mapStateToProps,
    mapDispatchToProps
)(ShoppingCart)

export default ShoppingCartCnt
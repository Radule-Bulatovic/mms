import { connect } from "react-redux";
import ShoppingCart from "../components/ShoppingCart";
import {
  deleteItem_success,
  resetShoppingCart_success,
} from "../actions/shoppingCart.action";
import { setInvoiceHeader_request } from "../actions/invoice.action";
import { postStoryServey_request } from "../actions/storeSurvey.action";
import { writeScheduleHist_request } from "../actions/schedule.action";

const mapStateToProps = (state) => ({
  items: state.shoppingCartReducer.items,
  total: state.shoppingCartReducer.total,
  id: state.invoiceReducer.id,
  shoppingCartItems: state.invoiceReducer.shoppingCartItems,
  user: state.loginReducer.user,
  company: state.companyReducer.selectedCompany,
  shop: state.companyReducer.selectedShop,
});

const mapDispatchToProps = (dispatch) => ({
  deleteItem: (item) => dispatch(deleteItem_success(item)),
  setInvoiceHeader: (header) => dispatch(setInvoiceHeader_request(header)),
  resetShoppingCart: () => dispatch(resetShoppingCart_success()),
  storeSurvey: (detials) => dispatch(postStoryServey_request(detials)),
  writeScheduleHist: (details) => dispatch(writeScheduleHist_request(details)),
});

const ShoppingCartCnt = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingCart);

export default ShoppingCartCnt;

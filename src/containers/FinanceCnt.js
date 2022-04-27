import { connect } from 'react-redux'
import Finance from '../components/Finance'
import { getAnalyticalCard_request, getBalance_request, getBalance_out_request } from '../actions/finance.action'
import { getCompany_request } from '../actions/company.actions'

const mapStateToProps = state => ({
    analyticCard: state.financeReducer.analyticCard,
    companies: state.companyReducer.companies,
    balanceDetails: state.financeReducer.balanceDetails,
    balanceOutDetails: state.financeReducer.balanceOutDetails
})

const mapDispatchToProps = dispatch => ({
    // get balande(saldo) for supplier id and konto, for all time, and out of time
    getBalance: (details) => dispatch(getBalance_request(details)),
    getBalance_out: (details) => dispatch(getBalance_out_request(details)),
    //get analytic card for supplier and konto
    //details = supplier_id, konto
    getAnalyticCard: (details) => dispatch(getAnalyticalCard_request(details)),
    //get all company
    getCompany: () => dispatch(getCompany_request())
})

const FinanceCnt = connect(
    mapStateToProps,
    mapDispatchToProps
)(Finance)

export default FinanceCnt
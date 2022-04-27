import { connect } from 'react-redux'
import DailyReport from '../components/DailyReport'
import { getDailyReport_request, getItemsForInvoice_request } from '../actions/report.action'

const mapStateToProps = state => ({
    invoices: state.reportReducer.invoices,
    items: state.reportReducer.items
})

const mapDispatchToProps = dispatch => ({
    getInvoicesForDate: (details) => dispatch(getDailyReport_request(details)),
    getItemsForInvoice: (invoice) => dispatch(getItemsForInvoice_request(invoice))
})

const DailyReportCnt = connect(
    mapStateToProps,
    mapDispatchToProps
)(DailyReport)

export default DailyReportCnt
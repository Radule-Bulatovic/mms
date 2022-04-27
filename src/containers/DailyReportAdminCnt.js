import { connect } from 'react-redux'
import { getDailyReport_request, getItemsForInvoice_request } from '../actions/report.action'
import DailyReportAdmin from '../components/DailyReportAdmin'

const mapStateToProps = state => ({
    invoices: state.reportReducer.invoices,
})

const mapDispatchToProps = dispatch => ({
    getInvoicesForDate: (details) => dispatch(getDailyReport_request(details)),
    // getItemsForInvoice: (invoice) => dispatch(getItemsForInvoice_request(invoice))
    getItemsForInvoice: (invoice) => dispatch(getItemsForInvoice_request(invoice))

})

const DailyReportAdminCnt = connect(
    mapStateToProps,
    mapDispatchToProps
)(DailyReportAdmin)

export default DailyReportAdminCnt
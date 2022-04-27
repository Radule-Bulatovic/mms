import { connect } from 'react-redux'
import Login from '../components/Login'
import { login_request } from '../actions/login.actions'
import { resetIsWrittenValue } from '../actions/schedule.action'
import { resetIsWrittenValueStore } from '../actions/storeSurvey.action'
import { resetIsWrittenValueItem } from '../actions/invoice.action'

const mapStateToProps = state => ({
    user: state.loginReducer.user,
    error: state.loginReducer.error,

    isWrittenStoreSurvey: state.storeSurveyReducer.isWritten,
    isWrittenSchedule: state.scheduleReducer.isWritten,
    isWrittenInvoiceItem: state.invoiceReducer.isWritten
})

const mapDispatchToProps = dispatch => ({
    login: (user) => dispatch(login_request(user)),

    resetIsWrittenSchedule: () => dispatch(resetIsWrittenValue()),
    resetIsWrittenStore: () => dispatch(resetIsWrittenValueStore()),
    resetIsWrittenItem: () => dispatch(resetIsWrittenValueItem())
})

const LoginCnt = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)

export default LoginCnt
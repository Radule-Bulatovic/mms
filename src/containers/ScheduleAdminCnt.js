import { connect } from 'react-redux'
import { checkScheduleForVendorDate_request } from '../actions/schedule.action'
import ScheduleAdmin from '../components/ScheduleAdmin'

const mapStateToProps = state => ({
    sheduleHist: state.scheduleReducer.sheduleHist
})

const mapDispatchToProps = dispatch => ({
    checkScheduleDetails: (details) => dispatch(checkScheduleForVendorDate_request(details))
})

const ScheduleAdminCnt = connect(
    mapStateToProps,
    mapDispatchToProps
)(ScheduleAdmin)

export default ScheduleAdminCnt
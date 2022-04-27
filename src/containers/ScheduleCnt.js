import { connect } from 'react-redux'
import Schedule from '../components/Schedule'
import { checkScheduleForVendorDate_request } from '../actions/schedule.action'


const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    checkScheduleDetails: (details) => dispatch(checkScheduleForVendorDate_request(details))
})

const ScheduleCnt = connect(
    mapStateToProps,
    mapDispatchToProps
)(Schedule)

export default ScheduleCnt
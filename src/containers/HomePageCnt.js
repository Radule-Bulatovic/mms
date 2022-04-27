import { connect } from 'react-redux'
import HomePage from '../components/HomePage'
import { logout_request } from '../actions/login.actions'
import { resetSelectedCompany_success, resetSelectedShop_success } from '../actions/company.actions'
import { postStoryServey_failure, resetStoreSurveyValues } from '../actions/storeSurvey.action'
import { restartSchedule } from '../actions/schedule.action'
import { resetReducerReport } from '../actions/report.action'

const mapStateToProps = state => ({
    user: state.loginReducer.user,
})

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout_request()),
    resetSelectedCompany: () => dispatch(resetSelectedCompany_success()),
    resetSelectedShop: () => dispatch(resetSelectedShop_success()),
            //set isWritten to false - reducer
    //show valid information of storing item in store survey history table
    restartStoreSurvey: () => dispatch(postStoryServey_failure()),
    //end
    //restart schedule history
    restartScheduleHistory: () => dispatch(restartSchedule()),
    //reset invoice/items and comercialist for admin reports
    restartReportReducer: () => dispatch(resetReducerReport()),
    resetStoreSurveyValues: () => dispatch(resetStoreSurveyValues())
})

const HomePageCnt = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage)

export default HomePageCnt
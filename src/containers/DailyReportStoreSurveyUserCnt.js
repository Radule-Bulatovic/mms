import { connect } from 'react-redux'
import { getSSforComercAndDateAndCmpAndShop_request, getSSforComercAndDate_request, resetStoreSurveyValues } from '../actions/storeSurvey.action'
import DailyReportStoreSurveyUser from '../components/DailyReportStoreSurveyUser'

const mapStateToProps = state => ({
    storesForComAndDate: state.storeSurveyReducer.storesForComAndDate,
    storesForComAndDateAndCmpAndSop: state.storeSurveyReducer.storesForComAndDateAndCmpAndSop,
})

const mapDispatchToProps = dispatch => ({
    resetStoreSurveyValues: () => dispatch(resetStoreSurveyValues()),
    getSSforComercAndDate: (details) => dispatch(getSSforComercAndDate_request(details)),
    getSSforComercAndDateAndCmpAndShop: (details) => dispatch(getSSforComercAndDateAndCmpAndShop_request(details))
})

const DailyReportStoreSurveyUserCnt = connect(
    mapStateToProps,
    mapDispatchToProps
)(DailyReportStoreSurveyUser)

export default DailyReportStoreSurveyUserCnt
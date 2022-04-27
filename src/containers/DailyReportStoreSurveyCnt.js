import { connect } from 'react-redux'
import { getSSforComercAndDateAndCmpAndShop_request, getSSforComercAndDate_request, resetStoreSurveyValues } from '../actions/storeSurvey.action'
import DailyReportStoreSurvey from '../components/DailyReportStoreSurvey'

const mapStateToProps = state => ({
    storesForComAndDate: state.storeSurveyReducer.storesForComAndDate,
    storesForComAndDateAndCmpAndSop: state.storeSurveyReducer.storesForComAndDateAndCmpAndSop,
})

const mapDispatchToProps = dispatch => ({
    resetStoreSurveyValues: () => dispatch(resetStoreSurveyValues()),
    getSSforComercAndDate: (details) => dispatch(getSSforComercAndDate_request(details)),
    getSSforComercAndDateAndCmpAndShop: (details) => dispatch(getSSforComercAndDateAndCmpAndShop_request(details))
})

const DailyReportStoreSurveyCnt = connect(
    mapStateToProps,
    mapDispatchToProps
)(DailyReportStoreSurvey)

export default DailyReportStoreSurveyCnt
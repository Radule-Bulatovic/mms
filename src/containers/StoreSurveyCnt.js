import { connect } from 'react-redux'
import { resetIsWrittenValueItem } from '../actions/invoice.action'
import { resetIsWrittenValue, writeScheduleHist_request } from '../actions/schedule.action'
import { postStoryServeyAdmin_request, postStoryServey_failure, postStoryServey_request, resetIsWrittenValueStore } from '../actions/storeSurvey.action'
import StoreSurvey from '../components/StoreSurvey'

const mapStateToProps = state => ({
    isWritten: state.storeSurveyReducer.isWritten
})

const mapDispatchToProps = dispatch => ({
    storeSurvey: (detials) => dispatch(postStoryServey_request(detials)),
    storeSurveyAdmin: (detials) => dispatch(postStoryServeyAdmin_request(detials)),
    restart: () => dispatch(postStoryServey_failure()),
    writeScheduleHist: (details) => dispatch(writeScheduleHist_request(details)),

    resetIsWrittenSchedule: () => dispatch(resetIsWrittenValue()),
    resetIsWrittenStore: () => dispatch(resetIsWrittenValueStore()),
    resetIsWrittenItem: () => dispatch(resetIsWrittenValueItem())
})

const StoreSurveyCnt = connect(
    mapStateToProps,
    mapDispatchToProps
)(StoreSurvey)

export default StoreSurveyCnt
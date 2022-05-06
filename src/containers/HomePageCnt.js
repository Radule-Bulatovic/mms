import { connect } from "react-redux";
import HomePage from "../components/HomePage";
import { logout_request } from "../actions/login.actions";
import {
  resetSelectedCompany_success,
  resetSelectedShop_success,
} from "../actions/company.actions";
import {
  postStoryServey_failure,
  resetIsWrittenValueStore,
  resetStoreSurveyValues,
} from "../actions/storeSurvey.action";
import {
  resetIsWrittenValue,
  restartSchedule,
} from "../actions/schedule.action";
import { resetReducerReport } from "../actions/report.action";

const mapStateToProps = (state) => ({
  user: state.loginReducer.user,
  isWrittenStoreSurvey: state.storeSurveyReducer.isWritten,
  isWrittenSchedule: state.scheduleReducer.isWritten,
});

const mapDispatchToProps = (dispatch) => ({
  resetIsWrittenSchedule: () => dispatch(resetIsWrittenValue()),
  resetIsWrittenStore: () => dispatch(resetIsWrittenValueStore()),
  logout: () => dispatch(logout_request()),
  resetSelectedCompany: () => dispatch(resetSelectedCompany_success()),
  resetSelectedShop: () => dispatch(resetSelectedShop_success()),
  restartStoreSurvey: () => dispatch(postStoryServey_failure()),
  restartScheduleHistory: () => dispatch(restartSchedule()),
  restartReportReducer: () => dispatch(resetReducerReport()),
  resetStoreSurveyValues: () => dispatch(resetStoreSurveyValues()),
});

const HomePageCnt = connect(mapStateToProps, mapDispatchToProps)(HomePage);

export default HomePageCnt;

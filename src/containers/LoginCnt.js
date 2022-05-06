import { connect } from "react-redux";
import Login from "../components/Login";
import { login_request } from "../actions/login.actions";
import { resetIsWrittenValue } from "../actions/schedule.action";
import { resetIsWrittenValueStore } from "../actions/storeSurvey.action";
import { resetIsWrittenValueItem } from "../actions/invoice.action";

const mapStateToProps = (state) => ({
  user: state.loginReducer.user,
  error: state.loginReducer.error,
});

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(login_request(user)),
});

const LoginCnt = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginCnt;

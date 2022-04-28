import React from "react";
import { withRouter } from "react-router-dom";
import { userPath } from "../constants/path";
import ModalSuccessOrder from "./ModalSuccessOrder";
import Loader from "./ui/Loader.tsx";
// import ModalSuccessOrder from './ModalSuccessOrder'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      user: [],
      isLoading: false,
      isWritten: false,

      showModal: false,
    };
  }

  componentDidMount() {
    this.resetFields();
  }

  static getDerivedStateFromProps(nextProps, prevProps) {
    let _user,
      _isLoading = false,
      _error;
    if (
      nextProps.user !== prevProps.user &&
      nextProps.user.details !== undefined &&
      localStorage.getItem("token") !== null
    ) {
      if (nextProps.user.details.name.length > 0) {
        _user = nextProps.user.details;
        _isLoading = false;
        _error = "";
      }
      return {
        user: _user,
        isLoading: _isLoading,
        error: _error,
      };
    }
    if (nextProps.error !== prevProps.error && nextProps.error !== undefined) {
      if (nextProps.error.length > 0 || prevProps.error.length) {
        _user = [];
        _isLoading = false;
        _error = "Neuspješan login!";
      }
      return {
        user: _user,
        isLoading: _isLoading,
        error: nextProps.error,
      };
    }

    if (
      nextProps.isWrittenStoreSurvey &&
      nextProps.isWrittenSchedule &&
      nextProps.isWrittenInvoiceItem
    ) {
      return {
        showModal: true,
      };
    }

    return null;
  }

  componentDidUpdate() {
    if (this.state.user.name !== undefined) {
      if (this.state.user.name.length > 0) {
        this.goToHomePage();
      }
    }
  }
  closeModal = () => {
    this.setState({
      showModal: false,
    });
    this.props.resetIsWrittenStore();
    this.props.resetIsWrittenSchedule();
    this.props.resetIsWrittenItem();
  };

  goToHomePage = () => {
    let path = userPath.homePage;
    this.props.history.push(path);
  };

  changeEmail = (e) => {
    this.setState({
      email: e.target.value,
      error: "",
    });
  };

  changePassword = (e) => {
    this.setState({
      password: e.target.value,
      error: "",
    });
  };

  submitForm = (e) => {
    e.preventDefault();
    let credentials = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.login(credentials);
    // this.resetFields()
    this.setState({ isLoading: true });
  };

  resetFields = () => {
    //da bi se onemogucio povratak na login paznju ne treba resetovati user-a
    this.setState({
      email: "",
      password: "",
      error: "",
      user: {
        name: "",
        operater: "",
      },
    });
  };

  // test = () => {
  //     let path = "testing"
  //     this.props.history.push(path)
  // }

  render() {
    return (
      <div className="card height-style col-lg-5 col-md-12 bck">
        <article className="card-body">
          <div className="card-title text-center mb-4 mt-1 setOpacity">
            <img src="mils-logo.png" className="logo-login" alt="user" />
          </div>
          <></>
          <h5 className="loginError">
            <span>{this.state.error}</span>
          </h5>
          <form
            name="loginForm"
            className="setLoginOpacity"
            onSubmit={this.submitForm}
          >
            {this.state.isLoading ? (
              <Loader />
            ) : (
              <div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend ">
                      <span className="input-group-text whiteSpan">
                        {/* <img className="imgStyle" src="boy.png" alt="user"></img> */}
                        <i className="fa fa-user"></i>
                      </span>
                    </div>
                    <input
                      className="form-control setFont"
                      placeholder="E-mail"
                      type="email"
                      value={this.state.email || ""}
                      onChange={this.changeEmail}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text whiteSpan">
                        {/* <img className="imgStyle" src="pass.png" alt="password"></img> */}
                        <i className="fa fa-lock"></i>
                      </span>
                    </div>
                    <input
                      className="form-control setFont"
                      placeholder="********"
                      type="password"
                      value={this.state.password || ""}
                      onChange={this.changePassword}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="input-group">
                    <button
                      className="btn btn-block loginBtn form-control "
                      type="submit"
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </article>

        <ModalSuccessOrder
          sureMessage="Uspjesno ste poslali narudzbu!"
          showModal={this.state.showModal}
          closeModal={this.closeModal}
        />
      </div>
    );
  }
}

export default withRouter(Login);

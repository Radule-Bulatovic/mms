import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { userPath } from "../constants/path";
import ModalSuccessOrder from "./ModalSuccessOrder";
import Loader from "./ui/Loader.tsx";
// import ModalSuccessOrder from './ModalSuccessOrder'

const Login = (props) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const [user, setuser] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [isWritten, setisWritten] = useState(false);
  const [showModal, setshowModal] = useState(true);

  const { error: _error, user: _user } = props;
  useEffect(() => {
    resetFields();
  }, []);

  useEffect(() => {
    if (_error?.length > 0 || _error?.length) {
      setuser([]);
      setisLoading(false);
      seterror("Neuspješan login!");
    }
  }, [_error]);

  // static getDerivedStateFromProps(nextProps, prevProps) {
  //   let _user,
  //     _isLoading = false,
  //     _error;
  //   if (
  //     nextProps.user !== prevProps.user &&
  //     nextProps.user.details !== undefined &&
  //     localStorage.getItem("token") !== null
  //   ) {
  //     if (nextProps.user.details.name.length > 0) {
  //       _user = nextProps.user.details;
  //       _isLoading = false;
  //       _error = "";
  //     }
  //     return {
  //       user: _user,
  //       isLoading: _isLoading,
  //       error: _error,
  //     };
  //   }
  //   if (nextProps.error !== prevProps.error && nextProps.error !== undefined) {
  //     if (nextProps.error.length > 0 || prevProps.error.length) {
  //       _user = [];
  //       _isLoading = false;
  //       _error = "Neuspješan login!";
  //     }
  //     return {
  //       user: _user,
  //       isLoading: _isLoading,
  //       error: nextProps.error,
  //     };
  //   }

  //   if (
  //     nextProps.isWrittenStoreSurvey &&
  //     nextProps.isWrittenSchedule &&
  //     nextProps.isWrittenInvoiceItem
  //   ) {
  //     return {
  //       showModal: true,
  //     };
  //   }

  //   return null;
  // }

  useEffect(() => {
    if (_user?.details?.name !== undefined) {
      if (_user.details.name.length > 0) {
        goToHomePage();
      }
    }
  }, [_user]);

  const closeModal = () => {
    setshowModal(false);
    props.resetIsWrittenStore();
    props.resetIsWrittenSchedule();
    props.resetIsWrittenItem();
  };

  const goToHomePage = () => {
    let path = userPath.homePage;
    props.history.push(path);
  };

  const changeEmail = (e) => {
    setemail(e.target.value);
    seterror("");
  };

  const changePassword = (e) => {
    setpassword(e.target.value);
    seterror("");
  };

  const submitForm = (e) => {
    e.preventDefault();
    let credentials = {
      email: email,
      password: password,
    };
    props.login(credentials);
    // resetFields()
    setisLoading(true);
  };

  const resetFields = () => {
    //da bi se onemogucio povratak na login paznju ne treba resetovati user-a
    setemail("");
    setpassword("");
    seterror("");
    setuser({
      name: "",
      operater: "",
    });
  };

  // test = () => {
  //     let path = "testing"
  //     props.history.push(path)
  // }

  return (
    <div className="card height-style col-lg-5 col-md-12 bck">
      <article className="card-body">
        <div className="card-title text-center mb-4 mt-1 setOpacity">
          <img src="mils-logo.png" className="logo-login" alt="user" />
        </div>
        <></>
        <h5 className="loginError">
          <span>{error}</span>
        </h5>
        <form
          name="loginForm"
          className="setLoginOpacity"
          onSubmit={submitForm}
        >
          {isLoading ? (
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
                    value={email || ""}
                    onChange={changeEmail}
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
                    value={password || ""}
                    onChange={changePassword}
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
        showModal={showModal}
        closeModal={closeModal}
      />
    </div>
  );
};

export default withRouter(Login);

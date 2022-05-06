import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { userPath } from "../constants/path";
import Loader from "./ui/Loader.tsx";

const Login = (props) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const { error: _error, user: _user } = props;
  useEffect(() => {
    resetFields();
  }, []);

  useEffect(() => {
    if (_error?.length > 0 || _error?.length) {
      setisLoading(false);
      seterror("Neuspješan login!");
    }
  }, [_error]);

  useEffect(() => {
    if (_user?.details?.name !== undefined) {
      if (_user.details.name.length > 0) {
        goToHomePage();
      }
    }
  }, [_user]);

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
    setisLoading(true);
  };

  const resetFields = () => {
    setemail("");
    setpassword("");
    seterror("");
  };

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
    </div>
  );
};

export default withRouter(Login);

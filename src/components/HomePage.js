import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";
import { userPath } from "../constants/path";
import ModalSuccessOrder from "./ModalSuccessOrder";
import CurrentUser from "./ui/CurrentUser.tsx";
import IconButton from "./ui/IconButton.tsx";
import { useSelector, useDispatch } from "react-redux";
import {
  resetIsWrittenValue,
  restartSchedule,
} from "../actions/schedule.action";
import { resetReducerReport } from "../actions/report.action";
import {
  postStoryServey_failure,
  resetIsWrittenValueStore,
  resetStoreSurveyValues,
} from "../actions/storeSurvey.action";
import {
  resetSelectedCompany_success,
  resetSelectedShop_success,
} from "../actions/company.actions";
import { logout_success } from "../actions/login.actions";

const HomePage = (props) => {
  const user = useSelector((state) => state.loginReducer.user);
  const isWrittenStoreSurvey = useSelector(
    (state) => state.storeSurveyReducer.isWritten
  );
  const isWrittenSchedule = useSelector(
    (state) => state.scheduleReducer.isWritten
  );

  const storageUser = JSON.parse(localStorage.getItem("user"));
  const [successModal, setSuccessModal] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restartSchedule());
    dispatch(resetReducerReport());
    dispatch(resetStoreSurveyValues());
    if (user.details !== undefined) {
      localStorage.setItem("user", JSON.stringify(user.details));
      dispatch(postStoryServey_failure());
    }
  }, []);

  useEffect(() => {
    if (isWrittenStoreSurvey && isWrittenSchedule) {
      setSuccessModal(true);
      dispatch(resetIsWrittenValue());
      dispatch(resetIsWrittenValueStore());
    }
  }, [isWrittenStoreSurvey, isWrittenSchedule]);

  const vendorShops = () => {
    let path = userPath.vendorShops;
    props.history.push(path);
  };

  const dailyReport = () => {
    if (
      parseInt(storageUser?.admin) === 1 ||
      parseInt(user.details?.admin) === 1
    ) {
      let path = userPath.dailyReportAdmin;
      props.history.push(path);
    } else {
      let path = userPath.dailyReport;
      props.history.push(path);
    }
  };

  const finance = () => {
    if (
      parseInt(storageUser?.admin) === 1 ||
      parseInt(user.details?.admin) === 1
    ) {
      let path = userPath.finance;
      props.history.push(path);
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Nemate pravo pristupa!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const closeSuccessModal = () => setSuccessModal(false);

  const storeSurvey = () => {
    if (
      parseInt(storageUser?.admin) === 1 ||
      parseInt(user.details?.admin) === 1
    ) {
      let path = userPath.dailyReportStoreSurvey;
      props.history.push(path);
    } else {
      let path = userPath.dailyReportStoreSurveyUser;
      props.history.push(path);
    }
  };

  const schedule = () => {
    if (
      parseInt(storageUser?.admin) === 1 ||
      parseInt(user.details?.admin) === 1
    ) {
      let path = userPath.scheduleAdmin;
      props.history.push(path);
    } else {
      let path = userPath.schedule;
      props.history.push(path);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("company");
    localStorage.removeItem("shop");
    localStorage.removeItem("cart");
    localStorage.removeItem("user");
    dispatch(postStoryServey_failure());
    dispatch(resetSelectedCompany_success());
    dispatch(resetSelectedShop_success());
    dispatch(logout_success());
    let path = userPath.login;
    props.history.push(path);
  };

  return (
    <div>
      <div className="col-sm-12 height-styleHome bck">
        <CurrentUser
          user={
            user.details?.name !== undefined
              ? user.details.name
              : storageUser.name
          }
        />

        <IconButton
          icon="scart.png"
          alt="user"
          clickHandler={() => {
            vendorShops();
          }}
          text={"Naručivanje"}
        />

        <IconButton
          icon="stats.png"
          alt="user"
          clickHandler={() => {
            dailyReport();
          }}
          text={"Dnevni pregled narudžbi"}
        />

        <IconButton
          icon="storesurvey5.png"
          alt="store survey"
          clickHandler={() => {
            storeSurvey();
          }}
          text={"Dnevni pregled anketi"}
        />
        <IconButton
          icon="euro.png"
          alt="finance"
          clickHandler={() => {
            finance();
          }}
          text={"Finansije"}
        />

        <IconButton
          icon="house.png"
          alt="user"
          clickHandler={() => {
            schedule();
          }}
          text={"Raspored prodavnica"}
        />

        <IconButton
          icon="logout.png"
          alt="user"
          clickHandler={() => {
            logout();
          }}
          text={"Logout"}
        />
      </div>
      <ModalSuccessOrder
        showModal={successModal}
        closeModal={closeSuccessModal}
      />
    </div>
  );
};

export default withRouter(HomePage);

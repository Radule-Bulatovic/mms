import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";
import { userPath } from "../constants/path";
import CurrentUser from "./ui/CurrentUser.tsx";
import IconButton from "./ui/IconButton.tsx";

const HomePage = (props) => {
  const [user, setUser] = useState();
  const storageUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    props.restartScheduleHistory();
    props.restartReportReducer();
    props.resetStoreSurveyValues();
    if (props.user.details !== undefined) {
      localStorage.setItem("user", JSON.stringify(props.user.details));
      props.restartStoreSurvey();
    } else {
      setUser(localStorage.getItem("user_name"));
    }
  }, []);

  const vendorShops = () => {
    let path = userPath.vendorShops;
    props.history.push(path);
  };

  const dailyReport = () => {
    var storageUser = JSON.parse(localStorage.getItem("user"));
    if (parseInt(storageUser.admin) === 1) {
      let path = userPath.dailyReportAdmin;
      props.history.push(path);
    } else {
      let path = userPath.dailyReport;
      props.history.push(path);
    }
  };

  const finance = () => {
    var user = JSON.parse(localStorage.getItem("user"));
    if (parseInt(user.admin) === 1) {
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

  const storeSurvey = () => {
    var user = JSON.parse(localStorage.getItem("user"));
    if (parseInt(user.admin) === 1) {
      let path = userPath.dailyReportStoreSurvey;
      props.history.push(path);
    } else {
      let path = userPath.dailyReportStoreSurveyUser;
      props.history.push(path);
      // Swal.fire({
      //     position: 'top-end',
      //     icon: 'error',
      //     title: 'Nemate pravo pristupa!',
      //     showConfirmButton: false,
      //     timer: 1500
      //   })
    }
  };

  const schedule = () => {
    var user = JSON.parse(localStorage.getItem("user"));
    if (parseInt(user.admin) === 1) {
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
    props.restartStoreSurvey();
    props.resetSelectedCompany();
    props.resetSelectedShop();
    let path = userPath.login;
    props.history.push(path);
  };

  return (
    <div>
      <div className="col-sm-12 height-styleHome bck">
        <CurrentUser
          user={
            props.user.details?.name !== undefined
              ? props.user.details.name
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
    </div>
  );
};

export default withRouter(HomePage);

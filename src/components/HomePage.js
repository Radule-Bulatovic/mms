import React from "react";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";
import { userPath } from "../constants/path";
import CurrentUser from "./ui/CurrentUser.tsx";
import IconButton from "./ui/IconButton.tsx";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
    };
  }

  componentDidMount() {
    //restart schedule hist
    this.props.restartScheduleHistory();
    this.props.restartReportReducer();
    this.props.resetStoreSurveyValues();
    if (this.props.user.details !== undefined) {
      // localStorage.setItem('operater', this.props.user.details.operater)
      // localStorage.setItem('user_name', this.props.user.details.name)
      // localStorage.setItem('admin', this.props.user.details.admin)
      localStorage.setItem("user", JSON.stringify(this.props.user.details));
      this.props.restartStoreSurvey();
    } else {
      this.setState({
        user: localStorage.getItem("user_name"),
      });
    }
  }

  static getDerivedStateFromProps(nextProps, prevProps) {
    let _user;
    if (nextProps.user !== prevProps.user) {
      _user = nextProps.user.details;
      return {
        user: _user,
      };
    }
    return null;
  }

  vendorShops = () => {
    let path = userPath.vendorShops;
    this.props.history.push(path);
  };

  dailyReport = () => {
    var storageUser = JSON.parse(localStorage.getItem("user"));
    if (parseInt(storageUser.admin) === 1) {
      let path = userPath.dailyReportAdmin;
      this.props.history.push(path);
    } else {
      let path = userPath.dailyReport;
      this.props.history.push(path);
    }
  };

  finance = () => {
    var user = JSON.parse(localStorage.getItem("user"));
    if (parseInt(user.admin) === 1) {
      let path = userPath.finance;
      this.props.history.push(path);
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

  storeSurvey = () => {
    var user = JSON.parse(localStorage.getItem("user"));
    if (parseInt(user.admin) === 1) {
      let path = userPath.dailyReportStoreSurvey;
      this.props.history.push(path);
    } else {
      let path = userPath.dailyReportStoreSurveyUser;
      this.props.history.push(path);
      // Swal.fire({
      //     position: 'top-end',
      //     icon: 'error',
      //     title: 'Nemate pravo pristupa!',
      //     showConfirmButton: false,
      //     timer: 1500
      //   })
    }
  };

  schedule = () => {
    var user = JSON.parse(localStorage.getItem("user"));
    if (parseInt(user.admin) === 1) {
      let path = userPath.scheduleAdmin;
      this.props.history.push(path);
    } else {
      let path = userPath.schedule;
      this.props.history.push(path);
    }
  };

  logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("company");
    localStorage.removeItem("shop");
    localStorage.removeItem("cart");
    localStorage.removeItem("user");
    this.props.restartStoreSurvey();
    this.props.resetSelectedCompany();
    this.props.resetSelectedShop();
    let path = userPath.login;
    this.props.history.push(path);
  };

  render() {
    var storageUser = JSON.parse(localStorage.getItem("user"));

    return (
      <div>
        <div className="col-sm-12 height-styleHome bck">
          <CurrentUser
            user={
              this.state.user !== undefined
                ? this.state.user.name
                : storageUser.name
            }
          />

          <IconButton
            icon="scart.png"
            alt="user"
            clickHandler={() => {
              this.vendorShops();
            }}
            text={"Naručivanje"}
          />

          <IconButton
            icon="stats.png"
            alt="user"
            clickHandler={() => {
              this.dailyReport();
            }}
            text={"Dnevni pregled narudžbi"}
          />

          <IconButton
            icon="storesurvey5.png"
            alt="store survey"
            clickHandler={() => {
              this.storeSurvey();
            }}
            text={"Dnevni pregled anketi"}
          />
          <IconButton
            icon="euro.png"
            alt="finance"
            clickHandler={() => {
              this.finance();
            }}
            text={"Finansije"}
          />

          <IconButton
            icon="house.png"
            alt="user"
            clickHandler={() => {
              this.schedule();
            }}
            text={"Raspored prodavnica"}
          />

          <IconButton
            icon="logout.png"
            alt="user"
            clickHandler={() => {
              this.logout();
            }}
            text={"Logout"}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(HomePage);

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { userPath } from "./constants/path";
import FinanceCnt from "./containers/FinanceCnt";
import DailyReportCnt from "./containers/DailyReportCnt";
import StoreSurveyCnt from "./containers/StoreSurveyCnt";
import DailyReportAdminCnt from "./containers/DailyReportAdminCnt";
import ScheduleAdminCnt from "./containers/ScheduleAdminCnt";
import ScheduleCnt from "./containers/ScheduleCnt";
import DailyReportStoreSurveyCnt from "./containers/DailyReportStoreSurveyCnt";
import DailyReportStoreSurveyUserCnt from "./containers/DailyReportStoreSurveyUserCnt";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import VendorShops from "./components/VendorShops";
import ChooseShop from "./components/ChooseShop";
import Order from "./components/Order";
import ShoppingCart from "./components/ShoppingCart";
import Finance from "./components/Finance";
import DailyReport from "./components/DailyReport";
import StoreSurvey from "./components/StoreSurvey";

const routes = [
  {
    path: userPath.login,
    main: () => <Login />,
  },
  {
    path: userPath.homePage,
    exact: true,
    main: () => <HomePage />,
  },
  {
    path: userPath.shops,
    main: () => <ChooseShop />,
  },
  {
    path: userPath.vendorShops,
    main: () => <VendorShops />,
  },
  {
    path: userPath.order,
    main: () => <Order />,
  },
  {
    path: userPath.shoppingCart,
    main: () => <ShoppingCart />,
  },
  {
    path: userPath.finance,
    main: () => <Finance />,
  },
  {
    path: userPath.dailyReport,
    main: () => <DailyReport />,
  },
  {
    path: userPath.storeSurvey,
    main: () => <StoreSurvey />,
  },
  {
    path: userPath.scheduleAdmin,
    main: () => <ScheduleAdminCnt />,
  },
  {
    path: userPath.schedule,
    main: () => <ScheduleCnt />,
  },
  {
    path: userPath.dailyReportAdmin,
    main: () => <DailyReportAdminCnt />,
  },
  {
    path: userPath.dailyReportStoreSurvey,
    main: () => <DailyReportStoreSurveyCnt />,
  },
  {
    path: userPath.dailyReportStoreSurveyUser,
    main: () => <DailyReportStoreSurveyUserCnt />,
  },
];

class PageRouting extends React.Component {
  render() {
    return (
      <Router>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        ))}
      </Router>
    );
  }
}

export default PageRouting;

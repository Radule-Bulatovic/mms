import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { userPath } from "./constants/path";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import VendorShops from "./components/VendorShops";
import ChooseShop from "./components/ChooseShop";
import Order from "./components/Order";
import ShoppingCart from "./components/ShoppingCart";
import Finance from "./components/Finance";
import DailyReport from "./components/DailyReport";
import StoreSurvey from "./components/StoreSurvey";
import Schedule from "./components/Schedule";
import ScheduleAdmin from "./components/ScheduleAdmin";
import DailyReportAdmin from "./components/DailyReportAdmin";
import DailyReportStoreSurveyUser from "./components/DailyReportStoreSurveyUser";
import DailyReportStoreSurvey from "./components/DailyReportStoreSurvey";

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
    main: () => <ScheduleAdmin />,
  },
  {
    path: userPath.schedule,
    main: () => <Schedule />,
  },
  {
    path: userPath.dailyReportAdmin,
    main: () => <DailyReportAdmin />,
  },
  {
    path: userPath.dailyReportStoreSurvey,
    main: () => <DailyReportStoreSurvey />,
  },
  {
    path: userPath.dailyReportStoreSurveyUser,
    main: () => <DailyReportStoreSurveyUser />,
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

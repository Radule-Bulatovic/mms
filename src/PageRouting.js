import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { userPath } from "./constants/path";
import HomePageCnt from "./containers/HomePageCnt";
import ChooseShopCnt from "./containers/ChooseShopCnt";
import VendorShopsCnt from "./containers/VendorShopsCnt";
import OrderCnt from "./containers/OrderCnt";
import ShoppingCartCnt from "./containers/ShoppingCartCnt";
import FinanceCnt from "./containers/FinanceCnt";
import DailyReportCnt from "./containers/DailyReportCnt";
import StoreSurveyCnt from "./containers/StoreSurveyCnt";
import DailyReportAdminCnt from "./containers/DailyReportAdminCnt";
import ScheduleAdminCnt from "./containers/ScheduleAdminCnt";
import ScheduleCnt from "./containers/ScheduleCnt";
import DailyReportStoreSurveyCnt from "./containers/DailyReportStoreSurveyCnt";
import DailyReportStoreSurveyUserCnt from "./containers/DailyReportStoreSurveyUserCnt";
import Login from "./components/Login";

const routes = [
  {
    path: userPath.login,
    main: () => <Login />,
  },
  {
    path: userPath.homePage,
    exact: true,
    main: () => <HomePageCnt />,
  },
  {
    path: userPath.shops,
    main: () => <ChooseShopCnt />,
  },
  {
    path: userPath.vendorShops,
    main: () => <VendorShopsCnt />,
  },
  {
    path: userPath.order,
    main: () => <OrderCnt />,
  },
  {
    path: userPath.shoppingCart,
    main: () => <ShoppingCartCnt />,
  },
  {
    path: userPath.finance,
    main: () => <FinanceCnt />,
  },
  {
    path: userPath.dailyReport,
    main: () => <DailyReportCnt />,
  },
  {
    path: userPath.storeSurvey,
    main: () => <StoreSurveyCnt />,
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

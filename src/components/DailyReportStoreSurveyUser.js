import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";
import DatePicker from "react-datepicker";
import moment from "moment";
import DailiReportStoreSurvey from "./singleComponent/DailiReportStoreSurvey";
import ReactLoading from "react-loading";
import {
  getSSforComercAndDateAndCmpAndShop_request,
  getSSforComercAndDate_request,
  resetStoreSurveyValues,
} from "../actions/storeSurvey.action";

function DailyReportStoreSurveyUser(props) {
  const dispatch = useDispatch();

  const [selectedDate, changeStateDate] = useState(new Date());

  const storesForComAndDate = useSelector(
    (state) => state.storeSurveyReducer.storesForComAndDate
  );
  const storesForComAndDateAndCmpAndSop = useSelector(
    (state) => state.storeSurveyReducer.storesForComAndDateAndCmpAndSop
  );
  const isLoadedDate = useSelector((state) => {
    return state.storeSurveyReducer.isLoadedData;
  });
  const [companyName, changeCompanyName] = useState("");
  const [shopName, changeShopName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingItems, setIsLoadingItems] = useState(false);

  useEffect(() => {
    let selectedUser = JSON.parse(localStorage.getItem("user"));
    let details = {
      date: moment(selectedDate).format("YYYY-MM-DD"),
      user: selectedUser.operater,
    };
    dispatch(getSSforComercAndDate_request(details));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (storesForComAndDate !== undefined) {
      if (storesForComAndDate.length > 0) {
        setIsLoading(false);
      }
    }
  }, [storesForComAndDate]);

  useEffect(() => {
    if (storesForComAndDateAndCmpAndSop.length > 0 && isLoading) {
      setIsLoading(false);
    }
    if (storesForComAndDateAndCmpAndSop !== undefined) {
      if (storesForComAndDateAndCmpAndSop.length > 0) {
        setIsLoadingItems(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storesForComAndDateAndCmpAndSop]);

  useEffect(() => {
    if (isLoadedDate) {
      setIsLoading(false);
    }
  }, [isLoadedDate]);

  const changeDate = (date) => {
    setIsLoading(true);
    dispatch(resetStoreSurveyValues());
    changeCompanyName("");
    changeShopName("");
    let selectedUser = JSON.parse(localStorage.getItem("user"));
    changeStateDate(date);
    if (selectedUser !== "") {
      let details = {
        date: moment(date).format("YYYY-MM-DD"),
        user: selectedUser.operater,
      };
      dispatch(getSSforComercAndDate_request(details));
    }
  };

  const showItems = (company_id, shop_id, date, company_name, shop_name) => {
    setIsLoadingItems(true);
    let selectedUser = JSON.parse(localStorage.getItem("user"));
    changeCompanyName(company_name);
    changeShopName(shop_name);
    // getItemsForInvoice(invoice_id)
    let details = {
      user: selectedUser.operater,
      company_id: company_id,
      shop_id: shop_id,
      date: date,
    };
    dispatch(getSSforComercAndDateAndCmpAndShop_request(details));
  };

  return (
    <div className="col-sm-12 height-styleFinance bckOrders">
      {isLoading === true ? (
        <div
          style={{
            width: "50px",
            height: "50px",
            marginLeft: "45%",
            paddingTop: "50%",
          }}
        >
          <ReactLoading type="spin" style={{ textAlign: "left" }} />
        </div>
      ) : (
        <>
          <form name="checkForm" className="setOpacity banacecheckForm">
            <div className="box-body">
              <div className="form-group setColor">
                <h6 className="vendorShopsTitle">Datum:</h6>
              </div>
              <div className="form-group dailyDataPicker">
                <DatePicker
                  className="form-control"
                  placeholderText="Izaberite datum"
                  onChange={changeDate}
                  selected={selectedDate}
                />
              </div>
            </div>
            <table
              className=" table table-striped col-sm-12 dailyTbl"
              style={{ marginBottom: "15px" }}
            >
              <thead className="tableHeader">
                <tr className="sortCursor">
                  <th className="thAnalticalItem" style={{ width: "50%" }}>
                    Kupac
                  </th>
                  <th className="thAnalticalItem" style={{ width: "50%" }}>
                    Objekat
                  </th>
                  <th className="thAnalticalItem" style={{ width: "50%" }}>
                    Datum
                  </th>
                </tr>
              </thead>
              <tbody style={{ fontSize: "13px" }}>
                {storesForComAndDate !== undefined ? (
                  storesForComAndDate.map((item) => {
                    return (
                      <DailiReportStoreSurvey
                        key={item.id}
                        company_name={item.company_name}
                        datum={item.datum}
                        shop_name={item.shop_name}
                        showItems={() =>
                          showItems(
                            item.company_id,
                            item.shop_id,
                            item.date,
                            item.company_name,
                            item.shop_name
                          )
                        }
                      />
                    );
                  })
                ) : (
                  <tr>
                    <td></td>
                  </tr>
                )}
                {storesForComAndDate.length === 0 ? (
                  <tr>
                    <td colSpan={3}>Nema podataka</td>
                  </tr>
                ) : (
                  <tr></tr>
                )}
              </tbody>
            </table>

            {isLoadingItems === true ? (
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  marginLeft: "45%",
                  paddingTop: "10%",
                }}
              >
                <ReactLoading type="spin" style={{ textAlign: "left" }} />
              </div>
            ) : (
              <>
                <h6 className="vendorShopsTitle">{companyName}</h6>
                <h6 className="vendorShopsTitle" style={{ marginTop: "-20px" }}>
                  {shopName}
                </h6>
                {storesForComAndDateAndCmpAndSop.length > 0 ? (
                  <table
                    className=" table table-striped col-sm-12 dailyTbl"
                    style={{ marginBottom: "15px" }}
                  >
                    <tbody style={{ fontSize: "13px" }}>
                      {storesForComAndDateAndCmpAndSop.map((item) => {
                        return (
                          <tr key={item.id}>
                            <td>{item.anketa_name}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  ""
                )}
              </>
            )}
          </form>
        </>
      )}
    </div>
  );
}

export default withRouter(DailyReportStoreSurveyUser);

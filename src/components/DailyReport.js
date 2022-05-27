import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";
import DailyReportItem from "./singleComponent/DailyReportItem";
import ItemsForInvoice from "./singleComponent/ItemsForInvoice";
import ReactLoading from "react-loading";
import { useSelector, useDispatch } from "react-redux";
import {
  getDailyReport_request,
  getItemsForInvoice_request,
} from "../actions/report.action";

const DailyReport = (props) => {
  const dispatch = useDispatch();

  const invoices = useSelector((state) => state.reportReducer.invoices);
  const items = useSelector((state) => state.reportReducer.items);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [company_name, setCompany_name] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  let storageUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    let _date = new Date();
    let details = {
      date: moment(_date).format("YYYY-MM-DD"),
      user: storageUser.operater,
    };
    dispatch(getDailyReport_request(details));
  }, []);

  useEffect(() => {
    if (invoices.length > 0) setIsLoading(false);
  }, [invoices]);

  const changeDate = (date) => {
    setIsLoading(true);
    storageUser = JSON.parse(localStorage.getItem("user"));
    let details = {
      date: moment(date).format("YYYY-MM-DD"),
      user: storageUser.operater,
      page: 1,
    };
    dispatch(getDailyReport_request(details));
    setSelectedDate(date);
  };

  const showItems = (invoice_id, company_name) => {
    setCompany_name(company_name);
    dispatch(getItemsForInvoice_request(invoice_id));
  };

  return (
    <div>
      <div className="col-sm-12 height-styleFinance bckOrders">
        {isLoading ? (
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

                    <th className="thAnalticalItem" style={{ width: "10%" }}>
                      Br.Rač
                    </th>
                  </tr>
                </thead>
                <tbody style={{ fontSize: "13px" }}>
                  {invoices.length > 0 ? (
                    invoices.map((item, index) => {
                      return (
                        <DailyReportItem
                          key={index}
                          id={item.id}
                          company_name={item.company_name}
                          shop_name={item.shop_name}
                          status={item.status}
                          invoice_id={item.invoice_id}
                          showItems={() =>
                            showItems(item.id, item.company_name)
                          }
                        />
                      );
                    })
                  ) : (
                    <tr>
                      <td>Nema podataka!</td>
                      <td></td>
                      <td></td>
                    </tr>
                  )}
                </tbody>
              </table>

              <h6 className="vendorShopsTitle">
                {items.length > 0 ? company_name : ""}
              </h6>
              {items.length > 0 ? (
                <table className=" table table-striped col-sm-12 dailyTbl">
                  <thead className="tableHeader">
                    <tr className="sortCursor">
                      <th className="thAnalticalItem" style={{ width: "70%" }}>
                        Artikal
                      </th>
                      <th className="thAnalticalItem" style={{ width: "10%" }}>
                        Kol.
                      </th>
                      <th className="thAnalticalItem" style={{ width: "10%" }}>
                        Cijena
                      </th>
                      <th className="thAnalticalItem" style={{ width: "10%" }}>
                        %
                      </th>
                    </tr>
                  </thead>
                  <tbody style={{ fontSize: "13px" }}>
                    {items !== undefined ? (
                      items.map((item, index) => {
                        return (
                          <ItemsForInvoice
                            key={index}
                            item={item.name}
                            quantity={item.quantity}
                            price={item.price}
                            discount={item.discount}
                          />
                        );
                      })
                    ) : (
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    )}
                  </tbody>
                </table>
              ) : (
                ""
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default withRouter(DailyReport);

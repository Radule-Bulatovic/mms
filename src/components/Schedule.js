import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";
import DatePicker from "react-datepicker";
import moment from "moment";
import ReactLoading from "react-loading";
import { checkScheduleForVendorDate_request } from "../actions/schedule.action";

function Schedule(props) {
  const dispatch = useDispatch();
  const sheduleHist = useSelector((state) => state.scheduleReducer.sheduleHist);
  const isLoadedDate = useSelector(
    (state) => state.scheduleReducer.isLoadedDate
  );
  // const [selectedDate, changeStateDate] = useState(new Date())
  const [selectedDate, changeStateDate] = useState();
  let user = JSON.parse(localStorage.getItem("user"));

  // const [isLoading, setIsLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(false);

  //   useEffect(() => {
  // setIsLoading(true)
  // let _fullDate = moment(selectedDate).format('YYYY-MM-DD')
  // let _date = selectedDate+""
  // let _finalDate = _date.substring(0,2)
  // changeStateDate(selectedDate)
  // let details = {
  //     operater: user.operater,
  //     date: _finalDate,
  //     fullDate: _fullDate
  // }
  // console.log('details: ',details)
  // checkScheduleForVendorDate_request(details)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  useEffect(() => {
    if (isLoadedDate) {
      setIsLoading(false);
    }
    if (sheduleHist !== undefined) {
      if (sheduleHist.length > 0) {
        setIsLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sheduleHist]);

  useEffect(() => {
    if (isLoadedDate) {
      setIsLoading(false);
    }
  }, [isLoadedDate]);

  const changeDate = (date) => {
    setIsLoading(true);
    let _fullDate = moment(date).format("YYYY-MM-DD");
    let _date = date + "";
    let _finalDate = _date.substring(0, 2);
    changeStateDate(date);
    let details = {
      operater: user.operater,
      date: _finalDate,
      fullDate: _fullDate,
    };
    dispatch(checkScheduleForVendorDate_request(details));
  };

  return (
    <div className="col-sm-12 height-styleFinance bckOrders">
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
        {isLoading === true ? (
          <div
            style={{
              width: "50px",
              height: "50px",
              marginLeft: "45%",
              paddingTop: "20%",
            }}
          >
            <ReactLoading type="spin" style={{ textAlign: "left" }} />
          </div>
        ) : (
          <>
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
                </tr>
              </thead>
              <tbody style={{ fontSize: "13px" }}>
                {sheduleHist.map((item, index) => {
                  return (
                    <tr key={index}>
                      {/* <td>{item.kupac}</td>
                                            <td>{item.kup_obj}</td> */}
                      <td>{item.kupac_naziv}</td>
                      <td>{item.kup_obj_naziv}</td>
                      <td
                        className={
                          item.visibility === false
                            ? "scheduleRed"
                            : "scheduleGreen"
                        }
                      >
                        {item.visibility}
                      </td>
                    </tr>
                  );
                })}
                {sheduleHist.length === 0 ? (
                  <tr>
                    <td>Unesite raspored</td>
                    <td></td>
                  </tr>
                ) : (
                  <tr></tr>
                )}
              </tbody>
            </table>
          </>
        )}
      </form>
    </div>
  );
}

export default withRouter(Schedule);

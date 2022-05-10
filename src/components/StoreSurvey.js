import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import Swal from "sweetalert2";
import {
  getStoreSurvey_request,
  getStoreSurveyAdmin_request,
  postStoryServeyAdmin_request,
  postStoryServey_failure,
  postStoryServey_request,
  resetIsWrittenValueStore,
} from "../actions/storeSurvey.action";
import { userPath } from "../constants/path";
import ReactLoading from "react-loading";
import {
  resetIsWrittenValue,
  writeScheduleHist_request,
} from "../actions/schedule.action";
import { resetIsWrittenValueItem } from "../actions/invoice.action";

function StoreSurvey(props) {
  const dispatch = useDispatch();

  const stores = useSelector((state) => state.storeSurveyReducer.stores);
  const isWritten = useSelector((state) => state.storeSurveyReducer.isWritten);

  const [checkedItems, setCheckedItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      localStorage.setItem("latitude", position.coords.latitude);
      localStorage.setItem("longitude", position.coords.longitude);
    });

    localStorage.removeItem("survey");
    let user = JSON.parse(localStorage.getItem("user"));
    if (parseInt(user.admin) === 1) {
      dispatch(getStoreSurveyAdmin_request());
    } else {
      dispatch(getStoreSurvey_request());
    }

    dispatch(resetIsWrittenValue());
    dispatch(resetIsWrittenValueStore());
    dispatch(resetIsWrittenValueItem());
  }, []);

  useEffect(() => {
    if (stores !== undefined) {
      if (stores.length > 0) {
        setIsLoading(false);
      }
    }
  }, [stores]);

  useEffect(() => {
    if (isWritten) {
      setIsLoading(false);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Uspješno ste poslali anketu!!",
        showConfirmButton: false,
        timer: 1500,
      });
      localStorage.removeItem("token");
      localStorage.removeItem("company");
      localStorage.removeItem("shop");
      localStorage.removeItem("cart");
      localStorage.removeItem("user");
      dispatch(postStoryServey_failure());
      let path = userPath.homePage;
      props.history.push(path);
    }
  }, [isWritten]);

  const handleOnChange = (event) => {
    let item = {
      survey_id: parseInt(event.target.value),
      name: event.target.name,
    };
    if (event.target.checked === true) {
      setCheckedItem([...checkedItems, item]);
    } else {
      const updatedList = checkedItems.filter(
        (checkedItem) => checkedItem.survey_id !== item.survey_id
      );
      setCheckedItem(updatedList);
    }
  };

  const checkStatus = () => {
    if (
      checkedItems.length !== 0 ||
      JSON.parse(localStorage.getItem("survey")) !== null
    ) {
      let path = userPath.order;
      props.history.push(path);
      localStorage.setItem("survey", JSON.stringify(checkedItems));
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Morate popuniti anketu!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const sendStoreSurvey = () => {
    if (checkedItems.length > 0) {
      setIsLoading(true);

      let storeItems = checkedItems.map((item) => {
        return {
          company_id: JSON.parse(localStorage.getItem("company")).value,
          shop_id: JSON.parse(localStorage.getItem("shop")).value,
          user_id: JSON.parse(localStorage.getItem("user")).operater,
          date: moment(new Date()).format("YYYY-MM-DD 00:00:00"),
          survey_id: item.survey_id,
          //
          latitude: JSON.parse(localStorage.getItem("latitude")).toString(),
          longitude: JSON.parse(localStorage.getItem("longitude")).toString(),
        };
      });

      let admin = JSON.parse(localStorage.getItem("user")).admin;
      if (parseInt(admin) === 1) {
        dispatch(postStoryServeyAdmin_request(storeItems));
      } else {
        dispatch(postStoryServey_request(storeItems));
      }

      let scheduleItem = {
        company_id: JSON.parse(localStorage.getItem("company")).value,
        company_name: JSON.parse(localStorage.getItem("company")).label.trim(),
        shop_id: JSON.parse(localStorage.getItem("shop")).value,
        shop_name: JSON.parse(localStorage.getItem("shop")).label.trim(),
        user_id: JSON.parse(localStorage.getItem("user")).operater.trim(),
        date: moment(new Date()).format("YYYY-MM-DD 00:00:00"),
      };
      dispatch(writeScheduleHist_request(scheduleItem));
      setIsLoading(false);
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Morate popuniti anketu!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="bckOrders">
      {isLoading ? (
        <div className="wrapper bckOrders">
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
        </div>
      ) : (
        <>
          {stores !== undefined ? (
            <div>
              {stores.map((item) => {
                return (
                  <div
                    key={item.id}
                    style={{ paddingLeft: "20px", paddingTop: " 10px" }}
                  >
                    <input
                      type="checkbox"
                      value={item.id}
                      name={item.name}
                      survey_id={item.id}
                      onChange={handleOnChange}
                    />
                    {item.name}
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}
          <div
            style={{
              position: "fixed",
              left: "0",
              bottom: "0",
              width: "100%",
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            {parseInt(JSON.parse(localStorage.getItem("user")).admin) === 1 ? (
              <button
                className="btn btn-danger surveyButton"
                onClick={sendStoreSurvey}
              >
                Pošalji anketu bez narudžbe
              </button>
            ) : (
              <>
                <button
                  className="btn btn-primary surveyButton"
                  onClick={checkStatus}
                >
                  Nastavi narudžbinu
                </button>
                <button
                  className="btn btn-danger surveyButton"
                  onClick={sendStoreSurvey}
                >
                  Pošalji anketu bez narudžbe
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default withRouter(StoreSurvey);

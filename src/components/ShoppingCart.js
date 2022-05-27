import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";
import { userPath } from "../constants/path";
import ReactLoading from "react-loading";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { setInvoiceHeader_request } from "../actions/invoice.action";
import {
  deleteItem_success,
  resetShoppingCart_success,
} from "../actions/shoppingCart.action";
import { postStoryServey_request } from "../actions/storeSurvey.action";
import { writeScheduleHist_request } from "../actions/schedule.action";
import ShoppingCartItem from "./singleComponent/ShoppingCartItem";
import { Button } from "@material-ui/core";
import { logout_success } from "../actions/login.actions";
import {
  resetSelectedCompany_success,
  resetSelectedShop_success,
} from "../actions/company.actions";

const ShoppingCart = (props) => {
  const dispatch = useDispatch();

  const items = useSelector((state) => {
    return state.shoppingCartReducer.items;
  });
  const [total, setTotal] = useState(true);
  const [tax, setTax] = useState(true);
  const [id, setId] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const ItemEl =
    items.length !== 0 ? (
      items.map((item, index) => {
        return (
          <ShoppingCartItem
            // key={item.article_id}
            key={index}
            counter={index + 1}
            id={item.article_id}
            name={item.article_name}
            quantity={item.quantity}
            price={item.price}
            discount={item.discount}
            // tax={item.tax}
            deleteItem={() => dispatch(deleteItem_success(item))}
          />
        );
      })
    ) : JSON.parse(localStorage.getItem("cart")) ? (
      JSON.parse(localStorage.getItem("cart")).map((item, index) => (
        <ShoppingCartItem
          // key={item.article_id}
          key={index}
          counter={index + 1}
          id={item.article_id}
          name={item.article_name}
          quantity={item.quantity}
          price={item.price}
          discount={item.discount}
          // tax={item.tax}
          deleteItem={() => dispatch(deleteItem_success(item))}
        />
      ))
    ) : (
      <tr></tr>
    );
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("survey"))?.length) {
      goTo("homePage");
    }
    navigator.geolocation.getCurrentPosition(function (position) {
      localStorage.setItem("latitude", position.coords.latitude);
      localStorage.setItem("longitude", position.coords.longitude);
    });
  }, []);

  const backToOrders = () => {
    let path = userPath.order;
    props.history.push(path);
  };

  useEffect(() => {
    let sum = [];
    let _tax;
    let _dsc;
    let _items = items.length
      ? items
      : JSON.parse(localStorage.getItem("cart"));
    if (_items) {
      let x = _items.map((item) => {
        if (isNaN(item.discount)) {
          _dsc = 0;
        } else {
          _dsc = parseFloat(item.discount);
        }
        return (item.quantity * parseFloat(item.price) * (100 - _dsc)) / 100;
      });
      if (x.length > 0) {
        sum = x.reduce((result, number) => result + number).toFixed(2);
      }

      let _tax2 = _items.map((item) => {
        return (
          ((item.quantity * parseFloat(item.price) * (100 - _dsc)) / 100) *
          parseFloat(item.tax)
        );
      });
      if (_tax2.length > 0) {
        _tax = _tax2.reduce((result, number) => result + number).toFixed(2);
      }
      if (_items.length === 0) {
        _items = JSON.parse(localStorage.getItem("cart"));
      }
    }
    if (JSON.parse(localStorage.getItem("user")) !== undefined) {
      if (JSON.parse(localStorage.getItem("user")).length === 0) {
        let y;
        _items = JSON.parse(localStorage.getItem("cart"));
        if (JSON.parse(localStorage.getItem("cart")) !== null) {
          y = JSON.parse(localStorage.getItem("cart")).map((item) => {
            if (isNaN(item.discount)) {
              _dsc = 0;
            } else {
              _dsc = parseFloat(item.discount);
            }
            return (
              (item.quantity * parseFloat(item.price) * (100 - _dsc)) / 100
            );
          });
          if (y.length > 0) {
            sum = y.reduce((result, number) => result + number).toFixed(2);
          }
        }
        if (JSON.parse(localStorage.getItem("cart")) !== null) {
          let _tax2 = JSON.parse(localStorage.getItem("cart")).map((item) => {
            return (
              ((item.quantity * parseFloat(item.price) * (100 - _dsc)) / 100) *
              parseFloat(item.tax)
            );
          });
          if (_tax2.length > 0) {
            _tax = _tax2.reduce((result, number) => result + number).toFixed(2);
          }
        }
      }
    }
    setTotal(parseFloat(sum));
    setTax(parseFloat(_tax));
    setId(parseInt(id));
    setIsLoading(false);
  }, [items]);

  const showModal = () => {
    if (
      items?.length != 0 ||
      JSON.parse(localStorage.getItem("cart"))?.length
    ) {
      Swal.fire({
        title: "Zaključi narudžbu?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Potvrdi",
        cancelButtonText: "Otkaži",
      }).then((result) => {
        if (result.isConfirmed) {
          sendOdrer();
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Korpa je prazna!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const sendOdrer = () => {
    let newDate = new Date();
    let _date = moment(newDate).format("YYYY-MM-DD 00:00:00");
    let _datetime = moment(newDate).format("YYYY-MM-DD hh:mm:ss");
    let user = JSON.parse(localStorage.getItem("user"));
    let company = JSON.parse(localStorage.getItem("company"));
    let shop = JSON.parse(localStorage.getItem("shop"));

    let _items;
    if (items.length > 0) {
      _items = items.map((item, index) => {
        return {
          rbr: index + 1,
          broj: parseInt(id) + 1,
          sifra: item.article_id,
          koli: item.quantity,
          v_cije: item.price,
          rabat:
            item.discount === undefined || isNaN(item.discount)
              ? 0
              : item.discount,
        };
      });
    } else {
      _items = JSON.parse(localStorage.getItem("cart")).map((item, index) => {
        return {
          rbr: index + 1,
          broj: parseInt(id) + 1,
          sifra: item.article_id,
          koli: item.quantity,
          v_cije: item.price,
          rabat:
            item.discount === undefined || isNaN(item.discount)
              ? 0
              : item.discount,
        };
      });
    }
    let header = {
      // id: parseInt(id) + 1,
      user_id: user.operater,
      company_id: company.value,
      shop_id: shop.value,
      date: _date,
      kni: 1,
      storno: 0,
      preuzeto: 1,
      datetime: _datetime,
      brfak: 0,
      latitude: JSON.parse(localStorage.getItem("latitude")),
      longitude: JSON.parse(localStorage.getItem("longitude")),
      items: _items,
    };
    let surveyObject = JSON.parse(localStorage.getItem("survey")).map(
      (item) => {
        return {
          company_id: company.value,
          shop_id: shop.value,
          user_id: user.operater,
          date: _date,
          survey_id: item.survey_id,
          //
          latitude: JSON.parse(localStorage.getItem("latitude")),
          longitude: JSON.parse(localStorage.getItem("longitude")),
        };
      }
    );
    let sheduleItem = {
      company_id: company.value,
      company_name: company.label,
      shop_id: shop.value,
      shop_name: shop.label,
      user_id: user.operater,
      date: _date,
    };

    dispatch(setInvoiceHeader_request(header));
    dispatch(postStoryServey_request(surveyObject));
    dispatch(writeScheduleHist_request(sheduleItem));

    localStorage.removeItem("company");
    localStorage.removeItem("shop");
    localStorage.removeItem("latitude");
    localStorage.removeItem("longitude");
    localStorage.removeItem("survey");
    localStorage.removeItem("cart");
    dispatch(resetShoppingCart_success());
    dispatch(resetSelectedCompany_success());
    dispatch(resetSelectedShop_success());
    goTo("homePage");
  };

  const goTo = (page) => {
    let path = userPath[page];
    props.history.push(path);
  };

  const deleteCart = () => {
    Swal.fire({
      title: "Da li ste sigurni?",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Da!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("cart");
        dispatch(resetShoppingCart_success());
        Swal.fire("Obrisana!", "Korpa je uspješno obrisana!", "success");
        let path = "/katalogProizvoda";
        props.history.push(path);
      }
    });
  };

  return isLoading ? (
    <div className="bckOrdersShoppCart">
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
    <div className="bckOrdersShoppCart">
      <div className="col-sm-12 ">
        <div className="row">
          <div className="col-sm-12 cartPadding">
            <div className="col-sm-12 d-flex justify-content-between cartBackImg">
              <Button
                style={{ fontWeight: 700 }}
                size="large"
                color="secondary"
                variant="outlined"
                onClick={() => backToOrders()}
              >
                {/* <img src="icons8-delete-24.png" style={{ height: "1.5rem" }} /> */}
                Nazad
              </Button>
              <Button
                style={{ fontWeight: 700 }}
                size="large"
                color="primary"
                variant="outlined"
                onClick={showModal}
              >
                {/* <img src="icons8-send-32.png" style={{ height: "1.5rem" }} /> */}
                Naruči
              </Button>
            </div>
          </div>
        </div>
        <div className="row">
          <table className="table table-striped col-sm-12">
            <thead className="tableHeader">
              <tr className="sortCursor">
                <th className="thCartName">Naziv</th>
                <th className="thCart">Kol</th>
                <th className="thCart">&euro;</th>
                <th className="thCart">%</th>
                <th className="thCart">&euro;-%</th>
                <th className="thCart"></th>
              </tr>
            </thead>
            <tbody>{ItemEl}</tbody>
          </table>
        </div>

        <div className="row countCart">
          <div className="col-sm-4 col-md-4"></div>
          <div className="col-sm-4 col-md-4"></div>
          <div className="form-group col-sm-3 col-md-4">
            <label>Ukupno:</label>

            <input
              type="text"
              className="form-control inpytCart"
              value={isNaN(total) ? 0 : total}
              readOnly
            />
            <input
              type="text"
              className="form-control inpytCart"
              value={isNaN(tax) ? 0 : tax}
              readOnly
            />
            <input
              type="text"
              className="form-control inpytCart"
              value={isNaN(tax) ? 0 : (total + tax).toFixed(2)}
              readOnly
            />
          </div>
        </div>

        <button
          className="btn btn-danger surveyButton"
          style={{
            position: "fixed",
            bottom: "5px",
            right: "2px",
            left: "4px",
          }}
          onClick={deleteCart}
        >
          Isprazni korpu:{" "}
          {items?.length !== 0
            ? items?.length
            : JSON.parse(localStorage.getItem("cart"))?.length}{" "}
          Artik.
        </button>
      </div>
    </div>
  );
};

export default withRouter(ShoppingCart);

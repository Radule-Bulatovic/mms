import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import ShoppingCartItemCnt from "../containers/ShoppingCartItemCnt";
import moment from "moment";
import ModalCmp from "./ModalCmp";
import { userPath } from "../constants/path";
import ReactLoading from "react-loading";
import Swal from "sweetalert2";

const ShoppingCart = (props) => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [id, setId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { items: _items } = props;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      localStorage.setItem("latitude", position.coords.latitude);
      localStorage.setItem("longitude", position.coords.longitude);
    });
  }, []);

  const backToOrders = () => {
    let path = userPath.order;
    props.history.push(path);
  };

  const deleteItem = (item) => props.deleteItem(item);

  const showModalClick = () => setShowModal(true);

  const closeModal = () => setShowModal(false);

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    props.resetIsWrittenStore();
    props.resetIsWrittenSchedule();
    props.resetIsWrittenItem();

    let path = userPath.login;
    props.history.push(path);
  };

  useEffect(() => {
    let sum = [],
      _items = [];
    let _tax,
      _isWritten = false;
    _items = props.items;
    let _dsc;
    if (props.items !== undefined) {
      let x = props.items.map((item) => {
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

      let _tax2 = props.items.map((item) => {
        return (
          ((item.quantity * parseFloat(item.price) * (100 - _dsc)) / 100) *
          parseFloat(item.tax)
        );
      });
      if (_tax2.length > 0) {
        _tax = _tax2.reduce((result, number) => result + number).toFixed(2);
      }
      if (props.items.length === 0) {
        _items = JSON.parse(localStorage.getItem("cart"));
      }
    }
    if (props.user !== undefined) {
      if (props.user.length === 0) {
        let y;
        _items = JSON.parse(localStorage.getItem("cart"));
        console.log("setting items");
        console.log(_items);
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

    if (
      props.isWrittenStoreSurvey &&
      props.isWrittenSchedule &&
      props.isWrittenInvoiceItem
    ) {
      _isWritten = true;
    }

    setItems(_items);
    setTotal(parseFloat(sum));
    setTax(parseFloat(_tax));
    setId(parseInt(props.id));
    setShowSuccessModal(_isWritten);
  }, [_items]);

  const sendOdrer = () => {
    let header = [];
    let newDate = new Date();
    let _date = moment(newDate).format("YYYY-MM-DD 00:00:00");
    let _datetime = moment(newDate).format("YYYY-MM-DD hh:mm:ss");
    let user = JSON.parse(localStorage.getItem("user"));
    let company = JSON.parse(localStorage.getItem("company"));
    let shop = JSON.parse(localStorage.getItem("shop"));
    header = {
      id: parseInt(id) + 1,
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
    };
    props.setInvoiceHeader(header);

    let _items;
    if (props.items.length > 0) {
      _items = props.items.map((item, index) => {
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

    // _items.forEach(item => {
    //     props.setInvoiceItems(item)
    // });

    //
    // ITEMS
    //
    props.setInvoiceItems(_items);
    //
    //END
    //

    //
    //ANKETA
    //
    // proslijediti laravelu niz/objekat za oba slucaja i items i store survey items
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
    props.storeSurvey(surveyObject);
    //
    //END
    //

    //
    //RASPORED
    //
    //write row in shadule history
    //
    //
    let sheduleItem = {
      company_id: company.value,
      company_name: company.label,
      shop_id: shop.value,
      shop_name: shop.label,
      user_id: user.operater,
      date: _date,
    };
    props.writeScheduleHist(sheduleItem);
    //
    //end
    //

    //restet store survey status
    //set isWriten to false
    props.resetStoreSurvey();
    //
    closeModal();
    props.resetShoppingCart();
    // resetInvoiceID()

    logout();

    //remove storeSurvey items from local storage
    localStorage.removeItem("survey");
    localStorage.removeItem("latitude");
    localStorage.removeItem("longitude");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("company");
    localStorage.removeItem("shop");
    localStorage.removeItem("cart");
    localStorage.removeItem("user");
    localStorage.removeItem("latitude");
    localStorage.removeItem("longitude");
    props.resetSelectedCompany();
    props.resetSelectedShop();

    let path = userPath.login;
    props.history.push(path);
  };

  const resetInvoiceID = () => {
    setId(0);
    setTotal(0);
    setTax(0);
  };

  const getId = () => {
    if (total > 0) {
      props.getInvoiceId();
      setIsLoading(true);
      setTimeout(() => {
        setShowModal(true);
        setIsLoading(false);
      }, 1500);
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Korpa je prazna!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
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
        props.resetShoppingCart();
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
            <div className="col-sm-6 cartBackImg">
              <img
                className="imgStyle"
                src="back.png"
                alt="back"
                onClick={() => backToOrders()}
              />
            </div>
            <div className="col-sm-6 cartNextImg" style={{ width: "30%" }}>
              <img
                className="imgStyle"
                src="arrow.png"
                alt="send"
                onClick={() => getId()}
              />
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
            <tbody>
              {items !== null ? (
                items.map((item, index) => {
                  return (
                    <ShoppingCartItemCnt
                      // key={item.article_id}
                      key={index}
                      counter={index + 1}
                      id={item.article_id}
                      name={item.article_name}
                      quantity={item.quantity}
                      price={item.price}
                      discount={item.discount}
                      // tax={item.tax}
                      deleteItem={() => deleteItem(item)}
                    />
                  );
                })
              ) : (
                <tr></tr>
              )}
            </tbody>
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
              value={isNaN(total) ? 0 : total.toFixed(2)}
              readOnly
            />
            <input
              type="text"
              className="form-control inpytCart"
              value={isNaN(tax) ? 0 : tax.toFixed(2)}
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

        <div className="row">
          <div className="col-sm-12 cartPadding">
            <div className="col-sm-6 cartBackImg">
              <img
                className="imgStyle"
                src="back.png"
                alt="back"
                onClick={() => backToOrders()}
              />
            </div>
            <div className="col-sm-6 cartNextImg" style={{ width: "30%" }}>
              <img
                className="imgStyle"
                src="arrow.png"
                alt="send"
                onClick={() => getId()}
              />
            </div>
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
          Isprazni korpu: {props.items !== null ? props.items.length : 0} Artik.
        </button>
      </div>

      <ModalCmp
        sureMessage="Da li ste sigurni?"
        showModal={showModal}
        closeModal={closeModal}
        sendOdrer={sendOdrer}
        items={props.items}
      />
    </div>
  );
};

export default withRouter(ShoppingCart);

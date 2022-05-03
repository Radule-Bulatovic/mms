import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";
import { userPath } from "../constants/path";
import ReactLoading from "react-loading";
import MenuList from "./MenuList";

const ChooseShop = (props) => {
  const [selectedCompany, setSelectedCompany] = useState([]);
  const [selectedShop, setSelectedShop] = useState([]);
  const [isValidCredentials, setIsValidCredentials] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [storageCompany, setStorageCompany] = useState(
    JSON.parse(localStorage.getItem("company"))
  );
  let { user, getCompany, getShops } = props;

  useEffect(() => {
    getCompany();
    if (user !== undefined) {
      if (user.length === 0) {
        if (storageCompany !== null) {
          getShops(storageCompany.value);
        }
      }
    }
    setIsLoading(false);
  }, [user, getCompany, getShops, storageCompany]);

  const changeCompany = (company) => {
    localStorage.setItem("company", JSON.stringify(company));
    localStorage.setItem("shop", JSON.stringify(""));
    setStorageCompany(company);

    props.addCompany(company);
    props.addShop("");
    if (selectedCompany.value !== company.value) {
      props.resetShoppingCart();
    }

    if (props.user !== undefined) {
      props.getShops(company.value);
    } else {
      props.getShops(storageCompany.value);
    }
    setSelectedCompany(company);
    setSelectedShop([]);
    setIsValidCredentials(false);
  };

  const changeShop = (shop) => {
    localStorage.setItem("shop", JSON.stringify(shop));
    props.addShop(shop);
    setSelectedShop(shop);
    setIsValidCredentials(true);
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (isValidCredentials) {
      props.addShop(selectedShop);
      // let path = userPath.order
      let path = userPath.storeSurvey;
      props.history.push(path);
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Morate odabrati firmu/prodavnicu!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  let storageUser = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      {/* <Header /> */}
      <div className="col-sm-12 height-style bck">
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
            <div className="form-group ">
              <div className="input-group">
                <div className="input-group-prepend ">
                  <span className="input-group-text whiteSpan">
                    <img className="imgStyle" src="boy.png" alt="user"></img>
                  </span>
                </div>
                <input
                  className="form-control setFont setColor"
                  placeholder="Ime"
                  value={
                    props.user.name !== undefined
                      ? props.user.name
                      : storageUser.name
                  }
                  disabled
                  style={{ backgroundColor: "white" }}
                />
              </div>
            </div>
            <form name="addForm" className="setOpacity" onSubmit={submitForm}>
              <div className="box-body">
                <div className="form-group setColor">
                  <h6 className="vendorShopsTitle">Pregled svih prodavnica:</h6>
                </div>
                <div className="form-group">
                  <Select
                    components={{ MenuList }}
                    placeholder="Izaberite firmu"
                    // value={user !== undefined ? selectedCompany : JSON.parse(localStorage.getItem('company'))}
                    value={JSON.parse(localStorage.getItem("company"))}
                    options={props.companies.map((comp) => {
                      return {
                        value: comp.company_id,
                        label: comp.company_name,
                        discount: comp.discount,
                      };
                    })}
                    onChange={changeCompany}
                  />
                </div>
                <div className="form-group">
                  <Select
                    components={{ MenuList }}
                    placeholder="Izaberite objekat"
                    // value={user !== undefined ? selectedShop : JSON.parse(localStorage.getItem('shop'))}
                    value={JSON.parse(localStorage.getItem("shop"))}
                    options={props.shops.map((shop) => {
                      return {
                        value: shop.shop_id,
                        label: shop.shop_name,
                      };
                    })}
                    onChange={changeShop}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <button
                    className="btn btn-block loginBtn form-control"
                    type="submit"
                  >
                    Nastavi narudzbinu
                  </button>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default withRouter(ChooseShop);

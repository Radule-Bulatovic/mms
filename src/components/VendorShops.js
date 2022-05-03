import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";
import { userPath } from "../constants/path";
import ReactLoading from "react-loading";
import MenuList from "./MenuList";

const VendorShops = (props) => {
  const [isValidCredentials, setIsValidCredentials] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const storageCompany = JSON.parse(localStorage.getItem("user"));

  const { user, getShopsForUser } = props;

  useEffect(() => {
    if (user.details !== undefined) {
      getShopsForUser(user.details.operater);
    } else {
      getShopsForUser(storageCompany.operater);
    }
    setIsLoading(false);
  }, [user, getShopsForUser, storageCompany]);

  const changeCompany = (company) => {
    if (company.value !== props.selectedShop.value) {
      props.resetShoppingCart();
    }
    var _company = {
      value: company.company_id,
      label: company.company_name,
      discount: company.discount,
    };
    var _shop = {
      value: company.value,
      label: company.label,
    };
    localStorage.setItem("company", JSON.stringify(_company));
    localStorage.setItem("shop", JSON.stringify(_shop));
    props.addCompany(_company);
    props.addShop(_shop);
    setIsValidCredentials(true);
  };

  const shops = () => {
    let path = userPath.shops;
    props.history.push(path);
  };

  const orders = () => {
    if (isValidCredentials || JSON.parse(localStorage.getItem("shop"))) {
      // let path = userPath.order
      let path = userPath.storeSurvey;
      props.history.push(path);
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Morate odabrati prodavnicu!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div>
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
                    {/* <i className="fa fa-user"></i> */}
                    <img className="imgStyle" src="boy.png" alt="user"></img>
                  </span>
                </div>
                <input
                  className="form-control setFont setColor"
                  value={
                    props.user.details !== undefined
                      ? props.user.details.name
                      : storageCompany.name
                  }
                  disabled
                  style={{ backgroundColor: "white" }}
                />
              </div>
            </div>
            {/* <form name="addForm" className="setOpacity" onSubmit={submitForm}> */}
            <div className="box-body">
              <div className="form-group setColor">
                <h6 className="vendorShopsTitle">
                  Pregled komercijalistinih prodavnica:
                </h6>
              </div>
              <div className="form-group">
                <Select
                  placeholder="Izaberite prodavnicu"
                  components={{ MenuList }}
                  // value={state.user !== undefined ? state.selectedShop : JSON.parse(localStorage.getItem('shop'))}
                  value={JSON.parse(localStorage.getItem("shop"))}
                  options={props.shops.map((shop) => {
                    return {
                      value: shop.shop_id,
                      label: shop.shop_name,
                      company_id: shop.company_id,
                      company_name: shop.company_name,
                      discount: shop.discount,
                    };
                  })}
                  onChange={changeCompany}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <button
                  className="btn btn-block shopsBtn form-control"
                  onClick={shops}
                >
                  Pregled svih prodavnica
                </button>
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <button
                  className="btn btn-block loginBtn form-control"
                  onClick={orders}
                >
                  Nastavi narudžbinu
                </button>
              </div>
            </div>
            {/* </form> */}
          </>
        )}
      </div>
    </div>
  );
};

export default withRouter(VendorShops);

import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";
import { userPath } from "../constants/path";
import ReactLoading from "react-loading";
import MenuList from "./MenuList";
import {
  addCompany_success,
  addShop_success,
  getShopsForUser_request,
} from "../actions/company.actions";
import { useDispatch, useSelector } from "react-redux";
import { resetShoppingCart_success } from "../actions/shoppingCart.action";

const VendorShops = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loginReducer.user);
  const shopsVendor = useSelector((state) => state.companyReducer.shopsVendor);
  const selectedShop = useSelector(
    (state) => state.companyReducer.selectedShop
  );

  const [isValidCredentials, setIsValidCredentials] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const storageCompany = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user.details !== undefined) {
      dispatch(getShopsForUser_request(user.details.operater));
    } else {
      dispatch(getShopsForUser_request(storageCompany.operater));
    }
    setIsLoading(false);
  }, [user, getShopsForUser_request, storageCompany]);

  const changeCompany = (company) => {
    if (company.value !== selectedShop.value) {
      dispatch(resetShoppingCart_success());
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
    dispatch(addCompany_success(_company));
    dispatch(addShop_success(_shop));
    setIsValidCredentials(true);
  };

  const shops = () => {
    let path = userPath.shops;
    props.history.push(path);
  };

  const orders = () => {
    if (isValidCredentials || JSON.parse(localStorage.getItem("shop"))) {
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
                    <img className="imgStyle" src="boy.png" alt="user"></img>
                  </span>
                </div>
                <input
                  className="form-control setFont setColor"
                  value={
                    user.details !== undefined
                      ? user.details.name
                      : storageCompany.name
                  }
                  disabled
                  style={{ backgroundColor: "white" }}
                />
              </div>
            </div>
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
                  value={JSON.parse(localStorage.getItem("shop"))}
                  options={shopsVendor.map((shop) => {
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
          </>
        )}
      </div>
    </div>
  );
};

export default withRouter(VendorShops);

import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";
import { userPath } from "../constants/path";
import ReactLoading from "react-loading";
import MenuList from "./MenuList";
import { useSelector, useDispatch } from "react-redux";
import {
  addCompany_success,
  addShop_success,
  getCompany_request,
  getShopsForCompany_request,
} from "../actions/company.actions";
import { resetShoppingCart_success } from "../actions/shoppingCart.action";

const ChooseShop = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [storageCompany, setStorageCompany] = useState(
    JSON.parse(localStorage.getItem("company"))
  );
  let storageUser = JSON.parse(localStorage.getItem("user"));

  const user = useSelector((state) => state.loginReducer.user);
  const companies = useSelector((state) => state.companyReducer.companies);
  const shops = useSelector((state) => state.companyReducer.shops);
  const selectedCompany = useSelector(
    (state) => state.companyReducer.selectedCompany
  );
  const selectedShop = useSelector(
    (state) => state.companyReducer.selectedShop
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCompany_request());
    if (user !== undefined) {
      if (user.length === 0) {
        if (storageCompany !== null) {
          dispatch(getShopsForCompany_request(storageCompany.value));
        }
      }
    }
    setIsLoading(false);
  }, [user, getCompany_request, getShopsForCompany_request, storageCompany]);

  const changeCompany = (company) => {
    localStorage.setItem("company", JSON.stringify(company));
    localStorage.setItem("shop", JSON.stringify(""));
    setStorageCompany(company);

    dispatch(addCompany_success(company));
    dispatch(addShop_success(""));
    if (selectedCompany.value !== company.value) {
      dispatch(resetShoppingCart_success());
    }

    if (user !== undefined) {
      getShopsForCompany_request(company.value);
    } else {
      getShopsForCompany_request(storageCompany.value);
    }
  };

  const changeShop = (shop) => {
    localStorage.setItem("shop", JSON.stringify(shop));
    dispatch(addShop_success(shop));
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (
      JSON.parse(localStorage.getItem("company"))?.value !== undefined &&
      JSON.parse(localStorage.getItem("shop"))?.value !== undefined
    ) {
      dispatch(addShop_success(selectedShop));
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
                  placeholder="Ime"
                  value={user.name !== undefined ? user.name : storageUser.name}
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
                    value={
                      selectedCompany?.value
                        ? selectedCompany
                        : JSON.parse(localStorage.getItem("company"))
                    }
                    options={companies.map((comp) => {
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
                    value={
                      selectedShop?.value
                        ? selectedShop
                        : JSON.parse(localStorage.getItem("shop"))
                    }
                    options={shops.map((shop) => {
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

import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";
import { userPath } from "../constants/path";
import ReactLoading from "react-loading";
import MenuList from "./MenuList";

const ChooseShop = (props) => {
  const [user, setUser] = useState("");
  const [companies, setCompanies] = useState("");
  const [companiesForSelect, setCompaniesForSelect] = useState("");
  const [selectedCompany, setSelectedCompany] = useState([]);
  const [shops, setShops] = useState("");
  const [shopsForSelect, setShopsForSelect] = useState("");
  const [selectedShop, setSelectedShop] = useState([]);
  const [isValidCredentials, setIsValidCredentials] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  let storageCompany;

  useEffect(() => {
    props.getCompany();
    if (props.user !== undefined) {
      if (props.user.length === 0) {
        storageCompany = JSON.parse(localStorage.getItem("company"));
        if (storageCompany !== null) {
          props.getShops(storageCompany.value);
        }
      }
    }
    setIsLoading(false);
  }, []);

  // static getDerivedStateFromProps(nextProps, prevProps) {
  //     let _isLoading
  //     let _user, _companies, shps, _selectedCompany, _selectedShop, _isValidCredentials
  //     if(nextProps.user !== prevProps.user) {
  //         _user= nextProps.user.details
  //         if(nextProps.companies !== prevProps.companies) {
  //             _isLoading = true
  //             _selectedCompany = nextProps.selectedCompany
  //             // _selectedShop = nextProps.selectedShop
  //             if(nextProps.selectedShop === prevProps.selectedShop) {
  //                 _selectedShop = []
  //                 if(nextProps.selectedShop.length === 0) {
  //                     _isValidCredentials = false
  //                 } else {
  //                     _isValidCredentials = true
  //                 }
  //             }
  //             if(nextProps.shops !== prevProps.shops) {
  //                 _selectedShop = []
  //                 _isValidCredentials = false
  //             }
  //             shps = nextProps.shops.map(shop => {
  //                 return {
  //                     value: shop.shop_id,
  //                     label: shop.shop_name,
  //                 }
  //             })
  //             _companies = nextProps.companies.map(comp => {
  //                 return {
  //                     value: comp.company_id,
  //                     label: comp.company_name,
  //                     discount: comp.discount
  //                 }
  //             })
  //         }

  //         if(nextProps.selectedCompany === prevProps.selectedCompany) {
  //             _isLoading = false

  //             _selectedShop = []
  //             _isValidCredentials = false
  //             if(nextProps.selectedShop === prevProps.selectedShop) {
  //                 _selectedCompany = nextProps.selectedCompany
  //                 _selectedShop = nextProps.selectedShop
  //                 if(nextProps.selectedShop !== undefined && prevProps.selectedShop !== undefined) {
  //                     if(nextProps.selectedShop.length === 0 && prevProps.selectedShop.length === 0) {
  //                         _isValidCredentials = false
  //                     } else {
  //                         _isValidCredentials = true

  //                     }
  //                 }

  //                 // _isValidCredentials = true
  //             }
  //             if(nextProps.selectedCompany.length === 0){
  //                 _isValidCredentials = false
  //             }
  //         }

  //         if(nextProps.shops !== prevProps.shops) {
  //             shps = nextProps.shops.map(shop => {
  //                 return {
  //                     value: shop.shop_id,
  //                     label: shop.shop_name,
  //                 }
  //             })
  //             _selectedCompany = nextProps.selectedCompany
  //             _selectedShop = nextProps.selectedShop
  //             if(nextProps.selectedCompany === prevProps.selectedCompany) {
  //                 _selectedShop = []
  //                 if(nextProps.selectedCompany.length === 0) {
  //                     _isValidCredentials = false
  //                 } else {
  //                     _isValidCredentials = true
  //                 }
  //             }
  //             if(nextProps.selectedShop === prevProps.selectedShop) {
  //                 _selectedShop = []
  //                 if(nextProps.selectedShop.length === 0) {
  //                     _isValidCredentials = false
  //                 } else {
  //                     _isValidCredentials = true
  //                 }
  //             }

  //             if(_selectedCompany.length === 0 || _selectedShop.length === 0) {
  //                 _isValidCredentials = false
  //             }
  //         }

  //         if(prevProps.user === undefined) {
  //             _isLoading = false
  //             var storageShop = JSON.parse(localStorage.getItem('shop'))
  //             if(storageShop !== null) {
  //                 if(storageShop.length === 0) {
  //                     _isValidCredentials = false
  //                 } else {
  //                     _isValidCredentials = true
  //                 }
  //             }
  //         }

  //         return {
  //             companies: _companies,
  //             shops: nextProps.shops,
  //             shopsForSelect: shps,
  //             user: _user,
  //             selectedCompany: _selectedCompany,
  //             selectedShop: _selectedShop,
  //             isValidCredentials: _isValidCredentials,
  //             //
  //             isLoading: _isLoading
  //         }
  //     }
  // }

  const changeCompany = (company) => {
    localStorage.setItem("company", JSON.stringify(company));
    localStorage.setItem("shop", JSON.stringify(""));
    storageCompany = JSON.parse(localStorage.getItem("company"));

    props.addCompany(company);
    props.addShop("");
    if (selectedCompany.value !== company.value) {
      props.resetShoppingCart();
    }

    if (user !== undefined) {
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
                  value={user !== undefined ? user.name : storageUser.name}
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

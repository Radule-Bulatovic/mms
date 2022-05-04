import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Select from "react-select";
import moment from "moment";
import Pagination from "react-js-pagination";
import AnalyticCardItem from "./singleComponent/AnalyticCardItem";
import MenuList from "./MenuList";

const Finance = (props) => {
  const [selectedCompany, setselectedCompany] = useState([]);
  const [selectedKonto, setselectedKonto] = useState("");
  const [showBalanceDetails, setshowBalanceDetails] = useState(false);
  const [showACdetails, setshowACdetails] = useState(false);

  const { getCompany } = props;

  useEffect(() => {
    getCompany();
  }, [getCompany]);

  const changeCompany = (company) => {
    if (selectedKonto.length > 0 || selectedKonto !== undefined) {
      setselectedCompany(company);
      setselectedKonto("");
      setshowBalanceDetails(false);
      setshowACdetails(false);
    } else {
      setselectedCompany(company);
    }
  };

  const changeKonto = (konto) => {
    if (
      selectedCompany.value !== undefined &&
      selectedCompany.value.length > 1
    ) {
      setselectedKonto(konto);
      setshowBalanceDetails(true);
      setshowACdetails(false);
      let details = {
        supplier_id: selectedCompany.value,
        konto: konto.value,
      };

      let newDate = new Date();
      let _date = moment(newDate).format("YYYY-MM-DD 00:00:00");
      let details_out = {
        supplier_id: selectedCompany.value,
        konto: konto.value,
        date: _date,
      };
      props.getBalance(details);
      props.getBalance_out(details_out);
    } else {
      alert("Morate izabrati firmu!");
    }
  };

  const analyticCard_click = () => {
    setshowACdetails(!showACdetails);
    let details = {
      supplier_id: selectedCompany.value,
      konto: selectedKonto.value,
    };
    props.getAnalyticCard(details);
  };

  const setActivePage = (current_page) => {
    let details = {
      supplier_id: selectedCompany.value,
      konto: selectedKonto.value,
      page: current_page,
    };
    props.getAnalyticCard(details);
  };

  const options = [
    { value: "2020", label: "2020 - Kupci" },
    { value: "2021", label: "2021 - Kupci u maloprodaji" },
    { value: "4330", label: "4330 - Dobavljači" },
    { value: "4340", label: "4340 - Ino dobavljači" },
  ];

  return (
    <div>
      {/* <Header /> */}
      <div className="col-sm-12 height-styleFinance bck">
        <form name="checkForm" className="setOpacity banacecheckForm">
          <div className="box-body">
            <div className="form-group setColor">
              <h6 className="vendorShopsTitle">Analitička kartica:</h6>
            </div>
            <div className="form-group">
              <Select
                components={{ MenuList }}
                placeholder="Izaberite firmu"
                value={selectedCompany}
                options={props.companies.map((comp) => ({
                  value: comp.company_id,
                  label: comp.company_name,
                }))}
                onChange={changeCompany}
              />
            </div>
            <div className="form-group">
              <Select
                placeholder="Izaberite konto"
                value={selectedKonto}
                options={options}
                onChange={changeKonto}
              />
            </div>
          </div>
        </form>

        {showBalanceDetails ? (
          <form name="detailsForm">
            <div className="form-group bananceDetailsForm">
              <label className="setColor">Saldo van valute</label>
              <input
                type="text"
                className="form-control balanceField balanceOutOf"
                readOnly
                style={{ background: "white", fontWeight: "bold" }}
                value={
                  props.balanceOutDetails !== undefined
                    ? parseFloat(
                        props.balanceOutDetails.duguje -
                          props.balanceOutDetails.potrazuje
                      ).toLocaleString()
                    : ""
                }
              />
            </div>
            <div className="form-group bananceDetailsForm">
              <label className="setColor">Saldo</label>
              <input
                type="text"
                className="form-control balanceField"
                readOnly
                style={{ background: "white", fontWeight: "bold" }}
                value={
                  props.balanceDetails !== undefined
                    ? parseFloat(
                        props.balanceDetails.duguje -
                          props.balanceDetails.potrazuje
                      ).toLocaleString()
                    : ""
                }
              />
            </div>
            <div className="form-group bananceDetailsForm">
              <label className="setColor">Duguje</label>
              <input
                type="text"
                className="form-control balanceField"
                readOnly
                style={{ background: "white" }}
                value={
                  props.balanceDetails !== undefined
                    ? parseFloat(props.balanceDetails.duguje).toLocaleString()
                    : ""
                }
              />
            </div>
            <div className="form-group bananceDetailsForm">
              <label className="setColor">Potražuje</label>
              <input
                type="test"
                className="form-control balanceField"
                readOnly
                style={{ background: "white" }}
                value={
                  props.balanceDetails !== undefined
                    ? parseFloat(
                        props.balanceDetails.potrazuje
                      ).toLocaleString()
                    : ""
                }
              />
            </div>
            <div className="bananceDetails setColor acTitle">
              <h6 className="vendorShopsTitle" onClick={analyticCard_click}>
                Detaljna analitička kartica {">>"}
              </h6>
            </div>
          </form>
        ) : (
          ""
        )}

        {showACdetails ? (
          <table className=" table table-striped col-sm-12">
            <thead className="tableHeader">
              <tr className="sortCursor">
                <th className="thAnalticalItem">Datum</th>
                <th className="thAnalticalItem rightAlign">Duguje</th>
                <th className="thAnalticalItem rightAlign">Potražuje</th>
              </tr>
            </thead>
            <tbody>
              {props.analyticCard?.data !== undefined ? (
                props.analyticCard.data.map((ac, index) => {
                  return (
                    <AnalyticCardItem
                      key={index}
                      date={ac.date}
                      dug={ac.dug}
                      pot={ac.pot}
                    />
                  );
                })
              ) : (
                <tr></tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <td className="pagination-sm">
                  <Pagination
                    activePage={props.analyticCard}
                    itemsCountPerPage={props.analyticCard.per_page}
                    totalItemsCount={props.analyticCard.total}
                    pageRangeDisplayed={5}
                    onChange={setActivePage}
                    itemClass="page-item"
                    linkClass="page-link"
                  />
                </td>
              </tr>
            </tfoot>
          </table>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default withRouter(Finance);

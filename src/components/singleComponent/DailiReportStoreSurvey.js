import React from "react";
import { withRouter } from "react-router-dom";

const DailiReportStoreSurvey = (props) => (
  <tr onClick={props.showItems}>
    <td>{props.company_name}</td>
    <td>{props.shop_name}</td>
    <td>
      {" "}
      {props.datum}
      {/* <button
                        className="btn btn-sm btn-primary"
                        onClick={(e) => {
                        e.preventDefault();
                        window.location.href='https://maps.google.com/maps?q='+props.latitude+','+props.longitude+'&hl=es&z=14&amp;output=embed';
                        }}
                    > 
                    Lokacija
                    </button> */}
    </td>
  </tr>
);

export default withRouter(DailiReportStoreSurvey);

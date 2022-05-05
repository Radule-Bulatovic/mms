import React from "react";
import { withRouter } from "react-router-dom";

const DailyReportItemAdmin = (props) => (
  <tr onClick={props.showItems}>
    <td>{props.company_name}</td>
    <td>{props.shop_name}</td>
    <td>{props.invoice_id}</td>
    <td> {props.date}</td>
    {/* <button
            className="btn btn-sm btn-primary"
            onClick={(e) => {
            e.preventDefault();
            window.location.href='https://maps.google.com/maps?q='+props.latitude+','+props.longitude+'&hl=es&z=14&amp;output=embed';
            }}
        > Lokacija</button> */}
  </tr>
);

export default withRouter(DailyReportItemAdmin);

import React from "react";
import { withRouter } from "react-router-dom";

const DailyReportItem = (props) => (
  <tr onClick={props.showItems}>
    {/* <td className="tableBody cartItem">{props.id}</td> */}
    <td>{props.company_name}</td>
    <td>{props.shop_name}</td>
    {/* <td>{props.status}</td> */}
    <td>{props.invoice_id}</td>
  </tr>
);

export default withRouter(DailyReportItem);

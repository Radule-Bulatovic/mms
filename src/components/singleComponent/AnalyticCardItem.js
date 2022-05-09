import React from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";

const AnalyticCardItem = (props) => (
  <tr>
    <td className="leftAlign">{moment(props.date).format("DD-MM-YYYY")}</td>
    <td className="rightAlign">{props.dug === ".00" ? "0.00" : props.dug}</td>
    <td className="rightAlign">{props.pot === ".00" ? "0.00" : props.pot}</td>
  </tr>
);

export default withRouter(AnalyticCardItem);

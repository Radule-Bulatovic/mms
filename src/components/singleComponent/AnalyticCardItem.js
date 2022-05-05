import React from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";

const AnalyticCardItem = (props) => (
  <tr>
    <td className="leftAlign">
      {moment(this.props.date).format("DD-MM-YYYY")}
    </td>
    <td className="rightAlign">
      {this.props.dug === ".00" ? "0.00" : this.props.dug}
    </td>
    <td className="rightAlign">
      {this.props.pot === ".00" ? "0.00" : this.props.pot}
    </td>
  </tr>
);

export default withRouter(AnalyticCardItem);

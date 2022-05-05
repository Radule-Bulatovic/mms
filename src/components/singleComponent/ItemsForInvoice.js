import React from "react";
import { withRouter } from "react-router-dom";

const ItemsForInvoice = (props) => (
  <tr>
    <td>{props.item}</td>
    <td>{parseInt(props.quantity)}</td>
    <td>{props.price}</td>
    <td>{props.discount === ".00" ? "0.00" : props.discount}</td>
  </tr>
);

export default withRouter(ItemsForInvoice);

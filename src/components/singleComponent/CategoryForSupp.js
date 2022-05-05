import React from "react";
import { withRouter } from "react-router-dom";

const CaregoryForSupp = (props) => (
  <li className="productForCategory" onClick={props.getArticles}>
    {props.group_name}
  </li>
);

export default withRouter(CaregoryForSupp);

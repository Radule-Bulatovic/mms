import React from "react";
import { withRouter } from "react-router-dom";

const GroupForSmall = (props) => (
  <li>
    <a
      href="#homeSubmenu"
      data-toggle="collapse"
      aria-expanded="false"
      className="dropdown-toggle"
      onClick={() => props.getArticles(props.group_id)}
    >
      {props.group_name}
    </a>
  </li>
);

export default withRouter(GroupForSmall);

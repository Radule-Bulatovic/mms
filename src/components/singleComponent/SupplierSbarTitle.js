import React from "react";
import { withRouter } from "react-router-dom";
import CategoryForSupp from "./CategoryForSupp";

const SupplierSbarTitle = (props) => {
  const getArticles = (company_id, supplier_id, group_id) => {
    var storageCompany = JSON.parse(localStorage.getItem("company"));
    props.getArticlesForGroupSuppCmp(
      storageCompany.value,
      supplier_id,
      group_id
    );
  };

  const closeAllDropdowns = () => {
    const aElements = document.querySelectorAll("li.sidebar-category a");
    for (var i = 0; i < aElements.length; i++) {
      aElements[i].classList.remove("collapsed");
      aElements[i].setAttribute("aria-expanded", false);
    }

    const ulElements = document.querySelectorAll("li.sidebar-category ul");
    for (i = 0; i < ulElements.length; i++) {
      ulElements[i].classList.remove("show");
    }
  };

  return (
    <li className="sidebar-category">
      {/* <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle" */}
      <a
        href={`#homeSubmenu${props.supp_id}`}
        data-toggle="collapse"
        aria-expanded="false"
        className="dropdown-toggle"
        onClick={() => {
          props.showGroup(props.supp_id);
          closeAllDropdowns();
        }}
      >
        {props.supplier_name}
      </a>
      {/* <ul className="collapse list-unstyled" id="homeSubmenu"> */}
      <ul className="collapse list-unstyled" id={`homeSubmenu${props.supp_id}`}>
        {/* <ul className="collapse list-unstyled" id={`#homeSubmenu${props.supp_id}`}> */}
        {props.categories.length > 0
          ? props.categories.map((cat) => {
              return (
                <CategoryForSupp
                  key={cat.id}
                  group_id={cat.group_id}
                  group_name={cat.group_name}
                  getArticles={() =>
                    getArticles(
                      props.company.value,
                      props.supplier_id,
                      cat.group_id
                    )
                  }
                />
              );
            })
          : ""}
      </ul>
    </li>
  );
};

export default withRouter(SupplierSbarTitle);

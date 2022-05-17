import React from "react";
import { withRouter } from "react-router-dom";
import CategoryForSupp from "./CategoryForSupp";
import { useDispatch, useSelector } from "react-redux";
import { getArticlesForGroupSuppCmp_request } from "../../actions/article.action";
const SupplierSbarTitle = (props) => {
  const dispatch = useDispatch();

  const company = useSelector((state) => state.companyReducer.selectedCompany);
  const categories = useSelector((state) => state.orderReducer.categories);

  const getArticles = (company_id, supplier_id, group_id) => {
    var storageCompany = JSON.parse(localStorage.getItem("company"));
    dispatch(
      getArticlesForGroupSuppCmp_request(
        storageCompany.value,
        supplier_id,
        group_id
      )
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
        {categories.length > 0
          ? categories.map((cat) => {
              return (
                <CategoryForSupp
                  key={cat.id}
                  group_id={cat.group_id}
                  group_name={cat.group_name}
                  getArticles={() =>
                    getArticles(company.value, props.supplier_id, cat.group_id)
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

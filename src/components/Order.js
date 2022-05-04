import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Pagination from "react-js-pagination";
import ArticleCnt from "../containers/ArticleCnt";
import GroupForSmall from "./singleComponent/GroupForSmall";
import SupplierSbarTitleCnt from "../containers/SupplierSbarTitleCnt";
import { userPath } from "../constants/path";
import ReactLoading from "react-loading";

const Order = (props) => {
  const [searchArtical, setSearchArtical] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  let storageCompany = JSON.parse(localStorage.getItem("company"));
  let storageShop = JSON.parse(localStorage.getItem("shop"));

  useEffect(() => {
    if (props.company.value !== undefined) {
      if (
        props.company.value === "L001" ||
        props.company.value === "V003" ||
        props.company.value === "D020" ||
        props.company === "F030" ||
        props.company === "M020"
      ) {
        props.getArticlesForCompany(
          props.company.value,
          props.articles.current_page
        );
        props.getSuppliersForCompany(props.company.value);
      } else {
        props.getArticles(props.articles.current_page);
        props.getAllGroups();
      }
    } else {
      if (
        storageCompany.value === "L001" ||
        storageCompany.value === "V003" ||
        storageCompany.value === "D020" ||
        storageCompany === "F030" ||
        storageCompany === "M020"
      ) {
        props.getArticlesForCompany(
          storageCompany.value,
          props.articles.current_page
        );
        props.getSuppliersForCompany(storageCompany.value);
      } else {
        props.getArticles(props.articles.current_page);
        props.getAllGroups();
      }
    }
    setIsLoading(false);
  }, []);

  const shoppingCartFun = () => {
    let path = userPath.shoppingCart;
    props.history.push(path);
  };

  const showGroup = (supplier_id) => {
    if (props.company.value !== undefined) {
      props.getCategoriesForSuppCmp(0, 0);
      props.getCategoriesForSuppCmp(props.company.value, supplier_id);
    } else {
      storageCompany = JSON.parse(localStorage.getItem("company"));
      localStorage.setItem("supplier_id", supplier_id);
      props.getCategoriesForSuppCmp(0, 0);
      props.getCategoriesForSuppCmp(storageCompany.value, supplier_id);
    }
  };

  const setActivePage = (current_page) => {
    if (
      props.company.value === "L001" ||
      props.company.value === "V003" ||
      props.company.value === "D020" ||
      props.company === "F030" ||
      props.company === "M020"
    ) {
      props.getArticlesForCompany(props.company.value, current_page);
    } else {
      props.getArticles(current_page);
    }
  };

  //get props.articles for group - small props.company
  const articlesForGroup = (group_id) => {
    // console.log('current_page = ',current_page);
    // props.getArticlesForGroup(group_id,current_page)

    // ako se koristi paginacija, npr strana 5...Kada se odaberu novi proizovdi iz grupe, da se paginacija vrati na prvu stranu
    props.getArticlesForGroup(group_id, 1);
  };

  const change = (art) => {
    setSearchArtical(art.target.value);
  };

  const search = () => {
    if (
      props.company.value === "L001" ||
      props.company.value === "V003" ||
      props.company.value === "D020" ||
      props.company === "F030" ||
      props.company === "M020"
    ) {
      if (searchArtical.length > 0) {
        props.searchArticleForCmp(
          props.company.value,
          searchArtical,
          props.articles.current_page
        );
      } else {
        props.props.getArticlesForCompany(
          props.company.value,
          props.articles.current_page
        );
        props.getSuppliersForCompany(props.company.value);
      }
    } else {
      if (searchArtical.length > 0) {
        // console.log('> 0');
        props.searchAllArticles(searchArtical, props.articles.current_page);
      } else {
        // console.log('else');
        props.getArticles(props.articles.current_page);
        props.getAllGroups();
      }
    }
    setSearchArtical("");
  };

  return (
    <div>
      {isLoading ? (
        <div className="wrapper bckOrders">
          <div
            style={{
              width: "50px",
              height: "50px",
              marginLeft: "45%",
              paddingTop: "50%",
            }}
          >
            <ReactLoading type="spin" style={{ textAlign: "left" }} />
          </div>
        </div>
      ) : (
        <>
          <nav className="navbar navStyle">
            <div className="container-fluid">
              <div className="navbar-header">
                <div className="input-group divSearch">
                  <input
                    className="form-control searchField"
                    placeholder="Naziv"
                    type="text"
                    onChange={change}
                  />
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text searchSpan "
                      style={{
                        borderTopRightRadius: "5px",
                        borderBottomRightRadius: "5px",
                      }}
                    >
                      <img
                        className="imgStyle "
                        src="s.png"
                        alt="user"
                        onClick={search}
                      ></img>
                    </span>
                  </div>
                </div>
              </div>
              <ul className="nav navbar-right">
                <li>
                  <button
                    className="btn headerBtn shadow"
                    type="button"
                    id="sidebarCollapse"
                    onClick={() => {
                      window.jQuery("#sidebar").toggleClass("active");
                    }}
                  >
                    {/* <button className="btn headerBtn shadow" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" > */}
                    <i className="fas fa-align-left"></i>
                  </button>
                </li>
                <li>
                  <button
                    className="btn headerBtn shadow"
                    type="button"
                    onClick={() => shoppingCartFun()}
                  >
                    <i className="fas fa-shopping-cart"></i>
                  </button>
                </li>
              </ul>
            </div>
          </nav>

          <div className="wrapper bckOrders">
            <nav
              id="sidebar"
              className="navbarStyle"
              style={{ backgroundColor: "#fff1d8" }}
            >
              {/* <nav id="collapseExample" className="collapse navbarStyle" style={{'minWidth': '54%'}}> */}
              {/* <div className="sidebar-header">
                                <img src="logo.png" className="user-image logoSidebar" alt="user" />
                                <h6>MMS</h6>
                            </div> */}
              <div className="form-group sbHeaderDetails ">
                <div className="input-group">
                  <div className="input-group-prepend setSpanHeight">
                    <span className="input-group-text noBorder">
                      <img
                        className="imgStyle setMarginSpan"
                        src="c.png"
                        alt="user"
                      ></img>
                    </span>
                  </div>
                  <input
                    className="form-control sidebarInput shadow"
                    placeholder="Firma"
                    value={
                      props.company.label !== undefined
                        ? props.company.label
                        : storageCompany.label
                    }
                    disabled
                    style={{ backgroundColor: "white" }}
                  />
                </div>
              </div>

              <div className="form-group sidebarForm">
                <div className="input-group">
                  <div className="input-group-prepend setSpanHeight">
                    <span className="input-group-text noBorder">
                      <img
                        className="imgStyle setMarginSpan"
                        src="shop.png"
                        alt="user"
                      ></img>
                    </span>
                  </div>
                  <input
                    className="form-control sidebarInput shadow"
                    placeholder="Objekat"
                    value={
                      props.shop.label !== undefined
                        ? props.shop.label
                        : storageShop.label
                    }
                    disabled
                    style={{ backgroundColor: "white" }}
                  />
                </div>
              </div>

              <div
                className="form-group sbHeaderDetails "
                style={{ marginTop: "-14px" }}
              >
                <div className="input-group">
                  <div className="input-group-prepend setSpanHeight">
                    <span className="input-group-text noBorder">
                      <img
                        className="imgStyle setMarginSpan"
                        src="dsc2.png"
                        alt="user"
                      ></img>
                    </span>
                  </div>
                  <input
                    className="form-control sidebarInput shadow"
                    placeholder="Firma"
                    value={
                      props.company.discount !== undefined
                        ? props.company.discount + "%"
                        : storageCompany.discount + "%"
                    }
                    disabled
                    style={{ backgroundColor: "white" }}
                  />
                </div>
              </div>
              {/* </div> */}
              {/* className="list-unstyled components" */}
              <ul className="list-unstyled" style={{ fontSize: "12px" }}>
                <h6 className="titleCategory">Kategorije proizvoda</h6>
                {/* <li className="active"> */}

                {props.company.value !== undefined
                  ? props.company.value === "L001" ||
                    props.company.value === "V003" ||
                    props.company.value === "D020" ||
                    props.company === "F030"
                    ? props.suppliers.map((supp) => {
                        return (
                          <SupplierSbarTitleCnt
                            key={supp.id}
                            supp_id={supp.supplier_id}
                            supplier_name={supp.supplier_name}
                            showGroup={() => showGroup(supp.supplier_id)}
                            categories={props.categories}
                            supplier_id={supp.supplier_id}
                          />
                        );
                      })
                    : // add groups for small props.company
                      props.allGroups.map((group) => {
                        return (
                          <GroupForSmall
                            key={group.id}
                            group_id={group.group_id}
                            group_name={group.group_name}
                            getArticles={() =>
                              props.articlesForGroup(group.group_id)
                            }
                          />
                        );
                      })
                  : storageCompany.value === "L001" ||
                    storageCompany.value === "V003" ||
                    storageCompany.value === "D020" ||
                    storageCompany === "F030"
                  ? props.suppliers.map((supp) => {
                      return (
                        <SupplierSbarTitleCnt
                          key={supp.id}
                          supp_id={supp.supplier_id}
                          supplier_name={supp.supplier_name}
                          showGroup={() => showGroup(supp.supplier_id)}
                          categories={props.categories}
                          supplier_id={supp.supplier_id}
                        />
                      );
                    })
                  : // add groups for small props.company
                    props.allGroups.map((group) => {
                      return (
                        <GroupForSmall
                          key={group.id}
                          group_id={group.group_id}
                          group_name={group.group_name}
                          getArticles={() =>
                            props.articlesForGroup(group.group_id)
                          }
                        />
                      );
                    })}
              </ul>
            </nav>

            <table className=" table table-striped col-sm-12">
              <thead className="tableHeader">
                <tr className="sortCursor">
                  <th className="thCartName">
                    {/* <span className="fa fa-sort"></span> */}
                    Naziv
                  </th>
                  <th className="thCart">
                    {/* <span className="fa fa-sort"></span> */}
                    Lager
                  </th>
                  <th className="thCart">
                    <span className="fa fa-sort spanEuro"></span>
                    &euro;
                  </th>
                  <th className="thCart">Kol.</th>
                  <th className="thCart"></th>
                </tr>
              </thead>
              <tbody>
                {props.articles.data !== undefined ? (
                  props.articles.data.map((article) => {
                    return (
                      <ArticleCnt
                        key={article.id}
                        id={article.article_id}
                        name={article.article_name}
                        count={article.count}
                        price={article.price}
                        tax={article.tax}
                      />
                    );
                  })
                ) : (
                  <tr>
                    <td>Podaci se učitavaju!</td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td className="pagination-sm">
                    <Pagination
                      activePage={props.articles.current_page}
                      itemsCountPerPage={props.articles.per_page}
                      totalItemsCount={props.articles.total}
                      pageRangeDisplayed={5}
                      onChange={setActivePage}
                      itemClass="page-item"
                      linkClass="page-link"
                    />
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default withRouter(Order);

import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Pagination from "react-js-pagination";
import GroupForSmall from "./singleComponent/GroupForSmall";
import { userPath } from "../constants/path";
import ReactLoading from "react-loading";
import { SwipeableDrawer } from "@material-ui/core";
import {
  getArticleForCompany_request,
  getArticlesForGroup_request,
  getArticles_request,
  searchAllArticle_request,
  searchArticleForCmp_request,
} from "../actions/article.action";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoryForSuppCmp_request,
  getSuppForCmp_request,
} from "../actions/category.actions";
import { getGroups_request } from "../actions/group.action";
import Article from "./singleComponent/Article";
import SupplierSbarTitle from "./singleComponent/SupplierSbarTitle";

const Order = (props) => {
  const dispatch = useDispatch();

  const company = useSelector((state) => state.companyReducer.selectedCompany);
  const shop = useSelector((state) => state.companyReducer.selectedShop);
  const articles = useSelector((state) => state.articleReducer.articles);
  const suppliers = useSelector((state) => state.orderReducer.suppliers);
  const categories = useSelector((state) => state.orderReducer.categories);
  const allGroups = useSelector((state) => state.groupReducer.groups);

  const [searchArtical, setSearchArtical] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);

  let storageCompany = JSON.parse(localStorage.getItem("company"));
  let storageShop = JSON.parse(localStorage.getItem("shop"));

  useEffect(() => {
    dispatch(getSuppForCmp_request(storageCompany.value));
    dispatch(getArticles_request(articles.current_page));
    dispatch(getGroups_request());
    setIsLoading(false);
  }, []);

  const openDrawer = () => {
    setShowDrawer(true);
  };

  const closeDrawer = () => {
    setShowDrawer(false);
  };

  const shoppingCartFun = () => {
    let path = userPath.shoppingCart;
    props.history.push(path);
  };

  const showGroup = (supplier_id) => {
    if (company.value !== undefined) {
      dispatch(getCategoryForSuppCmp_request(0, 0));
      dispatch(getCategoryForSuppCmp_request(company.value, supplier_id));
    } else {
      storageCompany = JSON.parse(localStorage.getItem("company"));
      localStorage.setItem("supplier_id", supplier_id);
      dispatch(getCategoryForSuppCmp_request(0, 0));
      dispatch(
        getCategoryForSuppCmp_request(storageCompany.value, supplier_id)
      );
    }
  };

  const setActivePage = (current_page) => {
    if (
      company.value === "L001" ||
      company.value === "V003" ||
      company.value === "D020" ||
      company === "F030" ||
      company === "M020"
    ) {
      dispatch(getArticleForCompany_request(company.value, current_page));
    } else {
      dispatch(getArticles_request(current_page));
    }
  };

  //get articles for group - small company
  const articlesForGroup = (group_id) => {
    dispatch(getArticlesForGroup_request(group_id, 1));
    closeDrawer();
  };

  const change = (art) => {
    setSearchArtical(art.target.value);
  };

  const search = () => {
    if (
      company.value === "L001" ||
      company.value === "V003" ||
      company.value === "D020" ||
      company === "F030" ||
      company === "M020"
    ) {
      if (searchArtical.length > 0) {
        dispatch(
          searchArticleForCmp_request(
            company.value,
            searchArtical,
            articles.current_page
          )
        );
      } else {
        dispatch(
          getArticleForCompany_request(company.value, articles.current_page)
        );
        dispatch(getSuppForCmp_request(company.value));
      }
    } else {
      if (searchArtical.length > 0) {
        dispatch(
          searchAllArticle_request(searchArtical, articles.current_page)
        );
      } else {
        dispatch(getArticles_request(articles.current_page));
        dispatch(getGroups_request());
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
                    onClick={openDrawer}
                  >
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
            <SwipeableDrawer
              id="sidebar"
              anchor="left"
              open={showDrawer}
              onClose={closeDrawer}
              onOpen={openDrawer}
              PaperProps={{
                style: { backgroundColor: "#fff1d8" },
              }}
            >
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
                      company.label !== undefined
                        ? company.label
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
                      shop?.label !== undefined ? shop.label : storageShop.label
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
                      company.discount !== undefined
                        ? company.discount + "%"
                        : storageCompany.discount + "%"
                    }
                    disabled
                    style={{ backgroundColor: "white" }}
                  />
                </div>
              </div>
              <ul className="list-unstyled" style={{ fontSize: "12px" }}>
                <h6 className="titleCategory">Kategorije proizvoda</h6>

                {company.value !== undefined
                  ? company.value === "L001" ||
                    company.value === "V003" ||
                    company.value === "D020" ||
                    company === "F030"
                    ? suppliers.map((supp) => {
                        return (
                          <SupplierSbarTitle
                            key={supp.id}
                            supp_id={supp.supplier_id}
                            supplier_name={supp.supplier_name}
                            showGroup={() => showGroup(supp.supplier_id)}
                            categories={categories}
                            supplier_id={supp.supplier_id}
                          />
                        );
                      })
                    : // add groups for small company
                      allGroups.map((group) => {
                        return (
                          <GroupForSmall
                            key={group.id}
                            group_id={group.group_id}
                            group_name={group.group_name}
                            getArticles={() => articlesForGroup(group.group_id)}
                          />
                        );
                      })
                  : storageCompany.value === "L001" ||
                    storageCompany.value === "V003" ||
                    storageCompany.value === "D020" ||
                    storageCompany === "F030"
                  ? suppliers.map((supp) => {
                      return (
                        <SupplierSbarTitle
                          key={supp.id}
                          supp_id={supp.supplier_id}
                          supplier_name={supp.supplier_name}
                          showGroup={() => showGroup(supp.supplier_id)}
                          categories={categories}
                          supplier_id={supp.supplier_id}
                        />
                      );
                    })
                  : // add groups for small company
                    allGroups.map((group) => {
                      return (
                        <GroupForSmall
                          key={group.id}
                          group_id={group.group_id}
                          group_name={group.group_name}
                          getArticles={() => articlesForGroup(group.group_id)}
                        />
                      );
                    })}
              </ul>
            </SwipeableDrawer>

            <table className=" table table-striped col-sm-12">
              <thead className="tableHeader">
                <tr className="sortCursor">
                  <th className="thCartName">Naziv</th>
                  <th className="thCart">Lager</th>
                  <th className="thCart">
                    <span className="fa fa-sort spanEuro"></span>
                    &euro;
                  </th>
                  <th className="thCart">Kol.</th>
                  <th className="thCart"></th>
                </tr>
              </thead>
              <tbody>
                {articles.data !== undefined ? (
                  articles.data.map((article) => {
                    return (
                      <Article
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
                      activePage={articles.current_page}
                      itemsCountPerPage={articles.per_page}
                      totalItemsCount={articles.total}
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

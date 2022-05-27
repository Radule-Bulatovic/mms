import axios from "axios";

var apiUrl =
  true >= 0 ? "https://laravel.mms1.mils.me" : "http://api.mmsnew.test";
// var apiUrl = "http://127.0.0.1:8000";
var config = {
  headers: { Authorization: "bearer " + localStorage.getItem("token") },
};

export function login_api(credentials) {
  return axios
    .post(apiUrl + "/api/auth/login", {
      email: credentials.payload.email,
      password: credentials.payload.password,
    })
    .catch((error) => {
      if (error.response && error.response.data && error.response.data.error) {
        return error.response.data.error;
      }
      return error.response.data;
    });
}

export function logout_api() {
  // return axios.get(apiUrl+ '/api/auth/logout', config)
  return axios.get(apiUrl + "/logout");
}

export function getCompany_api() {
  return axios.get(apiUrl + "/companies");
}

//add company id
export function getShopsForCompany_api(company) {
  return axios.get(apiUrl + "/shopsForCompany/" + company);
}

//get company for user
export function getShopsForUser_api(user) {
  return axios.get(apiUrl + "/shopsForCommercialist/" + user);
}

//get articles for company(Lakovic)
export function getArticlesForCmp_api(company, page) {
  return axios.get(apiUrl + "/articlesForCompany/" + company + "?page=" + page);
}

//get suppliers for company
export function getSuppForCmp_api(company) {
  return axios.get(apiUrl + "/suppliersForCompany/" + company);
}

//get category/groups from supplier and company
export function getCategoryForSuppAndCmp_api(company, supplier) {
  return axios.get(
    apiUrl + "/categoryForSuppAndCmp/" + company + "/" + supplier
  );
}

//get all articles
export function getArticles_api(page) {
  return axios.get(apiUrl + "/getArticles?page=" + page);
}

export function getGroups_api(page) {
  return axios.get(apiUrl + "/getGroups?page=" + page);
}

//get articles for group - small company
export function getArticlesForGroup_api(group, page) {
  return axios.get(apiUrl + "/getArticlesForGroup/" + group + "?page=" + page);
}

//GET article for group -> supplier -> company
export function getArticlesForGroupSuppCmp_api(
  company_id,
  supplier_id,
  group_id,
  page
) {
  return axios.get(
    apiUrl +
      "/articlesForGroupAndSuppAndCmp/" +
      company_id +
      "/" +
      supplier_id +
      "/" +
      group_id +
      "?page=" +
      page
  );
}

//search api for all articles and art for company
export function searchAllArticles_api(string, page) {
  return axios.get(apiUrl + "/searchAllArticles/" + string + "?page=" + page);
}
export function searchArticlesForCmp_api(cmp, string, page) {
  return axios.get(
    apiUrl + "/searchArticlesForCmp/" + cmp + "/" + string + "?page=" + page
  );
}

export function getMaxInvoiceId_api() {
  return axios.get(apiUrl + "/getMaxId");
}

//invoice routes
export function setInvoiceHeader_api(details) {
  // return axios.post(apiUrl + "/setInvoiceHeader", details.payload, config);
}
export function setInvoiceItem_api(details) {
  // return axios.post(apiUrl + "/setInvoiceItem", details.payload, config);
}

// get result(saldo) - for all time
export function getBalance_api(details) {
  return axios.get(
    apiUrl + "/getBalance/" + details.supplier_id + "/" + details.konto,
    config
  );
}
//get result(saldo) - for out of time
export function getBalanceOut_api(details) {
  return axios.get(
    apiUrl +
      "/getBalance_out/" +
      details.supplier_id +
      "/" +
      details.konto +
      "/" +
      details.date,
    config
  );
}
// get analytic card for supplier and 'konto' - get all payment details
export function getAnalyticCard_api(details, page) {
  return axios.get(
    apiUrl +
      "/getAnalyticCard/" +
      details.supplier_id +
      "/" +
      details.konto +
      "?page=" +
      details.page,
    config
  );
}

//REPORTS
//daily report for current data
export function getInvoicesForData_api(details) {
  return axios.get(
    apiUrl + "/getDailyReport/" + details.user + "/" + details.date
  );
}

export function getItemsForInvoice_api(details) {
  return axios.get(apiUrl + "/getItemsForInvoice/" + details);
}

//get store survey
export function getStoreSurvey_api() {
  return axios.get(apiUrl + "/getStoreSurvey");
}
//post store survey
export function postStoreSurvey_api(details) {
  // return axios.post(
  //   apiUrl + "/setStoreSurveyHistoryItem",
  //   details.payload,
  //   config
  // );
}

//post store survey
export function postStoreSurveyAdmin_api(details) {
  // return axios.post(
  //   apiUrl + "/setStoreSurveyAdminHistoryItem",
  //   details.payload,
  //   config
  // );
}

//post schedule history item
export function postScheduleHist_api(details) {
  // return axios.post(apiUrl + "/setScheduleHist", details.payload);
}
//get all users for report - admin
export function getUsersForReport_api() {
  return axios.get(apiUrl + "/getUsersForReport");
}
//get store survey admin
export function getStoreSurveyAdmin_api() {
  return axios.get(apiUrl + "/getStoreSurveyAdmin");
}

export function getSSforComercAndData_api(details) {
  return axios.get(
    apiUrl +
      "/getStoreSurvey/" +
      details.payload.user +
      "/" +
      details.payload.date
  );
}
export function getSSforComercAndDataAndCmpAndShop_api(details) {
  return axios.get(
    apiUrl +
      "/getStoreSurveyUserDateCmpShop/" +
      details.payload.user +
      "/" +
      details.payload.date +
      "/" +
      details.payload.company_id +
      "/" +
      details.payload.shop_id
  );
}
//get schedule history for vendor, date
export function checkScheduleVendorDate_api(details) {
  return axios.get(
    apiUrl +
      "/checkSchedule/" +
      details.payload.operater +
      "/" +
      details.payload.date +
      "/" +
      details.payload.fullDate
  );
}

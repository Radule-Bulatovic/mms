<?php

use Dingo\Api\Routing\Router;
use App\User;

/** @var Router $api */
$api = app(Router::class);

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return User::all();
    return "view('welcome')";
});

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/test', function () {
    return User::all();

    // info('This is some useful information.');
    // return view('tesing laravel guery');
});


// $api->group(['middleware' => 'jwt.auth'], function(Router $api) {

Route::get('companies', 'CompanyController@index');
Route::get('shops', 'ShopController@index');
Route::get('shopsForCompany/{id}', 'ShopController@shopsForCompany');
// Route::get('shopsForCommercialist/{id}', 'CompanyController@shopsForCommercialist');
Route::get('shopsForCommercialist/{id}', 'ShopController@shopsForCommercialist');

Route::get('articlesForCompany/{id}', 'ArticleController@getArtForCom');
Route::get('suppliersForCompany/{id}', 'ArticleController@getSupplierForCompany');
Route::get('categoryForSuppAndCmp/{cmp_id}/{supp_id}', 'ArticleController@getCategoryForSuppAndCmp');
//search articles for supplier and company
Route::get('articlesForGroupAndSuppAndCmp/{cmp_id}/{supp_id}/{group_id}', 'ArticleController@getArticleForGroupSuppCmp');
//search routes
Route::get('searchArticlesForCmp/{id}/{value}', 'ArticleController@searchArticlesFroCmp');
Route::get('searchAllArticles/{value}', 'ArticleForAllController@searchAllArticles');

//routes for small companies, get all products, and all groups
Route::get('getArticles', 'ArticleForAllController@getArticles');
Route::get('getGroups', 'GroupController@getAllCategories');
Route::get('getArticlesForGroup/{group}', 'ArticleForAllController@getArticlesForGroup');

//invoice routes
Route::get('getMaxId', 'InvoiceHeaderController@getMaxInvoiceId');
//write invoice header
Route::post('setInvoiceHeader', 'InvoiceHeaderController@setInvoiceHeader');
//write invoice items
Route::post('setInvoiceItem', 'InvoiceItemController@setInvoiceItem');

//get result balance for analytic card(supplier_id, konto)
Route::get('getBalance/{supplier_id}/{konto}', 'AnalyticalCardCnt@getBalance');
//get result balance out of time for analytic card(supplier_id, konto)
Route::get('getBalance_out/{supplier_id}/{konto}/{date}', 'AnalyticalCardCnt@getBalance_outOfTime');
//get analytic card details(full hisotry of payment)
Route::get('getAnalyticCard/{supplier_id}/{konto}', 'AnalyticalCardCnt@getAnalyticCard');
//report routers

//get all invoices for user and date
Route::get('getDailyReport/{user}/{date}', 'InvoiceHeaderController@getInvoicesForDate');
//get items for invoice
Route::get('getItemsForInvoice/{invoice_id}', 'InvoiceItemController@getItemsForInv');

//get store survey
Route::get('getStoreSurvey', 'StoreSurveyCnt@getStoreSurvey');
//get store survey ADMIN
Route::get('getStoreSurveyAdmin', 'StoreSurveyAdminCnt@getStoreSurveyAdmin');
//write store survey history
Route::post('setStoreSurveyHistoryItem', 'StoreSurveyHistoryCnt@setStoreSurveyItem');

//write store survey admin history
Route::post('setStoreSurveyAdminHistoryItem', 'StoreSurveyAdminHistoryCnt@setStoreSurveyAdminItem');

//write item in schedule history
Route::post('setScheduleHist', 'ScheduleHistCnt@setScheduleItem');

//check schedule for user
Route::get('checkSchedule/{user}/{date}/{fullDate}', 'ScheduleHistCnt@checkSchedule');

//get daily report for all users - ADMIN report
Route::get('getUsersForReport', 'InvoiceHeaderController@getUsers');

//get all store survey items for comercialist and
Route::get('getStoreSurvey/{user}/{date}', 'StoreSurveyHistoryCnt@getStoreSurveyForComercAndDate');
//get all store survey items for comercialist and date and company and shop
Route::get('getStoreSurveyUserDateCmpShop/{user}/{date}/{company}/{shop}', 'StoreSurveyHistoryCnt@getStoreSurveyForComercAndDateAndCmpAndShop');
// }

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Company;

class CompanyController extends Controller
{
    //
    public function index() {
        // $companies = Company::all();
        $companies = Company::select('sifra as company_id', 'naziv as company_name', 'rabat as discount')->get();
        return response()->json($companies);
    }

    // public function shopsForCommercialist($id) {
    //     $shops = Company::select('kudo_obj.sifra as shop_id', 'kudo_obj.naziv as shop_name', 'ku_do.sifra as company')
    //         ->join('ku_do', 'kudo_obj.kupac', 'ku_do.sifra')
    //         ->where('komerc', $id)
    //         ->get();
    //     return response()->json($shops);
    // }
}

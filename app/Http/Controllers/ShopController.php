<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Shop;

class ShopController extends Controller
{
    //
    public function index() {
        $shops = Shop::select('sifra as shop_id', 'naziv as shop_name')->get();
        return response()->json($shops);
    }

    public function shopsForCompany($id) {
        $shops = Shop::select('kupac as company_id', 'sifra as shop_id', 'naziv as shop_name')
            ->where('kupac', $id)->get();
        return response()->json($shops);
    }

    public function shopsForCommercialist($id) {
        $shops = Shop::select('kudo_obj.sifra as shop_id', 'kudo_obj.naziv as shop_name', 'ku_do.sifra as company_id', 'ku_do.naziv as company_name', 'ku_do.rabat as discount')
            ->join('ku_do', 'kudo_obj.kupac', 'ku_do.sifra')
            // ->where('komerc', $id)
            ->get();
        return response()->json($shops);
    }
}

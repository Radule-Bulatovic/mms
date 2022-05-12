<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\StoreSurveyHistory;

class StoreSurveyHistoryCnt extends Controller
{
    //
    public function setStoreSurveyItem() {
        // $params = request()->all();

        $items = request()->all();

        foreach ($items as $item) {
            $i = StoreSurveyHistory::insert([
                    'kupac'=>$item['company_id'],
                    'objekat'=>$item['shop_id'],
                    'komerc'=>$item['user_id'],
                    'datum'=>$item['date'],
                    'anketa_id'=>$item['survey_id'],
                    'latitude'=>$item['latitude'],
                    'longitude'=>$item['longitude'],
                    ]);
        }

        return response()->json($i);
    }

    public function getStoreSurveyForComercAndDate($user, $date) {
        $storeSurvey = StoreSurveyHistory::select('id as id', 'ku_do.naziv as company_name', 'anketa_istorija.kupac as company_id', 'anketa_istorija.datum_vrijeme as datum','objekat as shop_id', 'kudo_obj.naziv as shop_name', 'datum as date', 'anketa_istorija.latitude as latitude', 'anketa_istorija.longitude as longitude')
        ->join('ku_do', 'anketa_istorija.kupac', 'ku_do.sifra')
        ->join('kudo_obj', 'anketa_istorija.objekat', 'kudo_obj.sifra')
        ->where('anketa_istorija.komerc', $user)
        ->where('anketa_istorija.datum', $date)
        ->get();
        return response()->json($storeSurvey);
    }

    public function getStoreSurveyForComercAndDateAndCmpAndShop($user, $date, $company, $shop) {
        $storeSurvey = StoreSurveyHistory::select('anketa_istorija.id as id', 'anketa_istorija.anketa_id as anketa_id', 'anketa.name as anketa_name')
            ->join('anketa', 'anketa_istorija.anketa_id', 'anketa.id')
            ->where('anketa_istorija.komerc', $user)
            ->where('anketa_istorija.datum', $date)
            ->where('anketa_istorija.kupac', $company)
            ->where('anketa_istorija.objekat', $shop)
            ->get();
        return response()->json($storeSurvey);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\StoreSurveyAdminHistory;

class StoreSurveyAdminHistoryCnt extends Controller
{
    //
        public function setStoreSurveyAdminItem() {
            $items = request()->all();

            foreach ($items as $item) {
                $i = StoreSurveyAdminHistory::insert([
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
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\StoreSurvey;

class StoreSurveyCnt extends Controller
{
    //
    public function getStoreSurvey() {
        $storeSurvey = StoreSurvey::select('id as id', 'name as name')
            ->where('visibility', 1)
            ->get();
        return response()->json($storeSurvey);
    }
}

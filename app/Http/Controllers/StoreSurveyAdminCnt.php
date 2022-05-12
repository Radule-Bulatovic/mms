<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\StoreSurveyAdmin;

class StoreSurveyAdminCnt extends Controller
{
    //
    public function getStoreSurveyAdmin() {
    $storeSurveyAdmin = StoreSurveyAdmin::select('id as id', 'name as name')
        ->where('visibility', 1)
        ->get();
    return response()->json($storeSurveyAdmin);
    }
}

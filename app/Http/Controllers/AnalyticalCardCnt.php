<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\AnalyticalCard;
use DB;

class AnalyticalCardCnt extends Controller
{
    //
    public function getBalance($supplier_id, $konto) {
        $details = AnalyticalCard::select('sum(dug) as duguje, sum(pot) as potrazuje')
            ->where('konto', $konto)
            ->where('komitent', $supplier_id)
            ->where('firma', 001)
            ->where('kod', 1)
            ->select(DB::Raw('sum(dug) as duguje, SUM(pot) as potrazuje'))
            ->first();
        return response()->json($details);

    //     $details = AnalyticalCard::select('sum(dug) as duguje, sum(pot) as potrazuje')
    //     ->where('firma', 001)
    //     ->where('komitent', 'V003')
    //     ->where('konto', 2020)
    //     ->select(DB::Raw('sum(dug) as duguje, SUM(pot) as potrazuje'))
    //     ->get();
    // return response()->json($details);
    }

    public function getBalance_outOfTime($supplier_id, $konto, $date) {
        $details = AnalyticalCard::select('sum(dug) as duguje, sum(pot) as potrazuje')
            ->where('konto', $konto)
            ->where('komitent', $supplier_id)
            ->where('firma', 001)
            ->where('kod', 1)
            ->where('datval', '<=', $date)
            ->select(DB::Raw('sum(dug) as duguje, SUM(pot) as potrazuje'))
            ->first();
        return response()->json($details);
    }

    public function getAnalyticCard($supplier_id, $konto) {
        $details = AnalyticalCard::select('rbr as id, datdok as date, dug, pot')
            ->where('konto', $konto)
            ->where('komitent', $supplier_id)
            ->where('firma', 001)
            ->where('kod', 1)
            ->select(DB::Raw('rbr as id, datdok as date, dug, pot'))
            ->orderBy('datdok', 'desc')
            ->paginate(20);
        return response()->json($details);
    }
}

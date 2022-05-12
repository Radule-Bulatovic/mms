<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Test;

class TestController extends Controller
{
    public function index() {
        $t = Test::all();
        return response()->json($t);
    }
}

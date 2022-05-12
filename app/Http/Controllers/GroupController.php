<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Group;

class GroupController extends Controller
{
    //
    public function getAllCategories() {
        $categories = Group::select('sifra as id','sifra as group_id', 'naziv as group_name')
        ->get();
        return response()->json($categories);
    }
}

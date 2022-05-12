<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ArticleForAll;

class ArticleForAllController extends Controller
{
    //
    public function getArticles() {
        $articles = ArticleForAll::select('ro_stanje.sifra as id', 'ro_stanje.sifra as article_id','ro_stanje.koli as count', 'ro_stanje.v_cije as price', 'ro_mat.tar as tax', 'ro_mat.naziv as article_name', 'ro_mat.grupa as group_id', 'ro_grupa.naziv as group_name')
            ->join('ro_mat', 'ro_stanje.sifra', 'ro_mat.sifra')
            ->join('ro_grupa','ro_mat.grupa', 'ro_grupa.sifra')
            ->where('mag', '01')
            ->where('ro_stanje.firma', '001')
            // ->where('ro_stanje.koli', '>', 0)
            ->orderBy('ro_stanje.sifra ', 'asc')
            ->paginate(50);
        return response()->json($articles);
    }

    public function getArticlesForGroup($group){
        $articles = ArticleForAll::select('ro_stanje.sifra as id', 'ro_stanje.sifra as article_id',  'ro_stanje.v_cije as price', 'ro_stanje.koli as count', 'ro_mat.tar as tax', 'ro_mat.naziv as article_name', 'ro_mat.grupa as group_id', 'ro_grupa.naziv as group_name')
        ->join('ro_mat', 'ro_stanje.sifra', 'ro_mat.sifra')
        ->join('ro_grupa','ro_mat.grupa', 'ro_grupa.sifra')
        ->where('mag', '01')
        ->where('ro_stanje.firma', '001')
        // ->where('ro_stanje.koli', '>', 0)
        ->where('ro_mat.grupa', $group)
        ->orderBy('ro_stanje.sifra ', 'asc')
        ->paginate(50);
    return response()->json($articles);
    }

    public function searchAllArticles($value) {
        $articles = ArticleForAll::select('ro_stanje.sifra as id', 'ro_stanje.sifra as article_id','ro_stanje.koli as count', 'ro_stanje.v_cije as price', 'ro_mat.tar as tax', 'ro_mat.naziv as article_name', 'ro_mat.grupa as group_id', 'ro_grupa.naziv as group_name')
        ->join('ro_mat', 'ro_stanje.sifra', 'ro_mat.sifra')
        ->join('ro_grupa','ro_mat.grupa', 'ro_grupa.sifra')
        ->where('mag', '01')
        ->where('ro_stanje.firma', '001')
        // ->where('ro_stanje.koli', '>', 0)
        ->where('ro_mat.naziv', 'LIKE', "%$value%")
        ->orderBy('ro_stanje.sifra ', 'asc')
        ->paginate(50);
    return response()->json($articles);
    }
}

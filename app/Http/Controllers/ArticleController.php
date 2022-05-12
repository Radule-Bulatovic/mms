<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Article;

class ArticleController extends Controller
{
    //
    public function index() {
        $articles = Article::all();
        return response()->json($articles);
    }

    //search articles for company
    public function searchArticlesFroCmp($id, $value) {
        $articles = Article::select('kup_art.rbr as id', 'kup_art.sifra as article_id', 'kup_art.naziv as article_name', 'kup_art.grupa as group_id', 'kup_art.grupa_naziv as group_name', 'kup_art.tar as tax', 'ro_stanje.koli as count',  'ro_stanje.v_cije as price')
            ->join('ro_stanje', 'kup_art.sifra', 'ro_stanje.sifra')
            ->where('kupac', $id)
            ->where('mag', '01')
            ->where('firma', '001')
            ->where('kup_art.naziv', 'LIKE', "%$value%")
            ->orderBy('kup_art.rbr', 'asc')
            ->paginate(20);
        return response()->json($articles);
    }

    //get articles for company
    public function getArtForCom($id) {
        $articles = Article::select('kup_art.rbr as id', 'kup_art.sifra as article_id', 'kup_art.naziv as article_name', 'kup_art.grupa as group_id', 'kup_art.grupa_naziv as group_name', 'kup_art.tar as tax', 'ro_stanje.koli as count',  'ro_stanje.v_cije as price')
            ->join('ro_stanje', 'kup_art.sifra', 'ro_stanje.sifra')
            ->where('kupac', $id)
            ->where('mag', '01')
            ->where('firma', '001')
            ->orderBy('kup_art.rbr', 'asc')
            ->paginate(20);
        return response()->json($articles);
    }

    //get supplier for Lakovic
    public function getSupplierForCompany($company_id) {
        $suppliers = Article::select('rbr as id','dobav as supplier_id', 'dobav_naziv as supplier_name')
        ->where('kupac', $company_id)
        ->distinct('dobav as supplier_id')
        ->distinct('dobav_naziv as supplier_name')
        ->get();
        return response()->json($suppliers);
    }

    //get group for supplier and company
    public function getCategoryForSuppAndCmp($company_id, $supplier_id) {
        $groups = Article::select('rbr as id', 'grupa as group_id', 'grupa_naziv as group_name')->where('dobav',$supplier_id)->where('kupac', $company_id)->get();
        return response()->json($groups);
    }

    //get articles for supplier where group,supplier and company
    public function getArticleForGroupSuppCmp($company_id, $supplier_id, $group_id) {
        $articles = Article::select('kup_art.rbr as id', 'kup_art.sifra as article_id', 'kup_art.naziv as article_name', 'kup_art.grupa as group_id', 'kup_art.grupa_naziv as group_name', 'kup_art.tar as tax', 'ro_stanje.koli as count',  'ro_stanje.v_cije as price')
        ->join('ro_stanje', 'kup_art.sifra', 'ro_stanje.sifra')
        ->where('kupac', $company_id)
        ->where('dobav', $supplier_id)
        ->where('grupa', $group_id)
        ->orderBy('kup_art.rbr', 'asc')
        ->paginate(20);
        return response()->json($articles);
    }
}

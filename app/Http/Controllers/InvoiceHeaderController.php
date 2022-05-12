<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\InvoiceHeader;
use App\InvoiceItem;
use DB;
use App\User;

class InvoiceHeaderController extends Controller
{
    //get max id, which is needed to be increment for 1
    public function getMaxInvoiceId()
    {
        $id = InvoiceHeader::max('broj');
        return response()->json($id);
    }

    //write invoice header
    public function setInvoiceHeader()
    {
        $params = request()->all();
        $idb = InvoiceHeader::max('broj') + 1;
        $header = InvoiceHeader::insert([
            'broj' => $idb,
            // 'broj' => $params['id'],
            'komerc' => $params['user_id'],
            'kupac' => $params['company_id'],
            'kup_obj' => $params['shop_id'],
            'datum' => $params['date'],
            'kni' => '1',
            'storno' => '0',
            'preuzeto' => '0',
            'sdat' => $params['datetime'],
            'latitude' => $params['latitude'],
            'longitude' => $params['longitude'],
            'brfak' => '0'
        ]);

        $items = $params['items'];

        foreach ($items as $item) {
            $i = InvoiceItem::insert([
                'broj' => $idb,
                // 'broj'=>$item['broj'],
                'rbr' => $item['rbr'],
                'sifra' => $item['sifra'],
                'koli' => $item['koli'],
                'v_cije' => $item['v_cije'],
                'rabat' => $item['rabat']
            ]);
        }
        return response()->json(true);
    }

    public function getInvoicesForDate($user, $date)
    {
        $query = "select broj as id, N.kupac as company, K.naziv as company_name, kup_obj as shop, O.naziv as shop_name, preuzeto, brfak as invoice_id, latitude, longitude, sdat from nar_za N
        inner join ku_do K on '001'=K.firma and N.kupac=K.sifra
        inner join kudo_obj O ON '001' = O.firma and N.kupac=O.kupac and N.kup_obj=O.sifra
        where N.komerc='$user' and datum='$date'
        order by broj DESC";

        $invoices = DB::select($query);
        return response()->json($invoices);
    }

    public function getUsers()
    {
        $users = User::select('id as value', 'name as label', 'operater as operater')->get();
        return response()->json($users);
    }
}

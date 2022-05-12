<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\InvoiceItem;

class InvoiceItemController extends Controller
{
    public function setInvoiceItem() {
        // $params = request()->all();
        $items = request()->all();


        foreach ($items as $item) {
            $i = InvoiceItem::insert(['broj'=>$item['broj'],
                                'rbr'=>$item['rbr'],
                                'sifra'=>$item['sifra'],
                                'koli'=>$item['koli'],
                                'v_cije'=>$item['v_cije'],
                                'rabat'=>$item['rabat']
                                ]);
        }

        return response()->json($i);


        // $items = InvoiceItem::insert(['broj'=>$params['broj'],
        //                         'rbr'=>$params['rbr'],
        //                         'sifra'=>$params['sifra'],
        //                         'koli'=>$params['koli'],
        //                         'v_cije'=>$params['v_cije'],
        //                         'rabat'=>$params['rabat']
        //                         ]);

        // return response()->json($items);
    }

    public function getItemsForInv($invoice_id) {
        $invoices = InvoiceItem::select('nar_st.rbr as id', 'nar_st.koli as quantity', 'nar_st.v_cije as price', 'nar_st.rabat as discount', 'ro_mat.naziv as name')
        ->join('ro_mat', 'nar_st.sifra', 'ro_mat.sifra')
        ->where('nar_st.broj', $invoice_id)
        ->get();
    return response()->json($invoices);
    }
}

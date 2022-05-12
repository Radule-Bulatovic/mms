<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ScheduleHist;
use App\Schedule;
use DB;
use Carbon\Carbon;

class ScheduleHistCnt extends Controller
{
    //
    public function setScheduleItem() {
        $params = request()->all();
        $items = ScheduleHist::insert([
                'kupac'=>$params['company_id'],
                'kupac_naziv'=>$params['company_name'],
                'kup_obj'=>$params['shop_id'],
                'kup_obj_naziv'=>$params['shop_name'],
                'komerc'=>$params['user_id'],
                'datum'=>$params['date']
                ]);

        return response()->json($items);
    }


    public function checkSchedule($user, $date, $fullDate) {
        $dateObject = \Carbon\Carbon::createFromFormat('Y-m-d', $fullDate);
        // $dateString = substr($dateObject->dayOfWeek(), 0, 2);
        $dateString = $dateObject->dayOfWeek;
        
        switch ($dateString) {
            case '1':
                $day= "Mo";
                break;
            case '2':
                $day="Tu";
                break;
            case '3':
                $day= "We";
                break;
            case '4':
                $day="Th";
                break;
            case '5':
                $day= "Fr";
                break;
            case '6':
                $day="Sa";
                break;
            case '7':
                $day= "Su";
                break;
            default:
                break;
        }

        $schedule = Schedule::select('kupac', 'kup_obj', 'komerc', 'kupac_naziv', 'kup_obj_naziv')
            ->where('komerc', $user)
            // ->where('dan', $dateString)
            ->where('dan', $day)
            ->get();
        
        $history = ScheduleHist::select('kupac', 'kup_obj', 'komerc', 'kupac_naziv', 'kup_obj_naziv')
            ->where('komerc', $user)
            ->where('datum', $fullDate)
            ->get();

        $result = [];
        foreach ($schedule as $sh) {
            $item = [
                'kupac'=> $sh->kupac,
                'kupac_naziv'=> $sh->kupac_naziv,
                'kup_obj'=> $sh->kup_obj,
                'kup_obj_naziv'=> $sh->kup_obj_naziv,
                'visibility' => false
            ];
            foreach($history as $h) {
                if((trim($sh->kupac) == trim($h->kupac)) && (trim($sh->kup_obj) == trim($h->kup_obj))) { 
                    $item['visibility'] = true;
                }
            }
            $result[] = $item;
        }      
        return response()->json($result);
    }
}

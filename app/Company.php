<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
//   protected $fillable = [
//     'sifra', 'naziv'
// ];


  /**
 * The table associated with the model.
 *
 * @var string
 */
protected $table = 'ku_do';
public $timestamps = false;
}

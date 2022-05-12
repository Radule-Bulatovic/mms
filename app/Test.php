<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Test extends Model
{
    //
      /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
    'operater', 'lozinka', 'ime', 'prezime', 'dozvola'
];


  /**
 * The table associated with the model.
 *
 * @var string
 */
protected $table = 'lozinka';
public $timestamps = false;
}

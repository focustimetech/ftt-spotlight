<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    protected $fillable = [
        'memo', 'staff_id'
    ];

    public function delete()
    {
        $this->deleted = true;
        return $this;
    }

    public function staff()
    {
        return $this->belongsTo('App\Staff');
    }
}

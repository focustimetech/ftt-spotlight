<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cluster extends Model
{
    public function delete() {
		// Delete cluster assignments
    }
    
    public function students() {
        return $this->belongsToMany('App\Student');
    }
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    public function getCourses() {
        return App\Block::where('student_id', $this->id)->get();
    }
}

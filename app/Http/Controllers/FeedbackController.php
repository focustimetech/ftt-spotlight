<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Feedback;

class FeedbackController extends Controller
{
    public function create(Request $request)
    {
        $feedback = new Feedback;
        $feedback->tags = $request->input('tags');
        $feedback->feedback = $request->input('feedback');
        $feedback->email = $request->input('email');
        $feedback->allow_response = $request->input('allow_response');

        if ($feedback->save())
            return $feedback;
    }
}

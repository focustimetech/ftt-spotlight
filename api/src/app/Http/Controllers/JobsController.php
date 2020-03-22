<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Jobs\SendPasswordReset;

// Remove these
use Mail;
use App\Mail\PasswordResetMail;

class JobsController extends Controller
{
    public function processQueue()
    {
        /*
        $emailJob = new SendPasswordReset();
        $this->dispatch($emailJob);
        */

        // Remove this
        $email = new PasswordResetMail();
        Mail::to('curtisupshall@gmail.com')->send($email);
    }
}

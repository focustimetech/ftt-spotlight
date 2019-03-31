<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
*/

//Auth
Route::post('login', 'PassportController@login');
Route::post('register', 'PassportController@register');
// Middleware
Route::middleware('auth:api')->group(function() {
    Route::get('staff', 'StaffController@index');
    Route::post('logout', 'AuthController@logout');
});

// New Auth
Route::post('login', 'AuthController@login');


// Staff
//Route::get('staff', 'StaffController@index')->middleware('cors');
Route::get('staff/{id}', 'StaffController@show');
Route::post('staff', 'StaffController@store');
Route::put('staff', 'StaffController@store');
Route::delete('staff/{id}', 'StaffController@destroy');
// Students
Route::get('students', 'StudentsController@fetchAll');
Route::get('students/disabled', 'StudentsController@fetchDisabled');
Route::get('student/id/{id}', 'StudentsController@fetchByID');
Route::get('student/sn/{student_number}', 'StudentsController@fetchBySN');
Route::post('students', 'StudentsController@store');
Route::put('students', 'StudentsController@store');
Route::delete('student/{id}/disable', 'StudentsController@disable');
Route::delete('student/{id}', 'StudentsController@destroy');
// Blocks
Route::get('blocks', 'BlockController@index');
    // Route::get('block/{time}', 'BlockController@show');
Route::post('blocks', 'BlockController@store');
Route::put('blocks', 'BlockController@store');
Route::delete('block/{id}', 'BlockController@destroy');
// Ledger
// Route::get('ledger', 'LedgerController@index');
Route::post('check-in', 'LedgerController@store');
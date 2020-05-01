<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

/**
 * Unauthenticated routes
 */
Route::get('avatar/{username}', 'UserController@findAvatar');
Route::post('login', 'Auth\LoginController@login');

/**
 * Authenticates routes
 */
Route::middleware('auth:sanctum')->group(function() {
    // User
    Route::get('user', 'UserController@currentUser');

    // Search
    Route::get('search/{query}', 'SearchController@search');

    // Staff
    Route::get('staff', 'StaffController@index');
    Route::get('staff/{id}', 'StaffController@show');

    // Teachers
    Route::get('teacher', 'TeacherController@index');
    Route::get('teacher/{id}', 'TeacherController@show');

    // Classrooms
    Route::get('classrooms', 'ClassroomController@index');
});
/*
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
*/

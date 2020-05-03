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

// Any User
Route::middleware('auth:sanctum')->group(function() {
    // Classrooms
    Route::get('classrooms', 'ClassroomController@index');

    // Logout
    Route::post('logout', 'Auth\LoginController@logout');

    // Search
    Route::get('search/{query}', 'SearchController@search');

    // Teachers
    Route::get('teacher', 'TeacherController@index');
    Route::get('teacher/{id}', 'TeacherController@show');

    // User
    Route::get('user', 'UserController@currentUser');

    // UNUSED
    Route::get('staff', 'StaffController@index');
    Route::get('staff/{id}', 'StaffController@show');
});

// Teachers, Staff
Route::middleware('auth:sanctum', 'scopes:staff,teacher')->group(function() {
    // Clusters
    Route::get('clusters', 'ClustersController@index');
    Route::get('clusters/{id}', 'ClustersController@find');
    Route::create('clusters', 'ClustersController@create');
    Route::update('clusters', 'ClustersController@update');
    Route::delete('clusters/{id}', 'ClustersController@delete');
});

/*
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
*/

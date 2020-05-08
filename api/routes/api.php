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
    // Blocks
    Route::get('blocks', 'BlocksController@index');

    // Classrooms
    Route::get('classrooms', 'ClassroomController@index');
    Route::get('classrooms/{id}', 'ClassroomController@show');

    // Logout
    Route::post('logout', 'Auth\LoginController@logout');

    // Search
    Route::get('search/{query}', 'SearchController@search');

    // Staff
    Route::get('staff', 'StaffController@index');
    Route::get('staff/{id}', 'StaffController@show');

    // Teachers
    Route::get('teacher', 'TeacherController@index');
    Route::get('teacher/{id}', 'TeacherController@show');
    
        // Teacher Calendar
        Route::get('teacher/{id}/calendar/{date?}', 'CalendarController@teacherCalendar');

    // Topics
    Route::get('clusters', 'ClustersController@index');
    Route::get('topics/{id}', 'TopicsController@show');

    // User
    Route::get('user', 'UserController@currentUser');
    Route::post('user/activate', 'UserController@activate');
});

// Teachers, Staff, SysAdmin
Route::middleware('auth:sanctum', 'scopes:staff,teacher,sysadmin')->group(function() {
    // Clusters
    Route::get('clusters', 'ClustersController@index');
    Route::get('clusters', 'ClustersController@list');
    Route::get('clusters/{id}', 'ClustersController@find');
    Route::post('clusters', 'ClustersController@create');
    Route::put('clusters', 'ClustersController@update');
    Route::delete('clusters/{id}', 'ClustersController@delete');

    // Students
    Route::get('students/{id}/calendar/{date?}', 'CalendarController@studentCalendar');
});

// Teachers
Route::middleware('auth:sanctum', 'scopes:teacher')->group(function() {
    // Classrooms
    Route::get('classrooms', 'ClassroomsController@list');
    Route::post('classrooms', 'ClassroomsController@create');
    Route::get('classrooms', 'ClassroomsController@update');
    Route::get('classrooms/{id}', 'ClassroomsController@delete');    

    // Topics
    Route::get('topics', 'TopicsController@index');
    Route::post('topics', 'TopicsController@create');
    Route::put('topics', 'TopicsController@update');
    Route::delete('topics/{id}', 'TopicsController@delete');
});

/*
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
*/

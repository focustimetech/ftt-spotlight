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
Route::post('login', 'LoginController@login');

/**
 * Authenticates routes
 */

// Any User
Route::middleware('auth:api')->group(function() {
    
    /**
     * 
     * @TODO Make middleware for ensuring account is active
     * 
     */


    // Blocks
    Route::get('blocks', 'BlocksController@index');

    // Calendar
    Route::get('teacher/{id}/calendar/{date?}', 'CalendarController@teacherCalendar');

    // Classrooms
    Route::get('classrooms/all', 'ClassroomsController@index');

    // Clusters
    Route::get('clusters', 'ClustersController@index');

    // Logout
    Route::post('logout', 'Auth\LoginController@logout');

    // Search
    Route::get('search/{query}', 'SearchController@search');

    // Staff
    //Route::get('staff', 'StaffController@index');
    //Route::get('staff/{id}', 'StaffController@show');

    // Teachers
    Route::get('teacher', 'TeachersController@index');
    Route::get('teachers/{id}', 'TeachersController@show');

    // Topics
    Route::get('topics/{id}', 'TopicsController@show');

    // User
    Route::get('user', 'UserController@currentUser');
    Route::post('user/activate', 'UserController@activate');
});

// Teachers, Staff, SysAdmin
Route::middleware('auth:api', 'scope:staff,teacher,sysadmin')->group(function() {
    // Classrooms
    Route::get('classrooms', 'ClassroomsController@list');
    Route::post('classrooms', 'ClassroomsController@create');
    Route::put('classrooms', 'ClassroomsController@update');
    Route::delete('classrooms/{id}', 'ClassroomsController@delete');

    // Clusters
    Route::get('clusters', 'ClustersController@index');
    Route::get('clusters', 'ClustersController@list');
    Route::get('clusters/{id}', 'ClustersController@find');
    Route::post('clusters', 'ClustersController@create');
    Route::put('clusters', 'ClustersController@update');
    Route::delete('clusters/{id}', 'ClustersController@delete');
    Route::post('clusters/{id}/attach', 'ClustersController@addStudents');
    Route::post('clusters/{id}/detach', 'ClustersController@removeStudents');
});

// Teachers, Staff, Guardians, SysAdmin
Route::middleware('auth:api', 'scope:staff,teacher,sysadmin,guardian')->group(function() {
    // Calendar
    Route::get('students/{id}/calendar/{date?}', 'CalendarController@studentCalendar');
    
    Route::get('tickets', 'TicketController@list');
    Route::get('tickets/{id}', 'TicketController@history');
    Route::get('tickets/all' ,'TicketController@index');
    Route::post('tickets', 'TicketController@create');
    Route::post('tickets/reply', 'TicketController@reply');
    Route::put('tickets/reopen', 'TicketController@reopenTikcet');
    Route::put('tickets/close', 'TicketController@closeTicket');

    // Students
    Route::get('students', 'StudentsController@index');
});

// Teachers
Route::middleware('auth:api', 'scope:teacher')->group(function() {
    // Appointment
    Route::get('appointments', 'AppointmentsController@list');
    Route::post('appointments', 'AppointmentsController@create');
    Route::delete('appointments', 'AppointmentsController@delete');

    // Topics
    Route::get('topics', 'TopicsController@list');
    Route::get('topics/all', 'TopicsController@index');
    Route::post('topics', 'TopicsController@create');
    Route::post('topics/schedule', 'TopicsController@setTopic');
    Route::put('topics', 'TopicsController@update');
    Route::delete('topics/{id}', 'TopicsController@delete');

    // Check-in
    Route::post('check-in', 'CheckInController@updateBuffer');
    Route::post('check-in/air', 'CheckInController@createAirCode');
});

// Students, Teachers
Route::middleware('auth:api', 'scope:teacher,student')->group(function() {
    // Calendar
    ROute::get('calendar/{date?}', 'CalendarController@selfCalendar');
});

/*
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
*/

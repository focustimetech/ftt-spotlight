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
Route::post('refresh-token', 'LoginController@refreshToken');

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
    
    // Auth
    Route::post('logout', 'LoginController@logout');
    Route::get('user', 'UserController@currentUser');
    Route::post('user/activate', 'UserController@activate');

    // Blocks
    Route::get('blocks', 'BlocksController@index');

    // Calendar
    Route::get('teacher/{id}/calendar/{date?}', 'CalendarController@teacherCalendar');

    // Classrooms
    Route::get('classrooms', 'ClassroomsController@index');

    // Classroom Calendar
    Route::get('classrooms/{id}/calendar/{date?}', 'CalendarController@classroomCalendar');
    Route::get('classrooms/calendar/{date}', 'CalendarController@allClassroomsCalendar');

    // Clusters
    Route::get('clusters', 'ClustersController@index');


    // Search
    Route::get('search/{query}', 'SearchController@search');

    // Staff
    //Route::get('staff', 'StaffController@index');
    //Route::get('staff/{id}', 'StaffController@show');

    // Teachers
    Route::get('teachers', 'TeachersController@index');
    Route::get('teachers/{id}', 'TeachersController@show');

    // Topics
    Route::get('topics/{id}', 'TopicsController@show');
});

// Teachers, Staff, SysAdmin
Route::middleware('auth:api', 'scope:staff,teacher,sysadmin')->group(function() {
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
    
    // Tickets
    Route::get('tickets', 'TicketController@list');
    Route::post('tickets', 'TicketController@create');
    Route::get('tickets/{ticketId}', 'TicketController@ticketEvents');
    Route::post('tickets/{ticketId}/reply', 'TicketController@createTicketEvent');

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
    Route::post('check-in', 'CheckInController@studentCheckIn');
    Route::post('check-in/air', 'CheckInController@createAirCode');
});

// Sysadmins
Route::middleware('auth:api', 'scope:sysadmin')->group(function() {
    // Tickets
    Route::get('tickets/all' ,'TicketController@index');
    Route::update('tickets/{ticketId}/status', 'TicketController@updateTicketStatus');
});

// Students, Teachers
Route::middleware('auth:api', 'scope:teacher,student')->group(function() {
    // Calendar
    Route::get('calendar/{date?}', 'CalendarController@selfCalendar');
});

// Staff, SysAdmin
Route::middleware('auth:api', 'scope:staff,sysadmin')->group(function() {
    // Classrooms
    Route::post('classrooms', 'ClassroomsController@create');
    Route::put('classrooms', 'ClassroomsController@update');
    Route::delete('classrooms/{id}', 'ClassroomsController@delete');
});

/*
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
*/

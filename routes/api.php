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

// Unauthenticates Routes
Route::post('login', 'AuthController@login');

// All Users
Route::middleware('auth:api')->group(function() {
    // Auth
    Route::post('logout', 'AuthController@logout');
    Route::get('user', 'AuthController@user');
    Route::post('verify-user', 'AuthController@verify');

    // Topics
    Route::get('topics', 'TopicsController@index');

    // Staff
    Route::get('staff', 'StaffController@index');
    Route::get('staff/profile/{id}', 'StaffController@profile');
    Route::get('staff/{id}', 'StaffController@show');

    // Search
    Route::get('search', 'SearchController@search');

    // Settings
    Route::get('settings', 'SettingsController@index');
});

// Teacher and Administrator Routes
Route::middleware(['auth:api', 'scope:teacher,admin'])->group(function() {
    // Appointments
    Route::get('appointments/{id}', 'AppointmentsController@find');
    Route::post('appointments/create', 'AppointmentsController@create');
    Route::delete('appointments/{id}', 'AppointmentsController@delete');
    // Starred
    Route::get('starred', 'StarController@index');
    Route::post('star', 'StarController@star');
    Route::post('unstar', 'StarController@unstar');

    // Topics
    Route::post('topics', 'TopicsController@store');
    Route::delete('topics/{id}', 'TopicsController@destroy');

    // Students
    Route::get('students', 'StudentsController@index');
    Route::get('students/{id}', 'StudentsController@show');
    Route::get('students/profile/{id}', 'StudentsController@profile');

    // Notifications
    Route::get('notifications', 'NotificationsController@index');
    Route::put('notifications', 'NotificationsController@update');

    // Ledger
    Route::post('check-in', 'LedgerController@store');
    Route::get('check-in/status/self', 'LedgerController@status');
    Route::post('check-in/air/enable', 'LedgerController@enableAir');
    Route::post('check-in/air/disable', 'LedgerController@disableAir');

    // Student Schedule
    Route::get('students/{id}/schedule', 'StudentScheduleController@index');
    Route::get('students/{id}/schedule/{timestamp}', 'StudentScheduleController@index');

    // Staff Schedule
    Route::get('staff/{id}/schedule', 'StaffScheduleController@index');
    Route::get('staff/{id}/schedule/{timestamp}', 'StaffScheduleController@index');
});

// Administrator Routes
Route::middleware(['auth:api', 'scopes:admin'])->group(function() {
    // Students
    Route::post('students', 'StudentsController@store');
    Route::post('students/upload', 'StudentsController@upload');
    Route::put('students', 'StudentsController@store');
    Route::delete('students/{id}', 'StudentsController@destroy');

    // Staff
    Route::post('staff', 'StaffController@store');
    Route::put('staff', 'StaffController@store');
    Route::delete('staff/{id}', 'StaffController@destroy');

    // Settings
    Route::put('settings', 'SettingsController@update');
});


// Clusters
Route::post('clusters/students', 'ClustersController@attach');
Route::delete('clusters/students', 'ClustersController@detach');
Route::get('clusters', 'ClustersController@index');
Route::post('clusters', 'ClustersController@store');
Route::put('clusters', 'ClustersController@store');
Route::delete('clusters/{id}', 'ClustersController@delete');
Route::get('clusters/{id}', 'ClustersController@show');

// Blocks
Route::get('blocks', 'BlockController@index');
    // Route::get('block/{time}', 'BlockController@show');
Route::post('blocks', 'BlockController@store');
Route::put('blocks', 'BlockController@store');
Route::delete('block/{id}', 'BlockController@destroy');

// Attendance
Route::get('attendance/{id}', 'AttendanceController@attendance');
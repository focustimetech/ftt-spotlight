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
Route::get('settings/unauthenticated', 'SettingsController@getUnauthenticated');

// App Start-up
Route::middleware('auth:api')->group(function() {
    // Authentication
    Route::post('logout', 'AuthController@logout');
    Route::get('user', 'AuthController@user');
    Route::post('verify-user', 'AuthController@verify');
    Route::post('change-password', 'AuthController@changePassword');

    // Settings
    Route::get('settings', 'SettingsController@index');
});

// All Users
Route::middleware(['auth:api', 'expired-password'])->group(function() {
    // Topics
    Route::get('topics', 'TopicsController@index');

    // Staff
    Route::get('staff', 'StaffController@index');
    Route::get('staff/profile/{id}', 'StaffController@profile');
    Route::get('staff/{id}', 'StaffController@show');

    // Search
    Route::get('search', 'SearchController@search');

    // Student Schedule
    Route::post('students/staff-list', 'StudentScheduleController@listStaff');
    Route::post('students/schedule-plan', 'StudentScheduleController@setPlan');
});

// Student Routes
Route::middleware(['auth:api', 'expired-password', 'scopes:student'])->group(function() {
    // Schedule
    Route::get('students/self/schedule', 'StudentScheduleController@indexProfile');
    Route::get('students/self/schedule/{timestamp}', 'StudentScheduleController@indexProfile');

    // Profile
    Route::get('students/profile/self', 'StudentsController@authProfile');
});

// Teacher and Administrator Routes
Route::middleware(['auth:api', 'expired-password', 'scope:teacher,admin'])->group(function() {
    //Amendments
    Route::post('amendment', 'AmendmentsController@create');

    // Appointments
    Route::get('appointments/{id}', 'AppointmentsController@find');
    Route::post('appointments/create', 'AppointmentsController@create');
    Route::delete('appointments/{id}', 'AppointmentsController@delete');
 
    // Staff
    Route::post('staff', 'StaffController@create');

    // Starred
    Route::get('starred', 'StarController@index');
    Route::post('star', 'StarController@star');
    Route::post('unstar', 'StarController@unstar');

    // Topics
    Route::post('topics', 'TopicsController@store');
    Route::delete('topics/{id}', 'TopicsController@destroy');
    Route::post('topics/schedule', 'TopicsController@createTopicSchedule');
    Route::delete('topics/schedule/{id}', 'TopicsController@deleteTopicSchedule');

    // Students
    Route::get('students', 'StudentsController@index');
    Route::get('students/{id}', 'StudentsController@show');
    Route::get('students/student-number/{id}', 'StudentsController@getByStudentNumber');
    Route::get('students/profile/{id}', 'StudentsController@profile');
    Route::post('students', 'StudentsController@create');
    Route::post('students/upload', 'StudentsController@upload');
    Route::put('students', 'StudentsController@update');
    Route::delete('students/{id}', 'StudentsController@destroy');

    // Notifications
    Route::get('notifications', 'NotificationsController@index');
    Route::put('notifications/archive/all', 'NotificationsController@archiveAllNotifications');
    Route::put('notifications/read/all', 'NotificationsController@markAllNotificationsRead');
    Route::put('notifications/archive/{id}', 'NotificationsController@archiveNotification');
    Route::put('notifications/unarchive/{id}', 'NotificationsController@unarchiveNotification');
    Route::put('notifications/read/{id}', 'NotificationsController@markNotificationRead');
    Route::put('notifications/unread/{id}', 'NotificationsController@markNotificationUnread');

    // Ledger
    Route::post('check-in', 'LedgerController@checkIn');
    Route::get('check-in/status', 'LedgerController@status');
    Route::get('check-in/status/{datetime}', 'LedgerController@status');
    Route::post('check-in/air/enable', 'LedgerController@enableAir');
    Route::post('check-in/air/disable', 'LedgerController@disableAir');

    // Student Schedule
    Route::get('students/{id}/schedule', 'StudentScheduleController@index');
    Route::get('students/{id}/schedule/{timestamp}', 'StudentScheduleController@index');

    // Staff Schedule
    Route::get('staff/{id}/schedule', 'StaffScheduleController@index');
    Route::get('staff/{id}/schedule/{timestamp}', 'StaffScheduleController@index');

    // Feedback
    Route::post('feedback', 'FeedbackController@create');

    // Power Scheduler
    Route::post('power-scheduler', 'PowerSchedulerController@schedule');

    // Staff Capacity
    Route::post('staff/capacity', 'StaffController@setCapacity');
});

// Administrator Routes
Route::middleware(['auth:api', 'expired-password', 'scopes:admin'])->group(function() {
    // Staff
    Route::delete('staff/{id}', 'StaffController@destroy');

    // Settings
    Route::put('settings', 'SettingsController@update');
});

// Incomplete
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
Route::post('blocks', 'BlockController@store');
Route::put('blocks', 'BlockController@store');
Route::delete('block/{id}', 'BlockController@destroy');

// Attendance
Route::get('attendance/{id}', 'AttendanceController@attendance');

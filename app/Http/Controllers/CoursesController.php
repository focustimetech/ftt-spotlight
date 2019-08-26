<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Course;
use App\Student;
use App\Http\Resources\Course as CourseResource;

class CoursesController extends Controller
{
    /**
     * Display a listing of all courses.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $courses = Course::all();

        return CourseResource::collection($courses);
    }

    /**
     * Store a newly created course in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $course = $request->isMethod('put') ? Course::findOrFail($request->course_id) : new Course;

        $course->name = $request->input('name');
        $course->short_name = $request->input('short_name');
        /**
         * @TODO Need to implement grabbing the current user's ID, in the case that it's a post request
         * (this will be unkown when the repost is sent from the client).
         */
        $course->owner = $request->input('owner');

        if ($course->save()) {
            return new CourseResource($course);
        }

    }

    /**
     * Display the specified course.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $course = Course::findOrFail($id);

        return new CourseResource($course);
    }

    /**
     * Enroll a student in a course.
     */
    public function enroll(Request $request)
    {
        $students = Student::findOrFail($request->student_ids);
        $students->courses()->attach($request->course_ids, ['enrolled_by' => $request->enrolled_by]);
    }

    /**
     * Drop a student from a course
     */
    public function drop()
    {
        $students = Student::findOrFail($request->student_ids);
        $students->courses()->detach($request->course_ids);
    }

    /**
     * Remove the specified course from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $course = Course::findOrFail($id);

        /**
         * @TODO Need to ensure that enrollment is deleted as well.
         */

        if ($course->delete()) {
            return new CourseResource($course);
        }
    }
}

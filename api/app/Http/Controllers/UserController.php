<?php

namespace App\Http\Controllers;

use App\Guardian;
use App\Staff;
use App\Student;
use App\Teacher;
use App\User;
use App\Http\Resources\Avatar as AvatarResource;
use App\Http\Resources\Guardian as GuardianResource;
use App\Http\Resources\Staff as StaffResource;
use App\Http\Resources\Student as StudentResource;
use App\Http\Resources\Teacher as TeacherResource;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function findAvatar($username)
    {
        $user = User::findByUsername($username);

        if (!$user) {
            return response()->json(['message' => 'User not found.'], 404);
        }

        return new AvatarResource($user);
    }

    public function currentUser(Request $request)
    {
        $user = $request->user();
        switch ($user->account_type) {
            case 'guardian':
                return new GuardianResource(Guardian::firstWhere('user_id', $user->id));
            case 'staff':
                return new StaffResource(Staff::firstWhere('user_id', $user->id));
            case 'student':
                return new StudentResource(Student::firstWhere('user_id', $user->id));
            case 'teacher':
                return new TeacherResource(Teacher::firstWhere('user_id', $user->id));
        }
    }

    public function activate(Request $request)
    {
        $user = auth()->user();

        if ($user->account_type === 'teacher') {
            $teacher = $user->account();
            $classrooms = $teacher->classrooms()->get();
            $topics = $teacher->topics()->get();
            if (count($classrooms) === 0) {
                return response()->json(['Cannot complete account creation without at least one classroom.', 422]);
            } else if (count($topics) === 0) {
                return response()->json(['Cannot complete account creation without at least one topic.', 422]);
            }
        }

        $user->active = true;
        if ($user->save()) {
            return response()->noContent();
        }
    }
}

<?php

namespace App\Http\Controllers\Api\V1\Student;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\CourseResource;
use App\Models\Course;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class EnrolledCourseController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        return CourseResource::collection(
            Auth::guard('web')->user()->enrolledCourses()->get()
        );
    }

    public function show(Course $course): JsonResource
    {
        $user = Auth::guard('web')->user();

        $isEnrolled = $user->enrolledCourses()
            ->where('courses.id', $course->id)
            ->exists();

        abort_unless($isEnrolled, 403, "Vous n'êtes pas inscrit à cette formation.");

        return CourseResource::make($course);
    }
}

<?php

use App\Http\Controllers\Api\V1\Student\EnrolledCourseController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:web')->group(function () {
    Route::get('courses', [EnrolledCourseController::class, 'index']);
    Route::get('courses/{course}', [EnrolledCourseController::class, 'show']);
});

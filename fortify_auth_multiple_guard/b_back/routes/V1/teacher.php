<?php

use App\Http\Controllers\Api\V1\Teacher\CourseController;
use App\Http\Controllers\Api\V1\Teacher\DashboardController;
use Illuminate\Support\Facades\Route;

// Route::middleware(['auth:web','role:teacher'])->group(function(){

//     Route::get('/dashboard', [DashboardController::class,'index']);

//     Route::prefix('courses')->group(function(){

//         Route::get('/', [CourseController::class,'index']);
//         Route::post('/', [CourseController::class,'store']);
//         Route::get('/{course}', [CourseController::class,'show']);
//         Route::put('/{course}', [CourseController::class,'update']);
//         Route::delete('/{course}', [CourseController::class,'destroy']);

//     });

// });

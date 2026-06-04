<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/v1/login', [AuthController::class, 'login']);
Route::post('/v1/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

/**
 * ==========================================================
 * 1 - Reduire en ApiResource
 * ==========================================================
 */

//  Route::get('posts', [PostController::class, 'index']);
//  Route::get('posts/{post}', [PostController::class, 'show']);
//  Route::put('posts/{post}', [PostController::class, 'update']);
//  Route::post('posts', [PostController::class, 'store']);
//  Route::delete('posts/{post}', [PostController::class, 'destroy']);

//  Route::apiResource('posts', PostController::class);

/**
 * ==========================================================
 * 2 - Plusieurs ApiResource en ApiResources
 * ==========================================================
 */
// Route::middleware('auth:sanctum')->apiResources([
//     'users' => UserController::class,
// ]);

Route::middleware('auth:sanctum')->apiResource('users', UserController::class);

/**
 * ==========================================================
 * 3 - Routes imbriquées
 * ==========================================================
 */
Route::get('posts/{post}/comments');
Route::apiResource('posts.comments', PostController::class)->shallow();

Route::post('chat/stream', [ChatController::class, 'stream']);

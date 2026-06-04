<?php

use App\Http\Controllers\Api\V1\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/me', AuthController::class)->middleware('auth:web,admin');

// Override Fortify logout — supporte les guards web et admin
Route::post('/logout', function (Request $request) {
    $activeGuard = Auth::guard('admin')->check() ? 'admin' : 'web';
    Auth::guard($activeGuard)->logout();

    if ($request->hasSession()) {
        $request->session()->invalidate();
        $request->session()->regenerateToken();
    }

    return response()->json(['message' => 'Logged out successfully']);
})->middleware('auth:web,admin');

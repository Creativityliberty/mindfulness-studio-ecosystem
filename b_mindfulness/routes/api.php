<?php

use App\Http\Middleware\CheckApiVersion;
use App\Http\Middleware\ForceJsonResponse;
use Illuminate\Support\Facades\Route;

Route::middleware([ForceJsonResponse::class])->group(function () {
    // API V1
    Route::prefix('v1')
        ->middleware(CheckApiVersion::class)
        ->group(base_path('routes/v1/api.php'));
    
    Route::prefix('auth')->middleware(CheckApiVersion::class)->group(base_path('routes/auth.php'));

    // API V2
    // Route::prefix('v2')
    //     ->middleware(CheckApiVersion::class)
    //     ->group(base_path('routes/v2/api.php'));

    // Fallback
    Route::fallback(function () {
        return response()->json([
            'message' => 'Route not found. Use /api/v1/ or /api/v2/',
            'docs' => 'https://yourdomain.com/api/docs',
        ], 404);
    });

});

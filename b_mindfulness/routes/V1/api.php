<?php

use Illuminate\Support\Facades\Route;

Route::prefix('public')->group(base_path('routes/v1/public.php'));

Route::prefix('teacher')->group(base_path('routes/v1/teacher.php'));

Route::prefix('student')->group(base_path('routes/v1/student.php'));

Route::prefix('admin')->group(base_path('routes/v1/admin.php'));

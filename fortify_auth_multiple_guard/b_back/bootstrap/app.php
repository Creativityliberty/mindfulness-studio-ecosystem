<?php

use App\Http\Middleware\ApiRequestLogger;
use App\Http\Middleware\CheckApiVersion;
use App\Http\Middleware\ForceJsonResponse;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Spatie\Permission\Exceptions\UnauthorizedException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->api(prepend: [
            ForceJsonResponse::class,
            CheckApiVersion::class,
            ApiRequestLogger::class,
        ]);
        $middleware->statefulApi();
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->render(function (AuthenticationException $e) {
            return response()->json([
                'message' => 'Unauthenticated',
                'exception' => app()->environment('local') ? $e->getMessage() : null,
                'guards' => app()->environment('local') ? $e->guards() : null,
            ], 401);
        });

        $exceptions->render(function (UnauthorizedException $e) {
            return response()->json([
                'message' => 'Unauthorized - insufficient role',
                'required_roles' => $e->getRequiredRoles(),
                'exception' => app()->environment('local') ? $e->getMessage() : null,
            ], 403);
        });
    })->create();

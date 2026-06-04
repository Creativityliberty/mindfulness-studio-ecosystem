<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckApiVersion
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $version = $request->segment(2); // /api/v1/... → "v1"

        $deprecated = config('api.deprecated_versions', []);

        if (in_array($version, $deprecated)) {
            // On laisse passer mais on avertit dans le header
            $response = $next($request);
            $response->headers->set('X-API-Deprecated', 'true');
            $response->headers->set('X-API-Sunset-Date', config('api.sunset_dates.'.$version));

            return $response;
        }

        return $next($request);
    }
}

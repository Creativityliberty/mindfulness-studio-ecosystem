<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class ApiRequestLogger
{
    public function handle(Request $request, Closure $next): Response
    {
        // Génère un ID unique par requête — utile pour tracer dans les logs
        $requestId = (string) Str::uuid();
        $startTime = microtime(true);

        // Injecte l'ID dans la requête pour qu'on puisse le récupérer partout
        $request->headers->set('X-Request-ID', $requestId);

        // Log AVANT — ce qui entre
        Log::channel('api')->info('API Request', [
            'request_id' => $requestId,
            'method' => $request->method(),
            'url' => $request->fullUrl(),
            'ip' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'user_id' => $request->user()?->id,
            'user_type' => $request->user() ? get_class($request->user()) : 'guest',
            'body' => $this->sanitizeBody($request->all()),
            'headers' => $this->sanitizeHeaders($request->headers->all()),
        ]);

        $response = $next($request);

        // Temps d'exécution en ms
        $duration = round((microtime(true) - $startTime) * 1000, 2);

        // Log APRÈS — ce qui sort
        Log::channel('api')->info('API Response', [
            'request_id' => $requestId,
            'method' => $request->method(),
            'url' => $request->fullUrl(),
            'status' => $response->getStatusCode(),
            'duration_ms' => $duration,
            'user_id' => $request->user()?->id,
        ]);

        // Ajoute l'ID dans le header de réponse — pratique pour débugger côté React
        $response->headers->set('X-Request-ID', $requestId);

        // Alerte si la requête est trop lente (> 2 secondes)
        if ($duration > 2000) {
            Log::channel('api')->warning('Slow API Request', [
                'request_id' => $requestId,
                'url' => $request->fullUrl(),
                'duration_ms' => $duration,
            ]);
        }

        return $response;
    }

    /**
     * Retire les champs sensibles du body avant de logger
     */
    private function sanitizeBody(array $body): array
    {
        $sensitive = [
            'password',
            'password_confirmation',
            'current_password',
            'remember_token',
        ];

        foreach ($sensitive as $field) {
            if (isset($body[$field])) {
                $body[$field] = '*** REDACTED ***';
            }
        }

        return $body;
    }

    /**
     * Retire les headers sensibles (Authorization, cookies...)
     */
    private function sanitizeHeaders(array $headers): array
    {
        $sensitive = ['authorization', 'cookie', 'x-csrf-token'];

        foreach ($sensitive as $header) {
            if (isset($headers[$header])) {
                $headers[$header] = ['*** REDACTED ***'];
            }
        }

        return $headers;
    }
}

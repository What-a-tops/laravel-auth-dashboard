<?php

namespace App\Http;

// use App\Http\Middleware\RoleMiddleware;
use App\Http\Middleware\CorsMiddleware;
use Illuminate\Foundation\Http\Kernel as HttpKernel;
use \App\Http\Middleware\ParseInputStreamMiddleware;
use Spatie\Permission\Middleware\RoleMiddleware;

class Kernel extends HttpKernel
{
    // Middleware groups and other configuration here
    protected $middlewareGroups = [
        'web' => [
            // other middleware entries
            CorsMiddleware::class,
            \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
            \Illuminate\Session\Middleware\StartSession::class,
            \Illuminate\View\Middleware\ShareErrorsFromSession::class,
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
            \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
        ],
        'api' => [
            // other API middleware entries
            CorsMiddleware::class,
            \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
            'throttle:api',
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],
    ];

    protected $routeMiddleware = [
        // Other middleware entries...
        'role' => RoleMiddleware::class,
        'parse.input' => ParseInputStreamMiddleware::class,
    ];
}

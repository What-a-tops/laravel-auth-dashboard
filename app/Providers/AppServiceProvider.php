<?php

namespace App\Providers;

use App\Http\Middleware\CorsMiddleware;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Register global middleware
        $this->app['router']->aliasMiddleware('cors', CorsMiddleware::class);
    }
}

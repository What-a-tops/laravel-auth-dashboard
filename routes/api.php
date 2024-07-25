<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\CorsMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware([CorsMiddleware::class])->group(function () {
    // Public routes
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);

    // Routes requiring authentication
    Route::middleware(['auth:api'])->group(function () {
        // Routes for admin role
        Route::middleware(['role:admin'])->group(function () {
            Route::get('/admin/home', [AdminController::class, 'index']);
            // Add more admin-specific routes here
        });

        // Routes for user role
        Route::middleware(['role:user'])->group(function () {
            Route::get('/user/home', function (Request $request) {
                return $request->user();
            });
        });

        // Routes accessible to any authenticated user
        Route::get('/logout', [AuthController::class, 'logout']);
        Route::apiResource('/users', UserController::class);
    });
});

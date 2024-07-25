<?php

use App\Http\Middleware\RoleMiddleware;
use Illuminate\Support\Facades\Route;

return [
    'role' => RoleMiddleware::class,
];

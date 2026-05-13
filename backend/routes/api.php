<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes — IntarNet Stock
|--------------------------------------------------------------------------
*/

// Routes publiques (sans authentification)
Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/forgot-password', [\App\Http\Controllers\PasswordResetController::class, 'sendResetLinkEmail']);
    Route::post('/reset-password',  [\App\Http\Controllers\PasswordResetController::class, 'resetPassword']);
});

// Routes protégées (nécessitent un token Sanctum valide)
Route::middleware('auth:sanctum')->prefix('auth')->group(function () {
    Route::post('/logout',          [AuthController::class, 'logout']);
    Route::get('/me',               [AuthController::class, 'me']);
    Route::put('/update-profile',   [AuthController::class, 'updateProfile']);
    Route::put('/update-password',  [AuthController::class, 'updatePassword']);
});

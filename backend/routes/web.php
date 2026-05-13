<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Route requise par Laravel pour générer le lien dans l'email
// Elle redirige l'utilisateur vers le frontend React
Route::get('/reset-password/{token}', function (string $token) {
    return redirect()->to(env('FRONTEND_URL').'/reset-password?token='.$token.'&email='.request('email'));
})->name('password.reset');

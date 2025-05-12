<?php
use App\Http\Controllers\ProductController;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\SizeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/test', function () {
    return ['message' => 'Bonjour depuis Laravel ! chi 9alwa wla ana f laravel azbi'];
});


Route::middleware('auth:sanctum')->post('/products', [ProductController::class, 'store']);
Route::middleware('auth:sanctum')->get('/products', [ProductController::class, 'products']);
Route::middleware('auth:sanctum')->delete('/products/{id}', [ProductController::class, 'destroy']);
Route::middleware('auth:sanctum')->post('/products/{id}', [ProductController::class, 'update']);

Route::post('login', [AuthController::class, 'login']);
Route::post('signup', [AuthController::class, 'register']);
Route::middleware('auth:sanctum')->post('logout', [AuthController::class, 'logout']);

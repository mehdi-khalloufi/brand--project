<?php

use App\Http\Controllers\ProductController;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\SizeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrderController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');




Route::middleware('auth:sanctum')->post('/products', [ProductController::class, 'store']);
Route::middleware('auth:sanctum')->get('/products', [ProductController::class, 'products']);
Route::middleware('auth:sanctum')->get('/productsByName', [ProductController::class, 'productsByName']);
Route::middleware('auth:sanctum')->delete('/products/{id}', [ProductController::class, 'destroy']);
Route::middleware('auth:sanctum')->post('/products/{id}', [ProductController::class, 'update']);
Route::middleware('auth:sanctum')->get('/products/{id}', [ProductController::class, 'show']);

//
Route::middleware('auth:sanctum')->get('/users/count', [OrderController::class, 'usercount']);
//
Route::middleware('auth:sanctum')->get('/orders/count', [OrderController::class, 'count']);
//
Route::middleware('auth:sanctum')->get('/prod/count', [ProductController::class, 'prodcount']);


// for authentication
Route::post('login', [AuthController::class, 'login']);
Route::post('signup', [AuthController::class, 'register']);
Route::middleware('auth:sanctum')->post('logout', [AuthController::class, 'logout']);





//for ordering
Route::middleware('auth:sanctum')->apiResource('orders', OrderController::class);

//
Route::get('/orders/user/{userId}', [OrderController::class, 'getByUserId']);

//bach t cancelli
Route::middleware('auth:sanctum')->put('/orders/{id}/cancel', [OrderController::class, 'cancel']);

//paiement
Route::middleware('auth:sanctum')->patch('/orders/{id}/mark-paid', [OrderController::class, 'markAsPaid']);

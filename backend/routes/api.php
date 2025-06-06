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



Route::middleware(['auth:sanctum', 'role:ADMIN'])->post('/products', [ProductController::class, 'store']);
Route::middleware('auth:sanctum')->get('/products', [ProductController::class, 'products']);
Route::middleware('auth:sanctum')->get('/productsByName', [ProductController::class, 'productsByName']);
Route::middleware(['auth:sanctum', 'role:ADMIN'])->delete('/products/{id}', [ProductController::class, 'destroy']);
Route::middleware(['auth:sanctum', 'role:ADMIN'])->post('/products/{id}', [ProductController::class, 'update']);
Route::middleware('auth:sanctum')->get('/products/{id}', [ProductController::class, 'show']);

Route::middleware('auth:sanctum')->get('/prod/count', [OrderController::class, 'prodcount']);
//
Route::middleware('auth:sanctum')->get('/users/count', [OrderController::class, 'usercount']);
//
Route::middleware('auth:sanctum')->get('/orders/count', [OrderController::class, 'count']);
//



Route::middleware('auth:sanctum')->get('/users/customers', [AuthController::class, 'getCustomers']);




// for authentication
Route::post('login', [AuthController::class, 'login']);
Route::post('signup', [AuthController::class, 'register']);
Route::middleware('auth:sanctum')->post('logout', [AuthController::class, 'logout']);



Route::middleware(['auth:sanctum', 'role:ADMIN'])->get('/ordersDetails', [OrderController::class, 'showAllOrders']);

//for ordering
Route::middleware('auth:sanctum')->apiResource('orders', OrderController::class);

//
Route::get('/orders/user/{userId}', [OrderController::class, 'getByUserId']);

//bach t cancelli
Route::middleware(['auth:sanctum', 'role:CUSTOMER'])->put('/orders/{id}/cancel', [OrderController::class, 'cancel']);

//paiement
Route::middleware(['auth:sanctum', 'role:CUSTOMER'])->patch('/orders/{id}/mark-paid', [OrderController::class, 'markAsPaid']);

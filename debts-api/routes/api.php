<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DebtController;
use App\Http\Controllers\DebtActionController;

Route::get('/debts', [DebtController::class, 'index']);
Route::post('/debts', [DebtController::class, 'store']);

Route::get('/debts/{id}/suggestion', [DebtActionController::class, 'suggestion']);
Route::post('/debts/{id}/apply',      [DebtActionController::class, 'apply']);

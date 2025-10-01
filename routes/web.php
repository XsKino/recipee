<?php

use App\Http\Controllers\IngredientController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\ReviewController;
use App\Http\Middleware\IsAdminMiddleware;
use App\Models\Ingredient;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/user-recipes', [RecipeController::class, 'user'])->name('recipes.user');
    Route::resource('recipes', RecipeController::class);
    // Additional POST route for recipe updates to handle FormData
    Route::post('recipes/{recipe}', [RecipeController::class, 'update'])->name('recipes.update.post');
    Route::resource('reviews', ReviewController::class)->only(['store', 'update', 'destroy']);
    
    Route::middleware(IsAdminMiddleware::class)->group(function () {
        Route::get('/dashboard', function () {
            $ingredientsCount = Ingredient::count();
            return Inertia::render('dashboard', compact('ingredientsCount'));
        })->name('dashboard');
        
        Route::resource('ingredients', IngredientController::class)->except(['store']);
    });
    
    // ingredients.store is an exception, allowing regular users to add ingredients via AJAX when creating recipes
    Route::post('ingredients', [IngredientController::class, 'store'])->name('ingredients.store');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
